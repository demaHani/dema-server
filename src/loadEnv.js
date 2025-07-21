const path = require('path');
const dotenv = require('dotenv');

console.log(`--- Attempting to load .env file from: ${path.resolve(__dirname, '../.env')} ---`);

const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });

if (result.error) {
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.error('!!! FATAL: Error loading .env file:', result.error.message);
  console.error('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
} else {
  console.log('--- .env file loaded. Parsed content: ---');
  console.log(result.parsed);
  console.log('-----------------------------------------');
} 