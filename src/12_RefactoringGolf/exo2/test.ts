import { Game, Board } from "./kata";

describe("TicTacToe game", () => {
  let game: Game;

  beforeEach(() => {
    game = new Game();
  });

  test("should not allow player O to play first", () => {
    expect(() => {
      game.Play("O", 0, 0);
    }).toThrow();
  });

  it("should not allow player x to play twice in a row", () => {
    game.Play("X", 0, 0);
    expect(() => {
      game.Play("X", 1, 0);
    }).toThrow();
  });

  it("should not allow a player to play in last played position", () => {
    game.Play("X", 0, 0);
    expect(() => {
      game.Play("O", 0, 0);
    }).toThrow();
  });

  it("should not allow a player to play in any played position", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    expect(() => {
      game.Play("X", 0, 0);
    }).toThrow();
  });

  it("should declare player X as winner if it plays three in top row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    game.Play("X", 0, 1);
    game.Play("O", 1, 1);
    game.Play("X", 0, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in top row", () => {
    game.Play("X", 1, 0);
    game.Play("O", 0, 0);
    game.Play("X", 1, 1);
    game.Play("O", 0, 1);
    game.Play("X", 2, 2);
    game.Play("O", 0, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in middle row", () => {
    game.Play("X", 1, 0);
    game.Play("O", 0, 0);
    game.Play("X", 1, 1);
    game.Play("O", 0, 1);
    game.Play("X", 1, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in middle row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    game.Play("X", 2, 1);
    game.Play("O", 1, 1);
    game.Play("X", 2, 2);
    game.Play("O", 1, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should declare player X as winner if it plays three in bottom row", () => {
    game.Play("X", 2, 0);
    game.Play("O", 0, 0);
    game.Play("X", 2, 1);
    game.Play("O", 0, 1);
    game.Play("X", 2, 2);

    const winner = game.Winner();

    expect(winner).toBe("X");
  });

  it("should declare player O as winner if it plays three in bottom row", () => {
    game.Play("X", 0, 0);
    game.Play("O", 2, 0);
    game.Play("X", 1, 1);
    game.Play("O", 2, 1);
    game.Play("X", 0, 1);
    game.Play("O", 2, 2);

    const winner = game.Winner();

    expect(winner).toBe("O");
  });

  it("should return empty when there is no winner", () => {
    game.Play("X", 0, 0);
    game.Play("O", 1, 0);
    game.Play("X", 2, 1);
    expect(game.Winner()).toBe(" ");
  });

});

describe("Board", () => {
  it("constructor should create a 3x3 board", () => {
    const board = new Board();

    // Verify all 9 tiles exist with correct coordinates
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const tile = board.TileAt(i, j);
        expect(tile).toBeDefined();
        expect(tile.X).toBe(i);
        expect(tile.Y).toBe(j);
      }
    }
  });

  it("constructor should not create a board larger than 3x3", () => {
    const board = new Board();

    // Verify that positions outside 3x3 do not exist
    expect(board.TileAt(3, 0)).toBeUndefined();
    expect(board.TileAt(0, 3)).toBeUndefined();
    expect(board.TileAt(3, 3)).toBeUndefined();
  });
});
