import * as fs from "fs/promises";
import * as path from "path";

export async function generateGoldenTest(
  componentName: string,
  goldenName: string,
  targetDirectory: string,
  fileName: string,
): Promise<void> {
  const filePath = path.join(targetDirectory, fileName);

  try {
    await fs.access(filePath);
    throw new Error(`File already exists: ${fileName}`);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
      throw error;
    }
  }

  const contents = `import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:test_toolkit/test_toolkit.dart';

// TODO: update this import to your component
// import 'package:your_package/path/to/${componentName}.dart';

void main() {
  testWidgets(
    'Given ${componentName} When rendered Then display correct UI',
    harness(
      (
        WidgetTestGiven wtGiven,
        WidgetTestWhen wtWhen,
        WidgetTestThen wtThen,
      ) async {
        await wtGiven.render(
          Scaffold(
            body: Center(
              child: ${componentName}(
                // TODO: add required params
              ),
            ),
          ),
        );

        await wtThen.goldenVerified(
          '${goldenName}',
        );
      },
    ),
  );
}
`;

  await fs.writeFile(filePath, contents, { encoding: "utf-8" });
}
