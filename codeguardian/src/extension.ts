import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

import { JsonTreeDataProvider } from './jsonTreeDataProvider';
import { computeHash, verifyCommand } from './verifyData';

interface EditInfo {
    timestamp: Date;
    contentLength: number;
    action: 'typing' | 'pasting';
    suspicious: boolean;
    text?: string; // Optional field to store the text of suspicious edits
    lineNumber?: number;
    fileName?: string; // Optional field to store the
    hash: string;
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

export function activate(context: vscode.ExtensionContext) {
    console.log('Extension "CodeGuardian" is now active.');

    // Create a tree view
    const treeDataProvider = new JsonTreeDataProvider(context.extensionPath);
    vscode.window.createTreeView('jsonTreeView', { treeDataProvider });

    // Register the verify command
    context.subscriptions.push(vscode.commands.registerCommand('codeguardian.verify', () => verifyCommand(context)));


    // Register the text editor change event
    const textEditorChange = vscode.workspace.onDidChangeTextDocument((event) => {
        const filePath = event.document.fileName;
        const fileExtension = filePath.slice(filePath.lastIndexOf('.'));

        // if (!monitoredFileTypes.includes(fileExtension)) {
        //     return;
        // }

        const edits = event.contentChanges;
        analytics.totalEdits += 1; // Increment the total number of edits
        if (edits.length === 0) { return; } // No edits to process

        const edit = edits[0]; // Considering only the first edit
        const now = new Date(); // Current timestamp
        let action: 'typing' | 'pasting' = 'typing'; // Default action
        let suspicious = false; // Default behavior
        let update = false; // Flag to update the analytics
        let text = edit.text; // Default text content of the edit
        let currentLine = event.document.lineAt(edit.range.start.line); // Get the current line

        if (edit.text.length >= suspiciousBehaviorThresholds.copyPasteSize) {
            action = 'pasting';
            suspicious = true;
            update = true;
        } else if (edit.text === "\n") { // If the edit is a new line
            update = true;
            analytics.totalLinesEdited += 1;
            text = currentLine.text;
        }

        const editInfo: EditInfo = { // Create an object to store the edit details
            timestamp: now,
            contentLength: text.length,
            action,
            suspicious,
            text, // Include the text content of the edit
            lineNumber: edit.range.start.line,
            fileName: filePath,
            hash: '',
        };
        editInfo.hash = computeHash(editInfo); // Compute the hash of the edit
        if (update) { // Update the analytics if necessary
            updateAnalytics(editInfo);
        }

        // Periodically save analytics to a file
        if (analytics.totalEdits % 2 === 0) { // For example, every 10 edits
            saveAnalyticsToFile(analytics, context.extensionPath);
        }
    });

    context.subscriptions.push(textEditorChange); // Register the event listener
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

function deactivate() { } // No cleanup necessary

module.exports = { activate, deactivate }; // Export the activate and deactivate functions
