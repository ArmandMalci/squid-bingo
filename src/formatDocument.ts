import { readFileSync } from "fs";

const NUMBERS_REGEX = /^[\d,]+/g;

const BOARDS_REGEX = /((\s*\d{1,2}){5}\n){5}/g;

export const formatDocument = (pathToFile: string): [number[], number[][]] => {
  const data = readFileSync(pathToFile).toString();

  const numbersString = data.match(NUMBERS_REGEX);
  if (!numbersString) {
    throw new Error("Couldn't parse the numbers");
  }
  const numbers = numbersString[0].split(",").map(Number);

  const capturedBoards = data.match(BOARDS_REGEX);
  if (!capturedBoards) {
    throw new Error("Couldn't parse the boards");
  }
  const boards = capturedBoards.map((board) =>
    board.match(/\d+/gu)!.map(Number)
  );
  return [numbers, boards];
};
