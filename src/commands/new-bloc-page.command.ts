import * as ld from "lodash";
import { pascalCase } from "change-case";

import {
  Uri,
  window,
} from "vscode";
import { generatePage } from "../utils/generate";
import { promptForPageName, promptForTargetDirectory } from "../utils/file-system";

export const newBlocPage = async (uri?: Uri) => {
  const pageName = await promptForPageName();
  if (ld.isNil(pageName) || pageName?.trim() === "") {
    window.showErrorMessage("The page name must not be empty");
    return;
  }

  let targetDirectory: string;

  // Use the directory from the context menu if available
  if (uri && uri.fsPath) {
    targetDirectory = uri.fsPath;
  } else {
    // Show folder picker when triggered from command palette
    const selectedFolder = await promptForTargetDirectory();
    if (!selectedFolder) {
      return; // User cancelled the folder selection
    }
    targetDirectory = selectedFolder;
  }

  const pascalCasePageName = pascalCase(pageName);
  try {
    await generatePage(pageName, targetDirectory, false);
    window.showInformationMessage(
      `Successfully Generated ${pascalCasePageName} Page`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};

