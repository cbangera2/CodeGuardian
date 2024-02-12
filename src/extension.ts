// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "CodeGuardian" is now active!');
	
	const logFilePath = path.join(context.extensionPath, 'copy-paste-log.txt');

    function logToFile(message: string) {
        const timestamp = new Date().toISOString();
        fs.appendFileSync(logFilePath, `${timestamp}: ${message}\n`, { encoding: 'utf8' });
    }

    let lastSelection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(0, 0));
    let likelyCopiedText = '';

    vscode.window.onDidChangeTextEditorSelection(event => {
        if (!event.selections[0].isEqual(lastSelection)) {
            lastSelection = event.selections[0];
            if (!event.selections[0].isEmpty) {
                likelyCopiedText = event.textEditor.document.getText(event.selections[0]);
            }
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (event.contentChanges.length > 0) {
            let change = event.contentChanges[0];
            if (change.text.length > 1 || change.text === '\n') { // Simple heuristic to filter out single character changes
                if (change.text === likelyCopiedText) {
                    logToFile('Copied then pasted content: ' + change.text.substring(0, 100)); // Log only the first 100 chars for brevity
                } else {
                    logToFile('Pasted content from external source');
                }
            }
        }
    }, null, context.subscriptions);
	
}

// This method is called when your extension is deactivated
export function deactivate() {}
