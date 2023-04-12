const fs = require('fs');
const { writeFile, existSync } = require('fs');
const { argv } = require('yargs');

//check if .env file exists
const envExist = fs.existsSync('.env');

if (!envExist) { 
   console.log('.env file not found, using default values...');
   process.env.REST_API_URL = 'https://localhost:9966/petclinic/api/';
   process.env.SPRING_DATASOURCE_URL = 'jdbc:postgresql://localhost:5432/petclinic';
   process.env.SPRING_DATASOURCE_USERNAME = 'username';
   process.env.SPRING_DATASOURCE_PASSWORD = 'password';
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
   SPRING_DATASOURCE_URL: "${process.env.SPRING_DATASOURCE_URL}",
   SPRING_DATASOURCE_USERNAME: "${process.env.SPRING_DATASOURCE_USERNAME}",
   SPRING_DATASOURCE_PASSWORD: "${process.env.SPRING_DATASOURCE_PASSWORD}"
   };
`;

// write the content to the respective file
writeFile(targetPath, environmentFileContent, function (err) {
   if (err) {
      console.log(err);
   }

   console.log(`Wrote variables to ${targetPath}`);
});
