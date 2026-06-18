import { shapes, TetrisEngine } from '../../app/games/tetris.engine';

describe('TetrisEngine', () => {
  it('creates an empty board and deterministic pieces', () => {
    const engine = new TetrisEngine(() => 0);

    expect(engine.board.length).toBe(20);
    expect(engine.board.every((row) => row.every((cell) => cell === null))).toBeTrue();
    expect(engine.current.name).toBe('I');
    expect(engine.next.name).toBe('I');
  });

  it('moves only into valid positions', () => {
    const engine = new TetrisEngine(() => 0);

    expect(engine.move(-1)).toBeTrue();
    engine.current.x = -1;
    expect(engine.move(-1)).toBeFalse();
    expect(engine.valid()).toBeFalse();
  });

  it('rotates pieces with wall kicks but leaves O pieces unchanged', () => {
    const engine = new TetrisEngine(() => 0.4);
    engine.current.name = 'T';
    const before = [...engine.current.blocks];
    expect(engine.rotate()).toBeTrue();
    expect(engine.current.blocks).not.toEqual(before);

    engine.current.name = 'O';
    engine.current.blocks = [...shapes.O.blocks];
    const square = [...engine.current.blocks];
    expect(engine.rotate()).toBeTrue();
    expect(engine.current.blocks).toEqual(square);
  });

  it('exposes active cells with offsets', () => {
    const engine = new TetrisEngine(() => 0);
    const base = engine.cells();
    const shifted = engine.cells(engine.current, 1, 2);

    expect(shifted[0]).toEqual([base[0][0] + 1, base[0][1] + 2]);
  });

  it('soft drops and scores while space remains', () => {
    const engine = new TetrisEngine(() => 0);
    const y = engine.current.y;

    expect(engine.softDrop()).toBeTrue();
    expect(engine.current.y).toBe(y + 1);
    expect(engine.score).toBe(1);
  });

  it('locks pieces, clears lines, and updates level', () => {
    const engine = new TetrisEngine(() => 0.1);
    engine.current.name = 'O';
    engine.current.blocks = [[0, 0], [1, 0], [0, 1], [1, 1]];
    engine.current.x = 8;
    engine.current.y = 18;
    engine.score = 950;
    engine.board[19] = Array<string | null>(10).fill('#fff');
    engine.board[19][8] = null;
    engine.board[19][9] = null;

    expect(engine.softDrop()).toBeFalse();
    expect(engine.score).toBeGreaterThanOrEqual(1050);
    expect(engine.level).toBe(2);
    expect(engine.board[19].some((cell) => cell === null)).toBeTrue();
  });

  it('hard drops and can enter game over', () => {
    const engine = new TetrisEngine(() => 0);
    engine.board[1][3] = '#fff';
    engine.board[1][4] = '#fff';
    engine.board[1][5] = '#fff';
    engine.board[1][6] = '#fff';

    engine.hardDrop();

    expect(engine.gameOver).toBeTrue();
  });

  it('resets score, level, board, and game-over state', () => {
    const engine = new TetrisEngine(() => 0.9);
    engine.score = 999;
    engine.level = 4;
    engine.gameOver = true;
    engine.board[0][0] = '#fff';

    engine.reset();

    expect(engine.score).toBe(0);
    expect(engine.level).toBe(1);
    expect(engine.gameOver).toBeFalse();
    expect(engine.board[0][0]).toBeNull();
  });
});
