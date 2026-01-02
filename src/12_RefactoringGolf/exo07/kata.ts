/* eslint-disable */

const firstRow = 0;
const secondRow = 1;
const thirdRow = 2;
const firstColumn = 0;
const secondColumn = 1;
const thirdColumn = 2;

const playerO = "O";
const noPlayer = " ";

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(player: string, x: number, y: number): void {
    const move = new Move(x, y, player);

    this.validateFirstMove(move.player);
    this.validatePlayer(move.player);
    this.validatePositionIsEmpty(move);

    this.updateLastPlayer(move.player);
    this.updateBoard(move);
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer == noPlayer) {
      if (player == playerO) {
        throw new Error("Invalid first player");
      }
    }
  }

  private validatePlayer(player: string) {
    if (player == this._lastPlayer) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(move: Move) {
    if (this._board.isTilePlayedAt(move)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  private updateBoard(move: Move) {
    this._board.placeMove(move);
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  constructor(
    private row: number,
    private column: number,
    private player: string,
  ) {}

  matches(move: Move) {
    return this.row === move.row && this.column === move.column;
  }

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.Player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.Player === other.Player;
  }

  place(player: string) {
    this.player = player;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (let x = firstRow; x <= thirdRow; x++) {
      for (let y = firstColumn; y <= thirdColumn; y++) {
        this._plays.push(new Tile(x, y, noPlayer));
      }
    }
  }

  public placeMove(move: Move): void {
    this._plays.find((t) => t.matches(move))!.place(move.player);
  }

  public isTilePlayedAt(move: Move) {
    return this._plays.find((t) => t.matches(move))!.isNotEmpty;
  }

  public AddTileAt(move: Move): void {
    this._plays.find((t) => t.matches(move))!.place(move.player);
  }

  public findRowFullWithSamePlayer(): string {
    if (this.isRowFull(firstRow) && this.isRowFullWithSamePlayer(firstRow)) {
      return this.playerAt(firstRow, firstColumn);
    }

    if (this.isRowFull(secondRow) && this.isRowFullWithSamePlayer(secondRow)) {
      return this.playerAt(secondRow, firstColumn);
    }

    if (this.isRowFull(thirdRow) && this.isRowFullWithSamePlayer(thirdRow)) {
      return this.playerAt(thirdRow, firstColumn);
    }

    return noPlayer;
  }

  private hasSamePlayer(x: number, y: number, otherX: number, otherY: number) {
    return this.TileAt(x, y)!.hasSamePlayerAs(this.TileAt(otherX, otherY)!);
  }

  private playerAt(x: number, y: number) {
    return this.TileAt(x, y)!.Player;
  }

  private TileAt(row: number, column: number): Tile {
    return this._plays.find((t) => t.matches(new Move(row, column, noPlayer)))!;
  }

  private isRowFull(row: number) {
    return (
      this.TileAt(row, firstColumn).isNotEmpty &&
      this.TileAt(row, secondColumn).isNotEmpty &&
      this.TileAt(row, thirdColumn).isNotEmpty
    );
  }

  private isRowFullWithSamePlayer(row: number) {
    return (
      this.hasSamePlayer(row, firstColumn, row, secondColumn) &&
      this.hasSamePlayer(row, secondColumn, row, thirdColumn)
    );
  }
}

class Move {
  constructor(
    public readonly row: number,
    public readonly column: number,
    public readonly player: string,
  ) {}
}
