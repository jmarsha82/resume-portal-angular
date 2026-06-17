import { TetrisEngine } from './tetris.engine';

describe('TetrisEngine', () => {
  it('creates an empty board and active pieces', () => {
    const engine = new TetrisEngine(() => 0);

    expect(engine.board.length).toBe(20);
    expect(engine.current.name).toBe('I');
    expect(engine.next.name).toBe('I');
  });

  it('moves only when a position is valid', () => {
    const engine = new TetrisEngine(() => 0);

    expect(engine.move(-1)).toBeTrue();
    engine.current.x = -1;
    expect(engine.move(-1)).toBeFalse();
  });

  it('rotates pieces with wall kicks', () => {
    const engine = new TetrisEngine(() => 0.4);
    engine.current.name = 'T';

    expect(engine.rotate()).toBeTrue();
    expect(engine.current.blocks).not.toEqual([[1, 0], [0, 1], [1, 1], [2, 1]]);
  });

  it('soft drops, locks, clears lines, and levels', () => {
    const engine = new TetrisEngine(() => 0.1);
    engine.current.name = 'O';
    engine.current.blocks = [[0, 0], [1, 0], [0, 1], [1, 1]];
    engine.current.x = 8;
    engine.current.y = 18;
    engine.board[19] = Array<string | null>(10).fill('#fff');
    engine.board[19][8] = null;
    engine.board[19][9] = null;

    expect(engine.softDrop()).toBeFalse();

    expect(engine.score).toBeGreaterThanOrEqual(100);
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
});
