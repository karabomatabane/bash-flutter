import * as ld from "lodash";
import { pascalCase, snakeCase } from "change-case";
import { window } from "vscode";
import { generateGoldenTest } from "../utils/golden-test";
import { promptForTargetDirectory } from "../utils/file-system";

export const newGoldenTestFromWidget = async () => {
  const activeEditor = window.activeTextEditor;

  if (!activeEditor) {
    window.showErrorMessage("No active editor found");
    return;
  }

  // Get the word under the cursor or selected text
  const selection = activeEditor.selection;
  let componentName: string;

  if (selection.isEmpty) {
    // No selection, try to get the word under the cursor
    const wordRange = activeEditor.document.getWordRangeAtPosition(selection.active);
    if (wordRange) {
      componentName = activeEditor.document.getText(wordRange);
    } else {
      window.showErrorMessage("No widget name found under cursor");
      return;
    }
  } else {
    // Use the selected text
    componentName = activeEditor.document.getText(selection);
  }

  if (ld.isNil(componentName) || componentName?.trim() === "") {
    window.showErrorMessage("The widget name must not be empty");
    return;
  }

  // Check if it looks like a widget name (starts with uppercase letter)
  if (!componentName.match(/^[A-Z][a-zA-Z0-9_]*$/)) {
    const proceed = await window.showWarningMessage(
      `"${componentName}" doesn't look like a typical Flutter widget name. Continue anyway?`,
      "Yes",
      "No"
    );
    if (proceed !== "Yes") {
      return;
    }
  }

  const selectedDirectory = await promptForTargetDirectory();
  if (!selectedDirectory) {
    return;
  }

  const pascalCaseComponentName = pascalCase(componentName);
  const fileName = `${snakeCase(componentName)}_golden_test.dart`;

  try {
    await generateGoldenTest(
      pascalCaseComponentName,
      snakeCase(componentName),
      selectedDirectory,
      fileName,
    );
    window.showInformationMessage(
      `Successfully Generated ${pascalCaseComponentName} Golden Test`
    );
  } catch (error) {
    window.showErrorMessage(
      `Error:
        ${error instanceof Error ? error.message : JSON.stringify(error)}`
    );
  }
};