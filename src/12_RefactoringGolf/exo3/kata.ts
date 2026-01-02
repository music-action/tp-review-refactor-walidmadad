const EMPTY = ' ';
const PLAYER_O = 'O';

const BOARD_SIZE = 3;

const ERROR_INVALID_FIRST_PLAYER = 'Invalid first player';
const ERROR_INVALID_NEXT_PLAYER = 'Invalid next player';
const ERROR_INVALID_POSITION = 'Invalid position';

export class Game {
  private _lastSymbol = EMPTY;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    this.validateFirstMove(symbol);
    this.validatePlayer(symbol);
    this.validatePositionIsEmpty(x, y);

    this.updateLastPlayer(symbol);
    this.updateBoard(symbol, x, y);
  }

  private validateFirstMove(player: string) {
    if (this._lastSymbol == EMPTY && player == PLAYER_O) {
      throw new Error(ERROR_INVALID_FIRST_PLAYER);
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastSymbol) {
      throw new Error(ERROR_INVALID_NEXT_PLAYER);
    }
  }

  private validatePositionIsEmpty(x: number, y: number) {
    if (this._board.TileAt(x, y).Symbol != EMPTY) {
      throw new Error(ERROR_INVALID_POSITION);
    }
  }

  private updateLastPlayer(player: string) {
    this._lastSymbol = player;
  }

  private updateBoard(player: string, x: number, y: number) {
    this._board.AddTileAt(player, x, y);
  }

  public Winner(): string {
    for (let row = 0; row < BOARD_SIZE; row++) {
      if (this.isRowWinning(row)) return this._board.TileAt(row, 0).Symbol;
    }
    return EMPTY;
  }

  private isRowFull(row: number): boolean {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (this._board.TileAt(row, col).Symbol === EMPTY) return false;
    }
    return true;
  }

  private isRowWinning(row: number): boolean {
    return (
        this.isRowFull(row) &&
        this._board.TileAt(row, 0).Symbol === this._board.TileAt(row, 1).Symbol &&
        this._board.TileAt(row, 1).Symbol === this._board.TileAt(row, 2).Symbol
    );
  }
}

interface Tile {
  X: number;
  Y: number;
  Symbol: string;
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let i = 0; i < BOARD_SIZE; i++) {
      for (let j = 0; j < BOARD_SIZE; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: EMPTY };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
