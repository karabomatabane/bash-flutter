import { InputBoxOptions, OpenDialogOptions, window } from "vscode";

export async function promptForTargetDirectory(): Promise<string | undefined> {
  const options: OpenDialogOptions = {
    canSelectFiles: false,
    canSelectFolders: true,
    canSelectMany: false,
    openLabel: "Select Target Directory",
  };
  
  const folderUri = await window.showOpenDialog(options);
  if (folderUri && folderUri[0]) {
    return folderUri[0].fsPath;
  }
  return undefined;
}

export function promptForPageName(): Thenable<string | undefined> {
  const defaultInput = "home";
  const pageNamePromptOptions: InputBoxOptions = {
    prompt: "Page Name",
    placeHolder: "e.g.: home",
    value: defaultInput,
    validateInput: (text: string) => {
      if (text.trim().length === 0) {
        return "Page name must not be empty";
      }
      if (text.trim().length < 3) {
        return "Page name must be at least 3 characters long";
      }
      return null;
    },
  };
  return window.showInputBox(pageNamePromptOptions);
}

export function promptForComponentName(): Thenable<string | undefined> {
  const defaultInput = "MyWidget";
  const componentNamePromptOptions: InputBoxOptions = {
    prompt: "Component Name",
    placeHolder: "e.g.: MyWidget",
    value: defaultInput,
    validateInput: (text: string) => {
      if (text.trim().length === 0) {
        return "Component name must not be empty";
      }
      if (text.trim().length < 3) {
        return "Component name must be at least 3 characters long";
      }
      return null;
    },
  };
  return window.showInputBox(componentNamePromptOptions);
}