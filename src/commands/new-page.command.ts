import * as ld from "lodash";
import { pascalCase } from "change-case";

import { Uri, window } from "vscode";
import { generatePage } from "../utils/generate";
import {
  promptForPageName,
  promptForTargetDirectory,
} from "../utils/file-system";

export const newPage = async (uri: Uri) => {
  const pageName = await promptForPageName();
  if (ld.isNil(pageName) || pageName?.trim() === "") {
    window.showErrorMessage("The page name must not be empty");
    return;
  }

  let targetDirectory: string;

  if (uri && uri.fsPath) {
    targetDirectory = uri.fsPath;
  } else {
    const selectedDirectory = await promptForTargetDirectory();
    if (!selectedDirectory) {
      return; // User cancelled the dir selection
    }
    targetDirectory = selectedDirectory;
  }

  const pascalCasePageName = pascalCase(pageName);
  try {
    await generatePage(pageName, targetDirectory, true);
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
