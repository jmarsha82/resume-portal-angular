import { SnakeEngine } from './snake.engine';

describe('SnakeEngine', () => {
  it('starts with a three-cell snake and food on the board', () => {
    const engine = new SnakeEngine(() => 0.2);

    expect(engine.snake.length).toBe(3);
    expect(engine.food.x).toBeGreaterThanOrEqual(0);
    expect(engine.food.y).toBeGreaterThanOrEqual(0);
  });

  it('moves forward and prevents direct reverse turns', () => {
    const engine = new SnakeEngine(() => 0.8);

    engine.turn('left');
    engine.step();

    expect(engine.direction).toBe('right');
    expect(engine.snake[0]).toEqual({ x: 13, y: 9 });
  });

  it('eats food, grows, and scores', () => {
    const engine = new SnakeEngine(() => 0.8);
    engine.food = { x: 13, y: 9 };

    engine.step();

    expect(engine.score).toBe(10);
    expect(engine.snake.length).toBe(4);
  });

  it('adds obstacle formations and speeds up as levels increase', () => {
    const engine = new SnakeEngine(() => 0.8);
    engine.score = 40;
    engine.food = { x: 13, y: 9 };

    engine.step();

    expect(engine.level).toBe(2);
    expect(engine.obstacles.length).toBeGreaterThan(0);
    expect(engine.tickMs).toBeLessThan(120);
  });

  it('treats obstacles as collisions and supports restart after loss', () => {
    const engine = new SnakeEngine(() => 0.8);
    engine.obstacles = [{ x: 13, y: 9 }];

    engine.step();
    expect(engine.gameOver).toBeTrue();

    engine.restartAfterLoss();
    expect(engine.gameOver).toBeFalse();
    expect(engine.level).toBe(1);
    expect(engine.obstacles.length).toBe(0);
  });

  it('detects wall and self collisions', () => {
    const wall = new SnakeEngine(() => 0.8);
    wall.snake[0] = { x: 23, y: 9 };
    wall.step();
    expect(wall.gameOver).toBeTrue();

    const self = new SnakeEngine(() => 0.8);
    self.snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 4, y: 6 }, { x: 4, y: 5 }, { x: 5, y: 5 }];
    self.direction = 'up';
    self.nextDirection = 'left';
    self.step();
    expect(self.gameOver).toBeTrue();
  });

  it('does not step while paused', () => {
    const engine = new SnakeEngine(() => 0.8);
    engine.paused = true;
    engine.step();
    expect(engine.snake[0]).toEqual({ x: 12, y: 9 });
  });
});
