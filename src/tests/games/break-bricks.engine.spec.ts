import { BreakBricksEngine, BrickKind } from '../../app/games/break-bricks.engine';

describe('BreakBricksEngine', () => {
  it('resets the complete game state', () => {
    const engine = new BreakBricksEngine();

    expect(engine.bricks.length).toBe(60);
    expect(engine.balls.length).toBe(1);
    expect(engine.score).toBe(0);
    expect(engine.lives).toBe(3);
    expect(engine.level).toBe(1);
    expect(engine.gameOver).toBeFalse();
  });

  it('keeps paddle movement inside the play field', () => {
    const engine = new BreakBricksEngine();

    engine.setPaddleCenter(-100);
    expect(engine.paddle.x).toBe(0);
    engine.setPaddleCenter(2000);
    expect(engine.paddle.x + engine.paddle.width).toBe(engine.width);
    engine.movePaddle(-1, 0.1);
    expect(engine.paddle.x).toBeLessThan(engine.width - engine.paddle.width);
  });

  it('bounces from the left, right, top, and paddle boundaries', () => {
    const engine = new BreakBricksEngine();
    const ball = engine.balls[0];

    ball.x = 1;
    ball.vx = -100;
    engine.tick(0.016);
    expect(ball.vx).toBeGreaterThan(0);

    ball.x = engine.width - 1;
    ball.vx = 100;
    engine.tick(0.016);
    expect(ball.vx).toBeLessThan(0);

    ball.y = 1;
    ball.vy = -100;
    engine.tick(0.016);
    expect(ball.vy).toBeGreaterThan(0);

    ball.x = engine.paddle.x + engine.paddle.width / 2;
    ball.y = engine.paddle.y - 2;
    ball.vy = 100;
    engine.tick(0.016);
    expect(ball.vy).toBeLessThan(0);
  });

  for (const kind of ['speed', 'slow', 'wide', 'narrow', 'double', 'extra'] as BrickKind[]) {
    it(`applies the ${kind} brick effect`, () => {
      const engine = new BreakBricksEngine();
      const initialSpeed = engine.speed;
      const initialWidth = engine.paddle.width;
      const initialBalls = engine.balls.length;
      hitBrick(engine, kind);

      expect(engine.score).toBe(10);
      expect(engine.lastEffect).toBe(kind);
      if (kind === 'speed') expect(engine.speed).toBeGreaterThan(initialSpeed);
      if (kind === 'slow') expect(engine.speed).toBeLessThan(initialSpeed);
      if (kind === 'wide') expect(engine.paddle.width).toBeGreaterThan(initialWidth);
      if (kind === 'narrow') expect(engine.paddle.width).toBeLessThan(initialWidth);
      if (kind === 'extra') expect(engine.balls.length).toBeGreaterThan(initialBalls);
      if (kind === 'double') {
        hitBrick(engine, 'normal');
        expect(engine.score).toBe(30);
      }
    });
  }

  it('advances through different level formations', () => {
    const engine = new BreakBricksEngine();
    const counts = [engine.bricks.length];

    for (let level = 2; level <= 6; level += 1) {
      engine.advanceLevel();
      counts.push(engine.bricks.length);
      expect(engine.level).toBe(level);
      expect(engine.speed).toBe(335 + (level - 1) * 28);
    }

    expect(new Set(counts).size).toBeGreaterThan(2);
  });

  it('replaces a lost ball while lives remain and ends on the final life', () => {
    const engine = new BreakBricksEngine();
    engine.balls[0].y = engine.height + 100;
    engine.tick(0.016);
    expect(engine.lives).toBe(2);
    expect(engine.balls.length).toBe(1);

    engine.lives = 1;
    engine.balls[0].y = engine.height + 100;
    engine.tick(0.016);
    expect(engine.gameOver).toBeTrue();
  });

  it('does not update a completed game', () => {
    const engine = new BreakBricksEngine();
    const x = engine.balls[0].x;
    engine.gameOver = true;
    engine.tick(1);
    expect(engine.balls[0].x).toBe(x);
  });
});

function hitBrick(engine: BreakBricksEngine, kind: BrickKind): void {
  const brick = engine.bricks.find((candidate) => candidate.alive)!;
  brick.kind = kind;
  const ball = engine.balls[0];
  ball.x = brick.x + brick.width / 2;
  ball.y = brick.y + brick.height / 2;
  ball.vy = -100;
  engine.tick(0);
}
