import { BreakBricksEngine } from './break-bricks.engine';

describe('BreakBricksEngine', () => {
  it('resets with bricks, balls, score, and lives', () => {
    const engine = new BreakBricksEngine();

    expect(engine.bricks.length).toBe(60);
    expect(engine.balls.length).toBe(1);
    expect(engine.score).toBe(0);
    expect(engine.lives).toBe(3);
    expect(engine.gameOver).toBeFalse();
  });

  it('keeps the paddle inside the play field', () => {
    const engine = new BreakBricksEngine();

    engine.setPaddleCenter(-100);
    expect(engine.paddle.x).toBe(0);
    engine.setPaddleCenter(2000);
    expect(engine.paddle.x + engine.paddle.width).toBe(engine.width);
  });

  it('bounces off walls and the paddle', () => {
    const engine = new BreakBricksEngine();
    const ball = engine.balls[0];

    ball.x = 1;
    ball.vx = -100;
    engine.tick(0.016);
    expect(ball.vx).toBeGreaterThan(0);

    ball.x = engine.paddle.x + engine.paddle.width / 2;
    ball.y = engine.paddle.y - 2;
    ball.vy = 100;
    engine.tick(0.016);
    expect(ball.vy).toBeLessThan(0);
  });

  it('applies brick effects and advances to the next board', () => {
    const engine = new BreakBricksEngine();
    const brick = engine.bricks.find((item) => item.kind === 'wide');
    expect(brick).toBeDefined();
    const ball = engine.balls[0];
    ball.x = brick!.x + brick!.width / 2;
    ball.y = brick!.y + brick!.height / 2;
    ball.vy = -100;
    const width = engine.paddle.width;

    engine.tick(0.016);

    expect(engine.score).toBe(10);
    expect(engine.paddle.width).toBeGreaterThan(width);
    engine.bricks.forEach((item) => (item.alive = false));
    engine.tick(0.016);
    expect(engine.level).toBe(2);
    expect(engine.bricks.length).toBeGreaterThan(0);
    expect(engine.lastEffect).toBe('Level 2');
  });

  it('builds different brick formations as levels advance', () => {
    const engine = new BreakBricksEngine();
    const levelOneCount = engine.bricks.length;

    engine.advanceLevel();

    expect(engine.level).toBe(2);
    expect(engine.bricks.length).toBeLessThan(levelOneCount);
    expect(engine.speed).toBeGreaterThan(335);
  });

  it('removes lost balls and ends after the final life', () => {
    const engine = new BreakBricksEngine();
    engine.lives = 1;
    engine.balls[0].y = engine.height + 100;

    engine.tick(0.016);

    expect(engine.gameOver).toBeTrue();
  });
});
