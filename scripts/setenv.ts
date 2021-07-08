const { writeFile } = require('fs');
const { argv } = require('yargs');

require('dotenv').config();

const environment = argv.environment;
const targetPath = `./src/environments/environment.cloud.ts`;

const environmentFileContent = `
  export const environment = {
    production: true,
    apiUrl: "${process.env.API_URL}",
    ocrApiUrl: "${process.env.OCR_API_URL}"
  };
`;

console.log(environmentFileContent);

writeFile(targetPath, environmentFileContent, (err: any) => {
  if (err) console.log(err);
  console.log(`Wrote variables to ${targetPath}`);
});
