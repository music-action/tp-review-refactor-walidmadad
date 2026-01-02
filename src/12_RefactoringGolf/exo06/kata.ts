/* eslint-disable */

const EMPTY_MARK = " ";
const PLAYER_O = "O";
const GRID_SIZE = 3;

export class Game {
  private _lastMark = EMPTY_MARK;
  private _grid: Grid = new Grid();

  public playTurn(mark: string, row: number, column: number): void {
    this.validateFirstMove(mark);
    this.validatePlayer(mark);
    this.validateCellIsEmpty(row, column);

    this.updateLastMark(mark);
    this.placeMark(mark, row, column);
  }

  private validateFirstMove(mark: string) {
    if (this._lastMark === EMPTY_MARK && mark === PLAYER_O) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(mark: string) {
    if (mark === this._lastMark) {
      throw new Error("Invalid next player");
    }
  }

  private validateCellIsEmpty(row: number, column: number) {
    if (!this._grid.isCellEmpty(row, column)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastMark(mark: string) {
    this._lastMark = mark;
  }

  private placeMark(mark: string, row: number, column: number) {
    this._grid.placeMark(mark, row, column);
  }

  public getWinner(): string {
    return this._grid.getWinnerRow();
  }
}

export class Cell {
  constructor(
    private _row: number,
    private _column: number,
    private _mark: string,
  ) {}

  get mark() {
    return this._mark;
  }

  get hasMark(): boolean {
    return this._mark !== EMPTY_MARK;
  }

  public hasSameMarkAs(other: Cell): boolean {
    return this._mark === other.mark;
  }

  public hasSameCoordinatesAs(other: Cell): boolean {
    return this._row === other._row && this._column === other._column;
  }

  public setMark(mark: string) {
    this._mark = mark;
  }
}

export class Grid {
  private _cells: Cell[] = [];

  constructor() {
    for (let row = 0; row < GRID_SIZE; row++) {
      for (let col = 0; col < GRID_SIZE; col++) {
        this._cells.push(new Cell(row, col, EMPTY_MARK));
      }
    }
  }

  public cellAt(row: number, column: number): Cell {
    return this._cells.find((c) =>
      c.hasSameCoordinatesAs(new Cell(row, column, EMPTY_MARK)),
    )!;
  }

  public placeMark(mark: string, row: number, column: number): void {
    this.cellAt(row, column).setMark(mark);
  }

  public isCellEmpty(row: number, column: number): boolean {
    return !this.cellAt(row, column).hasMark;
  }

  public getWinnerRow(): string {
    for (let row = 0; row < GRID_SIZE; row++) {
      if (this.isRowFull(row) && this.isRowWinning(row)) {
        return this.cellAt(row, 0).mark;
      }
    }
    return EMPTY_MARK;
  }

  private isRowFull(row: number): boolean {
    return (
      this.cellAt(row, 0).hasMark &&
      this.cellAt(row, 1).hasMark &&
      this.cellAt(row, 2).hasMark
    );
  }

  private isRowWinning(row: number): boolean {
    const first = this.cellAt(row, 0);
    const second = this.cellAt(row, 1);
    const third = this.cellAt(row, 2);
    return first.hasSameMarkAs(second) && third.hasSameMarkAs(second);
  }
}
