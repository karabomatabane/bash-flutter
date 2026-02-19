// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { commands, ExtensionContext, window, workspace } from "vscode";
import { generateGoldens, newGoldenTest, newGoldenTestFromWidget, newPage } from "./commands";
import { setShowContextMenu } from "./utils/set-show-context-menu";
import { newBlocPage } from "./commands/new-bloc-page.command";

export function activate(context: ExtensionContext) {
  setShowContextMenu();

  context.subscriptions.push(
    window.onDidChangeActiveTextEditor((_) => setShowContextMenu()),
    workspace.onDidChangeWorkspaceFolders((_) => setShowContextMenu()),
    commands.registerCommand('extension.new-bloc-page', newBlocPage),
    commands.registerCommand("extension.new-page", newPage),
    commands.registerCommand("extension.new-golden-test", newGoldenTest),
    commands.registerCommand("extension.new-golden-test-from-widget", newGoldenTestFromWidget),
    commands.registerCommand("extension.generate-goldens", generateGoldens)
    // commands.registerCommand('extension.new-bloc', newBloc)
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
