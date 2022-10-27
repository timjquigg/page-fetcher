const request = require('request');
const fs = require('fs');

const printConfirmation = (file) => {
  fs.stat(file, (err, stats) => {
    console.log(`Downloaded and saved ${stats.size} bytes to ${file}.`);
  });
};

const writePage = (file, data, printConfirmation) => {
  fs.writeFile(file, data, (err) => {
    if (err) throw err;
    printConfirmation(file);
  });
};

const fetchPage = (address, file, writePage) => {
  
  request(address, (error, response, body) => {
    // console.log('error:', error); // Print the error if one occurred
    // console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    // console.log('body:', body); // Print the HTML for the Google homepage.
    writePage(file, body, printConfirmation);
  });
  
};


const input = process.argv.slice(2);
const address = input[0];
const file = input[1];

fetchPage(address, file, writePage);

