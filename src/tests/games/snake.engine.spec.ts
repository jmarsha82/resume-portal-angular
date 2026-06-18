import { SnakeEngine } from '../../app/games/snake.engine';

describe('SnakeEngine', () => {
  it('starts with a three-cell snake and valid food', () => {
    const engine = new SnakeEngine(() => 0.2);

    expect(engine.snake.length).toBe(3);
    expect(engine.food.x).toBeGreaterThanOrEqual(0);
    expect(engine.food.y).toBeGreaterThanOrEqual(0);
    expect(engine.obstacles).toEqual([]);
  });

  it('moves forward and prevents direct reverse turns', () => {
    const engine = new SnakeEngine(() => 0.8);

    engine.turn('left');
    engine.step();

    expect(engine.direction).toBe('right');
    expect(engine.snake[0]).toEqual({ x: 13, y: 9 });
  });

  it('allows perpendicular turns in every direction', () => {
    const engine = new SnakeEngine(() => 0.8);
    engine.turn('up');
    engine.step();
    expect(engine.direction).toBe('up');
    engine.turn('left');
    engine.step();
    expect(engine.direction).toBe('left');
    engine.turn('down');
    engine.step();
    expect(engine.direction).toBe('down');
  });

  it('eats food, grows, scores, and reaches obstacle levels', () => {
    const engine = new SnakeEngine(() => 0.8);
    engine.score = 40;
    engine.food = { x: 13, y: 9 };

    engine.step();

    expect(engine.score).toBe(50);
    expect(engine.snake.length).toBe(4);
    expect(engine.level).toBe(2);
    expect(engine.obstacles.length).toBeGreaterThan(0);
    expect(engine.tickMs).toBe(108);
  });

  it('caps speed and obstacle progression at level five', () => {
    const engine = new SnakeEngine(() => 0.8);
    engine.score = 240;
    engine.food = { x: 13, y: 9 };

    engine.step();

    expect(engine.level).toBe(5);
    expect(engine.tickMs).toBe(72);
    expect(engine.obstacles.length).toBeGreaterThan(10);
  });

  it('detects obstacles, walls, and self collisions', () => {
    const obstacle = new SnakeEngine(() => 0.8);
    obstacle.obstacles = [{ x: 13, y: 9 }];
    obstacle.step();
    expect(obstacle.gameOver).toBeTrue();

    const wall = new SnakeEngine(() => 0.8);
    wall.snake[0] = { x: 23, y: 9 };
    wall.step();
    expect(wall.gameOver).toBeTrue();

    const self = new SnakeEngine(() => 0.8);
    self.snake = [{ x: 5, y: 5 }, { x: 5, y: 6 }, { x: 4, y: 6 }, { x: 4, y: 5 }, { x: 3, y: 5 }];
    self.direction = 'up';
    self.nextDirection = 'left';
    self.step();
    expect(self.gameOver).toBeTrue();
  });

  it('pauses, ignores steps after loss, and restarts cleanly', () => {
    const engine = new SnakeEngine(() => 0.8);
    const head = { ...engine.snake[0] };
    engine.paused = true;
    engine.step();
    expect(engine.snake[0]).toEqual(head);

    engine.gameOver = true;
    engine.paused = false;
    engine.step();
    expect(engine.snake[0]).toEqual(head);

    engine.restartAfterLoss();
    expect(engine.gameOver).toBeFalse();
    expect(engine.level).toBe(1);
    expect(engine.obstacles).toEqual([]);
  });
});
