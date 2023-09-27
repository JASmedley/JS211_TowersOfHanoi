'use strict';

const assert = require('assert');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// An object that represents the three stacks of Towers of Hanoi; 
  // * each key is an array of Numbers: 
    // * A is the far-left, 
    // * B is the middle, 
    // * C is the far-right stack
      // * Each number represents the largest to smallest tokens: 
        // * 4 is the largest, 
        // * 1 is the smallest

let stacks = {
  a: [4, 3, 2, 1],
  b: [],
  c: []
};

// Start here. What is this function doing?
const printStacks = () => {
  console.log("a: " + stacks.a);
  console.log("b: " + stacks.b);
  console.log("c: " + stacks.c);
}

// Before you move, should you check if the move it actually allowed? Should 3 be able to be stacked on 2
const isLegal = (startStack, endStack) => {

  let startLast = stacks[startStack].length;
  let endLast = stacks[endStack].length;

 if ( stacks[endStack].length == 0) {
  return true
 }

 if (stacks[startStack][startLast] > stacks[endStack][endLast]) {
  return true
 }

 else {
  return false
 }

}

// What is a win in Towers of Hanoi? When should this function run?
// a win is when C: [4, 3, 2, 1]
// should check for a win after each move, if it's a win declare a message and end the game 
// if it's not a win continue the game 
const checkForWin = () => {
  if(stacks.b.length == 4 || stacks.c.length == 4) {
    console.log("You've won!")
    return true
  } else  {
    return false
  }
  
}

// When is this function called? What should it do with its argument?
// Lets someone enter the move they want to make and then displays that on the board 
// a move is structured as (moving from, moving to)
// a move will always move the "top-most" number from the stack. 
const towersOfHanoi = (startStack, endStack) => {
  // Your code here
  //if isLegal is true for the startStack and isLegal is true for the endStack, then put the move on the board
  if (isLegal(startStack, endStack) == true) {
    let endNumber = stacks[startStack].pop()
    stacks[endStack].push(endNumber)
  }
  checkForWin();
  }

const getPrompt = () => {
  printStacks();
  rl.question('start stack: ', (startStack) => {
    rl.question('end stack: ', (endStack) => {
      towersOfHanoi(startStack, endStack);
      getPrompt();
    });
  });
}

// Tests

if (typeof describe === 'function') {

  describe('#towersOfHanoi()', () => {
    it('should be able to move a block', () => {
      towersOfHanoi('a', 'b');
      assert.deepEqual(stacks, { a: [4, 3, 2], b: [1], c: [] });
    });
  });

  describe('#isLegal()', () => {
    it('should not allow an illegal move', () => {
      stacks = {
        a: [4, 3, 2],
        b: [1],
        c: []
      };
      assert.equal(isLegal('a', 'b'), false);
    });
    it('should allow a legal move', () => {
      stacks = {
        a: [4, 3, 2, 1],
        b: [],
        c: []
      };
      assert.equal(isLegal('a', 'c'), true);
    });
  });
  describe('#checkForWin()', () => {
    it('should detect a win', () => {
      stacks = { a: [], b: [4, 3, 2, 1], c: [] };
      assert.equal(checkForWin(), true);
      stacks = { a: [1], b: [4, 3, 2], c: [] };
      assert.equal(checkForWin(), false);
    });
  });

} else {

  getPrompt();

}
