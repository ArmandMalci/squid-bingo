import type {
  BoardItemInterface,
  WinningConditionsInterface,
  WinningNumberType,
} from "./interfaces";

export class Board {
  public name = "";

  private _state: BoardItemInterface[];

  private _isWinner = false;

  private _winningNumber: WinningNumberType = null;

  private readonly markedIndexes: number[] = [];

  private readonly size: number;

  private readonly winningConditionsMap: WinningConditionsInterface;

  public constructor(
    numbers: number[],
    id: number,
    size: number,
    winningConditions: WinningConditionsInterface
  ) {
    this._state = numbers.map((number) => ({
      isMarked: false,
      value: number,
    }));
    this.name = `Board${id}`;
    this.size = size;
    this.winningConditionsMap = winningConditions;
  }

  public get state(): BoardItemInterface[] {
    return this._state;
  }

  public get isWinner(): boolean {
    return this._isWinner;
  }

  private set isWinner(value: boolean) {
    this._isWinner = value;
  }

  public get winningNumber(): WinningNumberType {
    return this._winningNumber;
  }

  private set winningNumber(number: number | null) {
    this._winningNumber = number;
  }

  public markNumber(number: number): void {
    const numberIndex = this._state.findIndex((item) => item.value === number);
    if (numberIndex === -1) {
      return;
    }
    this._state[numberIndex].isMarked = true;
    this.markedIndexes.push(numberIndex);
    if (this.markedIndexes.length <= this.size) {
      return;
    }
    if (!this.isWinning()) {
      return;
    }
    this.winningNumber = number;
    this.isWinner = true;
  }

  public calculateWinningSum(): number {
    if (!this.winningNumber) {
      throw new Error(`Board: ${this.name} has not won yet`);
    }
    return (
      this._state.reduce((total, currentValue) => {
        if (currentValue.isMarked) {
          return total;
        }
        return total + currentValue.value;
      }, 0) * this.winningNumber
    );
  }

  private isWinning(): boolean {
    return this.markedIndexes.some((value) => {
      const hasWinningColumn = !!this.winningConditionsMap[value].column.every(
        (columnValue) => this.markedIndexes.includes(columnValue)
      );

      const hasWinningRow = !!this.winningConditionsMap[value].row.every(
        (columnValue) => this.markedIndexes.includes(columnValue)
      );

      return hasWinningColumn || hasWinningRow;
    });
  }
}
