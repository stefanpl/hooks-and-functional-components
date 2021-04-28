import { readFile, writeFile } from "fs-extra";
import globby from "globby";
import { basename, dirname, extname, resolve } from "path";

const componentPath = resolve(
  __dirname,
  "..",
  "src",
  "components",
  "exampleComponents"
);

const defaultEncoding = "utf-8";

const nameSuffix = "WithStringRepresentation";
// eslint-disable-next-line security/detect-non-literal-regexp
const nameSuffixRegex = new RegExp(nameSuffix, "g");

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async () => {
  const glob = `${componentPath}/**/*.tsx`;
  const files = (await globby(glob)).filter(
    (file) => !nameSuffixRegex.test(file)
  );
  await Promise.all(files.map(processFile));
})();

const fileTemplate = (
  componentCode: string,
  componentStringRepresentation: string,
  componentName: string
): string => `
${componentCode}

${componentName}.stringRepresentation = \`
${componentStringRepresentation}
\`;

`;

async function processFile(filePath: string): Promise<void> {
  const originalContents = await readFile(filePath, defaultEncoding);
  const originalName = basename(filePath, extname(filePath));
  const originalFolder = dirname(filePath);

  const newFilePath = resolve(
    originalFolder,
    `${originalName}${nameSuffix}${extname(filePath)}`
  );

  const contentsWithReplacedInterface = originalContents.replace(
    /ReactFunctionComponent/g,
    "ExtendedFunctionComponent"
  );
  const newFileContents = fileTemplate(
    contentsWithReplacedInterface,
    originalContents,
    originalName
  );
  await writeFile(newFilePath, newFileContents, defaultEncoding);
}

export {};
