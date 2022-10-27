const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const complete = () => {
  console.log('We done');
};

const questions = () => {
  rl.question('Are we all good?\n', (answer) => {
    if (answer === 'y') {
      complete();
      rl.close();
      return;
    }
    questions();
  });
};

questions();