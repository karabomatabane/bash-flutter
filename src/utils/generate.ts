import { exec } from "./exec";

export async function generatePage(
  pageName: string,
  targetDirectory: string,
  skipBloc: boolean
) {
  const command = `bf g p ${targetDirectory}/${pageName} ${skipBloc ? "--skip-bloc" : ""}`;
  await exec(command, { cwd: targetDirectory }).catch((error) => {
    throw new Error(`Error generating page: ${error}`);
  });
}