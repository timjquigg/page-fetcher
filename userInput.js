const fileComplete = require('./fetcher');
const fs = require('fs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const checkFile = (file, fileComplete) => {
  fs.stat(file, (err, stats) => {
    if (err) {
      rl.question('Invalid file path, please enter a new path.\n', (answer) => {
        checkFile(answer, fileComplete);
      });
    } else if (stats) {
      rl.question('File already exists. Would you like to overwite? (y/n)\n', (answer) => {
        if (answer.toLowerCase() === 'y') {
          console.log('Overwriting...');
          rl.close();
          fileComplete(file);
        }
        if (answer.toLowerCase() === 'n') {
          rl.question('Please enter new fie path.\n', (answer) => {
            checkFile(answer, fileComplete);
          });
        }
      });
    } else {
      fileComplete(file);
      rl.close();
    }
  });
};

module.exports = {
  checkFile
};