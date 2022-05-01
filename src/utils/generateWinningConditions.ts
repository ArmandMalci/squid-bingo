import type { WinningConditionsInterface } from "../interfaces";

export const generateWinningConditions = (
  boardSize = 5
): WinningConditionsInterface => {
  return Array.from({ length: boardSize * boardSize })
    .fill(null)
    .reduce<WinningConditionsInterface>((accumulator, _, index) => {
      return {
        ...accumulator,
        [index]: {
          row: Array.from({ length: boardSize })
            .fill(((index / boardSize) | 0) * boardSize)
            .map((value, i) => (value as number) + i),
          column: Array.from({ length: boardSize })
            .fill(index % boardSize)
            .map((value, i) => (value as number) + i * boardSize),
        },
      };
    }, {});
};

/*
n = 3

0 1 2
3 4 5
6 7 8

{
  0: { column: [0, 3, 6], row: [0, 1, 2] },
  1: { column: [1, 4, 7], row: [0, 1, 2] },
  2: { column: [2, 5, 8], row: [0, 1, 2] },
  3: { column: [0, 3, 6], row: [3, 4, 5] },
  4: { column: [1, 4, 7], row: [3, 4, 5] },
  5: { column: [2, 5, 8], row: [3, 4, 5] },
  6: { column: [0, 3, 6], row: [6, 7, 8] },
  7: { column: [1, 4, 7], row: [6, 7, 8] },
  8: { column: [2, 5, 8], row: [6, 7, 8] },
}



*/
