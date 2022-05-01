import type { WinningConditionsInterface } from '../interfaces';

export const generateWinningConditions = (
  boardSize = 5,
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
