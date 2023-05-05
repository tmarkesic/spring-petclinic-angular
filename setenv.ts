const fs = require('fs');
const { writeFile, existSync } = require('fs');
const { argv } = require('yargs');

//check if .env file exists
const envExist = fs.existsSync('.env');

if (!envExist) { 
   console.log('.env file not found, using default values...');
   process.env.REST_API_URL = 'https://localhost:9966/petclinic/api/';
}

if (!process.env.REST_API_URL) {
   console.log('REST_API_URL not defined in .env file, using default value...');
   process.env.REST_API_URL = 'https://localhost:9966/petclinic/api/';
}

// read environment variables from .env file
require('dotenv').config({override: true});

// read the command line arguments passed with yargs
const environment = argv.environment;
const isProduction = environment === 'prod';

const targetPath = isProduction
   ? `./src/environments/environment.prod.ts`
   : `./src/environments/environment.ts`;

// we have access to our environment variables
// in the process.env object thanks to dotenv
const environmentFileContent = `
export const environment = {
   production: ${isProduction},
   REST_API_URL: "${process.env.REST_API_URL}",
   };
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }

   console.log(`Wrote variables to ${targetPath}`);
});
