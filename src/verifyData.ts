import * as vscode from 'vscode';
import * as crypto from 'crypto';
import * as fs from 'fs';
import * as path from 'path';

export function computeHash(object: any): string {
    // Temporarily remove the hash property
    const { hash, ...objectWithoutHash } = object;
    const objectString = JSON.stringify(objectWithoutHash);
    const hashSum = crypto.createHash('sha256');
    hashSum.update(objectString);
    return hashSum.digest('hex');
}

export function verifyHash(editInfo: any): boolean {
    if (!editInfo.hasOwnProperty('hash')) {
        return false;
    }

    const currentHash = editInfo.hash;
    // Remove the hash property before computing the hash
    const { hash, ...editInfoWithoutHash } = editInfo;
    const computedHash = computeHash(editInfoWithoutHash);
    return currentHash !== computedHash;
}

export function verifyCommand(context: vscode.ExtensionContext) {
    vscode.window.showInformationMessage('Verifying Edit History...');
    const jsonFilePath = path.join(context.extensionPath, 'analytics.json');
    const jsonFileContent = fs.readFileSync(jsonFilePath, 'utf-8');
    if (!jsonFileContent) {
        vscode.window.showErrorMessage('Edit history file not found');
        return;
    } else {
        vscode.window.showInformationMessage('Edit history file found');
    }
    const jsonData = JSON.parse(jsonFileContent);
    const allEdits = [...jsonData.normalEditDetails, ...jsonData.suspiciousEditDetails];

    vscode.window.showInformationMessage('Verifying ' + allEdits.length + ' edits...');

    for (const editInfo of allEdits) {
        //Print the edit info to a VS Code window
        vscode.window.showInformationMessage(JSON.stringify(editInfo));

        if (verifyHash(editInfo)) {
            vscode.window.showErrorMessage('Edit history has been changed for id: ' + editInfo.id);
        } else {
            vscode.window.showInformationMessage('Edit history has not been changed for id: ' + editInfo.id);
        }
    }
    vscode.window.showInformationMessage('Edit history has not been changed');

}