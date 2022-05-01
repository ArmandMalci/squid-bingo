import { join } from "path";

import { Bingo } from "./bingo";
import { Board } from "./board";
import { formatDocument } from "./formatDocument";
import { generateWinningConditions } from "./utils";

const [numbersToBeCalled, boards] = formatDocument(
  join(__dirname, "advent-input.txt")
);
const winningConditions = generateWinningConditions();

const bingoBoards = boards.map(
  (numbers, index) => new Board(numbers, index, 5, winningConditions)
);

const game = new Bingo(bingoBoards);

// Part 1
const part1 = () => {
  for (const number of numbersToBeCalled) {
    game.callNumber(number);
    if (game.winningBoards.length > 0) {
      break;
    }
  }
  if (game.winningBoards.length === 0) {
    return "No board won the game. Good luck next time";
  }

  const [firstBoard] = game.winningBoards;
  return `The FIRST board to win was ${firstBoard.name} with the lucky number ${
    firstBoard.winningNumber
  } and SCORE: ${firstBoard.calculateWinningSum()}`;
};

// Part 2
const part2 = () => {
  for (const number of numbersToBeCalled) {
    game.callNumber(number);
    if (game.boards.length === game.winningBoards.length) {
      break;
    }
  }
  if (game.winningBoards.length === 0) {
    return "No board won the game. Good luck next time";
  }

  const lastBoard = game.winningBoards[game.winningBoards.length - 1];
  return `The LAST board to win was ${lastBoard.name} with the lucky number ${
    lastBoard.winningNumber
  } and SCORE: ${lastBoard.calculateWinningSum()}`;
};

console.log({
  part1: part1(),
  part2: part2(),
});
