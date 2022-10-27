fs = require('fs');
const request = require('request');
const { checkFile } = require('./userInput');

let data;

const printConfirmation = (file) => {
  fs.stat(file, (err, stats) => {
    console.log(`Downloaded and saved ${stats.size} bytes to ${file}.`);
  });
};


const fileComplete = (inputFile) => {
  file = inputFile;
  writePage(file, data);
};

const pageComplete = (inputData) => {
  data = inputData;
  checkFile(file, fileComplete);

};

const writePage = (file, data) => {
  
  fs.writeFile(file, data, (err) => {
    if (err) throw err;
    printConfirmation(file);
  });
};

const fetchPage = (address) => {
  
  request(address, (error, response, body) => {
    console.log(`statusCode: ${response.statusCode}: ${response.statusMessage}`);
    pageComplete(body);
  });
  
};


const input = process.argv.slice(2);
const address = input[0];
let file = input[1];

fetchPage(address, pageComplete);

module.exports = { fileComplete };

