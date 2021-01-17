const request = require('request');
const fs = require('fs');

const userInputs = process.argv.slice(2);
const URL = userInputs[0];
const filePath = userInputs[1];

if (filePath.slice(0, 2) !== './' || filePath.slice(filePath.length - 5) !== '.html') {
  console.log('file path is invalid');
} else {
  request(URL, (error, response, body) => {
    if (error !== null) {
      console.log(error);
    } else if (response.statusCode !== 200 && response.statusCode !== undefined ) {
      console.log(`Status Code: ${response.statusCode}`);
    } else {
      fs.writeFile(filePath, body, () => {
        console.log(`Downloaded and saved ${response.headers['content-length']} bytes to ${filePath}`);
      });
    }
  });
}
