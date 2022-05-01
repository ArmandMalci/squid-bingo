import type { Board } from "./board";

export class Bingo {
  public boards: Board[];

  public winningBoards: Board[] = [];

  public constructor(boards: Board[]) {
    this.boards = boards;
  }

  public addWinningBoard(board: Board): void {
    if (this.winningBoards.includes(board)) {
      return;
    }
    this.winningBoards.push(board);
  }

  public callNumber(number: number): void {
    this.boards.forEach((board) => {
      board.markNumber(number);
      if (board.isWinner) {
        this.addWinningBoard(board);
      }
    });
  }
}
