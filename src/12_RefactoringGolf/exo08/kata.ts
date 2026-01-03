/* eslint-disable */

const playerO = "O";
const noPlayer = " ";

enum BoardIndex {
  First = 0,
  Second = 1,
  Third = 2,
}

export class Game {
  private _lastPlayer = noPlayer;
  private _board: Board = new Board();

  public Play(player: string, row: BoardIndex, column: BoardIndex): void {
    this.validateFirstMove(player);
    this.validatePlayer(player);
    this.validatePositionIsEmpty(row, column);

    this.updateLastPlayer(player);
    this._board.placeTile(new Tile(row, column, player));
  }

  private validateFirstMove(player: string) {
    if (this._lastPlayer === noPlayer && player === playerO) {
      throw new Error("Invalid first player");
    }
  }

  private validatePlayer(player: string) {
    if (player === this._lastPlayer) {
      throw new Error("Invalid next player");
    }
  }

  private validatePositionIsEmpty(row: BoardIndex, column: BoardIndex) {
    if (this._board.isTilePlayedAt(row, column)) {
      throw new Error("Invalid position");
    }
  }

  private updateLastPlayer(player: string) {
    this._lastPlayer = player;
  }

  public Winner(): string {
    return this._board.findRowFullWithSamePlayer();
  }
}

class Tile {
  constructor(
    private row: BoardIndex,
    private column: BoardIndex,
    private player: string,
  ) {}

  matches(row: BoardIndex, column: BoardIndex) {
    return this.row === row && this.column === column;
  }

  get Player() {
    return this.player;
  }

  get isNotEmpty() {
    return this.player !== noPlayer;
  }

  hasSamePlayerAs(other: Tile) {
    return this.player === other.player;
  }

  updatePlayer(player: string) {
    this.player = player;
  }
}

class Board {
  private _plays: Tile[] = [];

  constructor() {
    for (const row of Object.values(BoardIndex).filter(
      (v) => typeof v === "number",
    )) {
      for (const column of Object.values(BoardIndex).filter(
        (v) => typeof v === "number",
      )) {
        this._plays.push(
          new Tile(row as BoardIndex, column as BoardIndex, noPlayer),
        );
      }
    }
  }

  public isTilePlayedAt(row: BoardIndex, column: BoardIndex) {
    return this.tileAt(row, column).isNotEmpty;
  }

  public placeTile(tile: Tile) {
    this.tileAt(tile["row"], tile["column"]).updatePlayer(tile.Player);
  }

  private tileAt(row: BoardIndex, column: BoardIndex): Tile {
    return this._plays.find((t) => t.matches(row, column))!;
  }

  private isRowFull(row: BoardIndex) {
    return (
      this.tileAt(row, BoardIndex.First).isNotEmpty &&
      this.tileAt(row, BoardIndex.Second).isNotEmpty &&
      this.tileAt(row, BoardIndex.Third).isNotEmpty
    );
  }

  private isRowFullWithSamePlayer(row: BoardIndex) {
    return (
      this.tileAt(row, BoardIndex.First).hasSamePlayerAs(
        this.tileAt(row, BoardIndex.Second),
      ) &&
      this.tileAt(row, BoardIndex.Second).hasSamePlayerAs(
        this.tileAt(row, BoardIndex.Third),
      )
    );
  }

  public findRowFullWithSamePlayer(): string {
    for (const row of Object.values(BoardIndex).filter(
      (v) => typeof v === "number",
    )) {
      if (
        this.isRowFull(row as BoardIndex) &&
        this.isRowFullWithSamePlayer(row as BoardIndex)
      ) {
        return this.tileAt(row as BoardIndex, BoardIndex.First).Player;
      }
    }
    return noPlayer;
  }
}
