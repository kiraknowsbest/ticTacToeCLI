var Inquirer = require('inquirer');

var row1 = [' ',' ',' '];
var row2 = [' ',' ',' '];
var row3 = [' ',' ',' '];
var board = [row1,row2,row3];

var count = -1;
var row = 0;
var col = 0;
var playing = true;

var questions = [{
  name: 'row',
  type: 'input',
  message: 'What row would you like to mark? 1, 2, or 3?',
  validate: function (val) {
    if (0 < val < 4) {
      row = val - 1;
      return row;
    } else {
      return 'Please enter the row again:'
    }
  }
}, {
  name: 'col',
  type: 'input',
  message: 'What column would you like to mark? 1, 2, or 3?',
  validate: function (val) {
    if (0 < val < 4) {
      col = val - 1;
      return col;
    } else {
      return 'Please enter the column again:'
    }
  }
}];

var winPresent = function () {
  var win = false;
  if (row1[0] === row1[1] && row1[1] === row1[2]) {
    win = true;
  }
  if (row2[0] === row2[1] && row2[1] === row2[2]) {
    win = true;
  }
  if (row3[0] === row3[1] && row3[1] === row3[2]) {
    win = true;
  }
  if (row1[0] === row2[0] && row2[0] === row3[0]) {
    win = true;
  }
  if (row1[1] === row2[1] && row2[1] === row3[1]) {
    win = true;
  }
  if (row1[2] === row2[2] && row2[2] === row3[2]) {
    win = true;
  }
  if (row1[0] === row2[1] && row2[1] === row3[2]) {
    win = true;
  }
  if (row1[2] === row2[1] && row2[1] === row3[0]) {
    win = true;
  }
};

var replay = [{
  name: 'replay',
  type: 'input',
  message: 'Play again?',
  validate: function (val) {
    if (typeof val === 'string') {
      playing = val.toLowerCase().charAt(0) === 'n' ? false : true;
      return playing;
    } else {
      return "Play again?";
    }
  }
}];

var addMove = function (row, col) {
  console.log('inside add move');
  if (board[row][col] === ' ') {
    board[row][col] = count % 2 === 0 ? 'X' : 'O';
  }
};

// logs out bored and prompts for move
var logBoard = function () {
  if (winPresent()) {
    Inquirer.prompt(replay).then(function (res) {
      console.log(res);
    });
  } else {
    count++;
    console.log(row1);
    console.log(row2);
    console.log(row3);
    console.log('');
    if (count % 2 === 0) {
      console.log('Player 1\'s turn');
    } else {
      console.log('Player 2\'s turn');
    }
    Inquirer.prompt(questions).then(addMove(row, col));
  }
};

// while (playing) {
//   logBoard();
// }
