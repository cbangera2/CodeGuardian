import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

class JsonTreeItem extends vscode.TreeItem {
    constructor(
        public readonly label: string,
        public readonly value: any,
        public readonly collapsibleState: vscode.TreeItemCollapsibleState
    ) {
        super(label, collapsibleState);
    }
}

export class JsonTreeDataProvider implements vscode.TreeDataProvider<JsonTreeItem> {
    constructor(private workspaceRoot: string) {}

    getTreeItem(element: JsonTreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: JsonTreeItem): Thenable<JsonTreeItem[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No data in empty workspace');
            return Promise.resolve([]);
        }

        if (element) {
            if (Array.isArray(element.value)) {
                return Promise.resolve(this.getArrayItems(element.value));
            } else if (typeof element.value === 'object') {
                return Promise.resolve(this.getObjectItems(element.value));
            } else {
                return Promise.resolve([]);
            }
        } else {
            const jsonFilePath = path.join(this.workspaceRoot, '/analytics.json');
            if (fs.existsSync(jsonFilePath)) {
                const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf-8'));
                return Promise.resolve(this.getObjectItems(jsonData));
            } else {
                vscode.window.showInformationMessage('analytics.json not found in path ' + this.workspaceRoot);
                return Promise.resolve([]);
            }
        }
    }

    private getArrayItems(arr: any[]): JsonTreeItem[] {
        return arr.map((value, index) => {
            if (Array.isArray(value) || typeof value === 'object') {
                return new JsonTreeItem(`[${index}]`, value, vscode.TreeItemCollapsibleState.Collapsed);
            } else {
                return new JsonTreeItem(`[${index}]: ${value}`, value, vscode.TreeItemCollapsibleState.None);
            }
        });
    }

    private getObjectItems(obj: any): JsonTreeItem[] {
        return Object.keys(obj).map(key => {
            if (Array.isArray(obj[key]) || typeof obj[key] === 'object') {
                return new JsonTreeItem(key, obj[key], vscode.TreeItemCollapsibleState.Collapsed);
            } else {
                return new JsonTreeItem(`${key}: ${obj[key]}`, obj[key], vscode.TreeItemCollapsibleState.None);
            }
        });
    }
}