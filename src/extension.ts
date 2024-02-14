import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';

import { SidebarProvider } from './sidebarProvider';
import { JsonTreeDataProvider } from './jsonTreeDataProvider';

interface EditInfo {
    timestamp: Date;
    contentLength: number;
    action: 'typing' | 'pasting';
    suspicious: boolean;
    text?: string; // Optional field to store the text of suspicious edits
    lineNumber?: number;
    fileName?: string; // Optional field to store the
    hash?: string;
}

interface SuspiciousEdit {
    timestamp: Date;
    contentLength: number;
    text: string;
    lineNumber?: number;
    fileName?: string;
    hash?: string;
}

interface Analytics {
    totalEdits: number;
    totalLinesEdited: number;
    suspiciousEdits: number;
    averageTypingSpeed: number; // Characters per minute
    suspiciousEditDetails: SuspiciousEdit[]; // Array to store details of suspicious edits
    normalEditDetails: EditInfo[]; // Array to store details of normal edits
    hash?: string;
}

let analytics: Analytics = {
    totalEdits: 0,
    totalLinesEdited: 0,
    suspiciousEdits: 0,
    averageTypingSpeed: 0,
    suspiciousEditDetails: [], // Initialize the array
    normalEditDetails: [], // Initialize the array
};

const monitoredFileTypes = ['.js', '.cpp'];
const suspiciousBehaviorThresholds = {
    copyPasteSize: 2, // Characters
    typingSpeed: 1000, // Milliseconds
};

function updateAnalytics(editInfo: EditInfo) {
    if (editInfo.action === 'pasting' && editInfo.suspicious) {
        analytics.suspiciousEdits += 1;
        // Store details of the suspicious edit, including the text content
        analytics.suspiciousEditDetails.push({
            timestamp: editInfo.timestamp,
            contentLength: editInfo.contentLength,
            text: editInfo.text || '', // Ensure there's a default value
            lineNumber: editInfo.lineNumber,
            fileName: editInfo.fileName,
            hash: computeHash(editInfo),
        });
    }
    else {
        editInfo.hash = computeHash(editInfo);
        analytics.normalEditDetails.push(editInfo);
    }

    // Calculate average typing speed (simplified)
    const totalCharactersTyped = analytics.normalEditDetails.filter(edit => edit.text).reduce((acc, edit) => acc + edit.contentLength, 0);
    const totalTimeSpentTyping = analytics.normalEditDetails.length > 1 ? (analytics.normalEditDetails[analytics.normalEditDetails.length - 1].timestamp.getTime() - analytics.normalEditDetails[0].timestamp.getTime()) / 60000 : 0; // in minutes
    analytics.averageTypingSpeed = totalTimeSpentTyping > 0 ? Math.round((totalCharactersTyped / 5) / totalTimeSpentTyping) : 0; // considering a word as 5 characters
}

function computeHash(object: any): string {
    const objectString = JSON.stringify(object);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(objectString);
    return hashSum.digest('hex');
}
function hasEditInfoChanged(editInfo: any): boolean {
    const currentHash = editInfo.hash;
    const computedHash = computeHash(editInfo);
    return currentHash !== computedHash;
}

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "CodeGuardian" is now active.');
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('webView', new SidebarProvider(context.extensionUri)));

    const treeDataProvider = new JsonTreeDataProvider(context.extensionPath);
    vscode.window.createTreeView('jsonTreeView', { treeDataProvider });
    
    const textEditorChange = vscode.workspace.onDidChangeTextDocument((event) => {
        const filePath = event.document.fileName;
        const fileExtension = filePath.slice(filePath.lastIndexOf('.'));

        // if (!monitoredFileTypes.includes(fileExtension)) {
        //     return;
        // }

        const edits = event.contentChanges;
        analytics.totalEdits += 1;
        if (edits.length === 0) { return; }

        const edit = edits[0]; // Considering only the first edit
        const now = new Date();
        let action: 'typing' | 'pasting' = 'typing';
        let suspicious = false;
        let update = false;
        let text = edit.text;
        let currentLine = event.document.lineAt(edit.range.start.line);

        if (edit.text.length >= suspiciousBehaviorThresholds.copyPasteSize) {
            action = 'pasting';
            suspicious = true;
            update = true;
        } else if (edit.text === "\n") {
            update = true;
            text = currentLine.text;
        }

        const editInfo: EditInfo = {
            timestamp: now,
            contentLength: text.length,
            action,
            suspicious,
            text, // Include the text content of the edit
            lineNumber: edit.range.start.line,
            fileName: filePath,
            hash: '',
        };
        editInfo.hash = computeHash(editInfo);
        if (update) {
            updateAnalytics(editInfo);
        }

        // Periodically save analytics to a file
        if (analytics.totalEdits % 2 === 0) { // For example, every 10 edits
            saveAnalyticsToFile(analytics, context.extensionPath);
        }
    });

    context.subscriptions.push(textEditorChange);
}

function saveAnalyticsToFile(analytics: Analytics, extensionPath: string) {
    const filePath = path.join(extensionPath, 'analytics.json');
    fs.writeFile(filePath, JSON.stringify(analytics, null, 2), (err) => {
        if (err) {
            console.error('Failed to save analytics:', err);
            return;
        }
        console.log('Analytics saved to', filePath);
    });
}

function deactivate() { }

module.exports = { activate, deactivate };
