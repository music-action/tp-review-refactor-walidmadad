/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const emptyPlay = " ";

export class Game {
  private _lastSymbol = emptyPlay;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol === emptyPlay && player === playerO) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastSymbol) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (!this._board.isPositionEmpty(x, y)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  constructor(
    public X: number,
    public Y: number,
    public Symbol: string,
  ) {}

  public hasSameSymbolAs(other: Tile): boolean {
    return this.Symbol === other.Symbol;
  }

  public isEmpty(): boolean {
    return this.Symbol === emptyPlay;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = firstRow; i <= thirdRow; i++) {
      for (let j = firstColumn; j <= thirdColumn; j++) {
        this._plays.push(new Tile(i, j, emptyPlay));
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t) => t.X === x && t.Y === y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this.TileAt(x, y).Symbol = symbol;
  }

  public isPositionEmpty(x: number, y: number): boolean {
    return this.TileAt(x, y).isEmpty();
  }

  public findRowFullWithSamePlayer(): string {
    for (const row of [firstRow, secondRow, thirdRow]) {
      if (this.isRowFull(row) && this.isRowFullWithSameSymbol(row)) {
        return this.TileAt(row, firstColumn).Symbol;
      }
    }
    return emptyPlay;
  }

  private isRowFull(row: number): boolean {
    return (
      !this.TileAt(row, firstColumn).isEmpty() &&
      !this.TileAt(row, secondColumn).isEmpty() &&
      !this.TileAt(row, thirdColumn).isEmpty()
    );
  }

  private isRowFullWithSameSymbol(row: number): boolean {
    const first = this.TileAt(row, firstColumn);
    const second = this.TileAt(row, secondColumn);
    const third = this.TileAt(row, thirdColumn);
    return first.hasSameSymbolAs(second) && third.hasSameSymbolAs(second);
  }
}
