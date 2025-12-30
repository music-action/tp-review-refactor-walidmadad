/* eslint-disable */
const EMPTY_SYMBOL = " ";

// read the code
export class Game {
  private _lastSymbol = EMPTY_SYMBOL;
  private _board: Board = new Board();

  public Play(symbol: string, x: number, y: number): void {
    //if first move
    if (this._lastSymbol == EMPTY_SYMBOL) {
      //if player is X
      if (symbol == "O") {
        throw new Error("Invalid first player");
      }
    }
    //if not first move but player repeated
    else if (symbol == this._lastSymbol) {
      throw new Error("Invalid next player");
    }
    //if not first move but play on an already played tile
    else if (this._board.TileAt(x, y).Symbol != EMPTY_SYMBOL) {
      throw new Error("Invalid position");
    }

    // update game state
    this._lastSymbol = symbol;
    this._board.AddTileAt(symbol, x, y);
  }

  public Winner(): string {
    for (let row = 0; row < 3; row++) {
      const a = this._board.TileAt(row, 0)!.Symbol;
      const b = this._board.TileAt(row, 1)!.Symbol;
      const c = this._board.TileAt(row, 2)!.Symbol;
      if (a !== EMPTY_SYMBOL && a === b && b === c) return a;
    }
    return EMPTY_SYMBOL;
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
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile: Tile = { X: i, Y: j, Symbol: EMPTY_SYMBOL };
        this._plays.push(tile);
      }
    }
  }

  public TileAt(x: number, y: number): Tile {
    return this._plays.find((t: Tile) => t.X == x && t.Y == y)!;
  }

  public AddTileAt(symbol: string, x: number, y: number): void {
    //@ts-ignore
    this._plays.find((t: Tile) => t.X == x && t.Y == y)!.Symbol = symbol;
  }
}
