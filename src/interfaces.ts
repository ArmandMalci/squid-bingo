export interface WinningConditionsInterface {
  [key: number]: { row: number[]; column: number[] };
}
export interface BoardItemInterface {
  value: number;
  isMarked: boolean;
}

export type WinningNumberType = null | number;
