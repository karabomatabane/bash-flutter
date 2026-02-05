import { Uri, window } from "vscode";
import { exec } from "../utils/exec";
import * as path from "path";

export const generateGoldens = async (uri?: Uri) => {
  if (!uri || !uri.fsPath) {
    window.showErrorMessage("No file selected");
    return;
  }

  const filePath = uri.fsPath;
  const workspaceDir = findFlutterProjectRoot(filePath);

  if (!workspaceDir) {
    window.showErrorMessage(
      "Could not find Flutter project root (pubspec.yaml)",
    );
    return;
  }

  const relativePath = path.relative(workspaceDir, filePath);

  try {
    window.showInformationMessage(`Generating goldens for ${relativePath}...`);
    await exec(`flutter test ${relativePath} --update-goldens`, {
      cwd: workspaceDir,
    });
    window.showInformationMessage(
      `Successfully generated goldens for ${relativePath}`,
    );
  } catch (error) {
    window.showErrorMessage(
      `Error generating goldens: ${error instanceof Error ? error.message : JSON.stringify(error)}`,
    );
  }
};

function findFlutterProjectRoot(filePath: string): string | null {
  const fs = require("fs");
  let dir = path.dirname(filePath);

  while (dir !== path.dirname(dir)) {
    if (fs.existsSync(path.join(dir, "pubspec.yaml"))) {
      return dir;
    }
    dir = path.dirname(dir);
  }

  return null;
}
