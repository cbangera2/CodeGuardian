import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export class JsonTreeDataProvider implements vscode.TreeDataProvider<vscode.TreeItem> {
    private _onDidChangeTreeData: vscode.EventEmitter<vscode.TreeItem | undefined> = new vscode.EventEmitter<vscode.TreeItem | undefined>();
    readonly onDidChangeTreeData: vscode.Event<vscode.TreeItem | undefined> = this._onDidChangeTreeData.event;

    constructor(private workspaceRoot: string) {}

    refresh(): void {
        this._onDidChangeTreeData.fire(undefined);
    }

    getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
        return element;
    }

    getChildren(element?: vscode.TreeItem): Thenable<vscode.TreeItem[]> {
        if (!this.workspaceRoot) {
            vscode.window.showInformationMessage('No data in JSON file');
            return Promise.resolve([]);
        }

        const jsonFilePath = path.join(this.workspaceRoot, '/analytics.json');
        if (this.pathExists(jsonFilePath)) {
            const jsonFileContent = fs.readFileSync(jsonFilePath, 'utf-8');
            const jsonData = JSON.parse(jsonFileContent);
            return Promise.resolve(this.jsonToTreeItems(jsonData));
        }

        vscode.window.showInformationMessage('JSON file not found');
        return Promise.resolve([]);
    }

    private jsonToTreeItems(jsonData: any): vscode.TreeItem[] {
        let treeItems: vscode.TreeItem[] = [];
        for (const key in jsonData) {
            if (typeof jsonData[key] === 'object') {
                const treeItem = new vscode.TreeItem(key, vscode.TreeItemCollapsibleState.Collapsed);
                treeItems.push(treeItem);
            } else {
                const treeItem = new vscode.TreeItem(`${key}: ${jsonData[key]}`);
                treeItems.push(treeItem);
            }
        }
        return treeItems;
    }

    private pathExists(p: string): boolean {
        try {
            fs.accessSync(p);
        } catch (err) {
            return false;
        }
        return true;
    }
}