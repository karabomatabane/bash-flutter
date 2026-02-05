import * as ld from "lodash";
import { pascalCase, snakeCase } from "change-case";
import { Uri, window } from "vscode";
import { generateGoldenTest } from "../utils/golden-test";
import {
  promptForComponentName,
  promptForTargetDirectory,
} from "../utils/file-system";

export const newGoldenTest = async (uri?: Uri) => {
  const componentName = await promptForComponentName();
  if (ld.isNil(componentName) || componentName?.trim() === "") {
    window.showErrorMessage("The component name must not be empty");
    return;
  }

  let targetDirectory: string;

  if (uri && uri.fsPath) {
    targetDirectory = uri.fsPath;
  } else {
    const selectedDirectory = await promptForTargetDirectory();
    if (!selectedDirectory) {
      return;
    }
    targetDirectory = selectedDirectory;
  }

  const pascalCaseComponentName = pascalCase(componentName);
  const fileName = `${snakeCase(componentName)}_golden_test.dart`;

  try {
    await generateGoldenTest(
      pascalCaseComponentName,
      snakeCase(componentName),
      targetDirectory,
      fileName,
    );
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseComponentName} Golden Test`,
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`,
    );
  }
};
