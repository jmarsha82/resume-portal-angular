export type BrickKind = 'normal' | 'speed' | 'slow' | 'wide' | 'narrow' | 'double' | 'extra';

export interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface Ball {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export interface Brick extends Rect {
  kind: BrickKind;
  alive: boolean;
}

export class BreakBricksEngine {
  readonly width = 780;
  readonly height = 560;
  readonly ballRadius = 8;
  readonly paddleY = 510;
  score = 0;
  lives = 3;
  level = 1;
  speed = 335;
  paddle: Rect = { x: 324, y: this.paddleY, width: 132, height: 18 };
  balls: Ball[] = [];
  bricks: Brick[] = [];
  won = false;
  gameOver = false;
  lastEffect = 'Break colorful bricks';
  private multiplier = 0;

  constructor() {
    this.reset();
  }

  reset(): void {
    this.score = 0;
    this.lives = 3;
    this.level = 1;
    this.startLevel();
  }

  startLevel(): void {
    this.speed = 335 + (this.level - 1) * 28;
    this.paddle = { x: 324, y: this.paddleY, width: 132, height: 18 };
    this.balls = [this.makeBall(this.paddle.x + this.paddle.width / 2, this.paddle.y - 24, -0.35, -1)];
    this.bricks = this.makeBricks(this.level);
    this.won = false;
    this.gameOver = false;
    this.lastEffect = `Level ${this.level}`;
    this.multiplier = 0;
  }

  advanceLevel(): void {
    this.level = Math.min(6, this.level + 1);
    this.startLevel();
  }

  setPaddleCenter(x: number): void {
    this.paddle.x = Math.max(0, Math.min(this.width - this.paddle.width, x - this.paddle.width / 2));
  }

  movePaddle(direction: number, dt: number): void {
    this.setPaddleCenter(this.paddle.x + this.paddle.width / 2 + direction * 600 * dt);
  }

  tick(dt: number): void {
    if (this.gameOver || this.won) {
      return;
    }
    this.multiplier = Math.max(0, this.multiplier - dt);
    for (const ball of this.balls) {
      ball.x += ball.vx * dt;
      ball.y += ball.vy * dt;
      this.wall(ball);
      this.paddleBounce(ball);
      this.brickBounce(ball);
    }
    this.balls = this.balls.filter((ball) => ball.y - this.ballRadius <= this.height + 30);
    if (this.balls.length === 0) {
      this.lives -= 1;
      if (this.lives <= 0) {
        this.gameOver = true;
      } else {
        this.speed = 335;
        this.paddle.width = 132;
        this.balls = [this.makeBall(this.paddle.x + this.paddle.width / 2, this.paddle.y - 24, 0.35, -1)];
      }
    }
    if (this.bricks.every((brick) => !brick.alive)) {
      this.advanceLevel();
    }
  }

  private makeBall(x: number, y: number, dx: number, dy: number): Ball {
    const length = Math.hypot(dx, dy) || 1;
    return { x, y, vx: (dx / length) * this.speed, vy: (dy / length) * this.speed };
  }

  private makeBricks(level: number): Brick[] {
    const bricks: Brick[] = [];
    const columns = 10;
    const rows = 6;
    const gap = 8;
    const brickWidth = (this.width - gap * (columns - 1)) / columns;
    const kinds: BrickKind[] = ['extra', 'normal', 'double', 'normal', 'wide', 'narrow', 'normal', 'speed', 'normal', 'slow'];
    for (let row = 0; row < rows; row += 1) {
      for (let column = 0; column < columns; column += 1) {
        if (!this.includeBrick(level, row, column, rows, columns)) {
          continue;
        }
        const pattern = (row * 7 + column * 3) % 17;
        const kind = pattern < kinds.length ? kinds[(pattern + level) % kinds.length] : 'normal';
        const inset = level % 3 === 0 && row % 2 === 1 ? brickWidth * 0.12 : 0;
        bricks.push({ x: column * (brickWidth + gap) + inset, y: 56 + row * 38, width: brickWidth - inset, height: level >= 4 && column % 2 === 0 ? 24 : 30, kind, alive: true });
      }
    }
    return bricks;
  }

  private includeBrick(level: number, row: number, column: number, rows: number, columns: number): boolean {
    if (level === 1) return true;
    if (level === 2) return (row + column) % 2 === 0 || row === 0 || row === rows - 1;
    if (level === 3) return column === row || column === columns - row - 1 || row < 2 || row > rows - 3;
    if (level === 4) return column % 3 !== 1 || row % 2 === 0;
    if (level === 5) return row === 0 || row === rows - 1 || column === 0 || column === columns - 1 || (row + column) % 3 === 0;
    return true;
  }

  private wall(ball: Ball): void {
    if (ball.x - this.ballRadius <= 0) {
      ball.x = this.ballRadius;
      ball.vx = Math.abs(ball.vx);
    }
    if (ball.x + this.ballRadius >= this.width) {
      ball.x = this.width - this.ballRadius;
      ball.vx = -Math.abs(ball.vx);
    }
    if (ball.y - this.ballRadius <= 0) {
      ball.y = this.ballRadius;
      ball.vy = Math.abs(ball.vy);
    }
  }

  private paddleBounce(ball: Ball): void {
    if (ball.vy <= 0 || !this.circleRect(ball, this.paddle)) {
      return;
    }
    const hit = (ball.x - this.paddle.x) / this.paddle.width - 0.5;
    const length = Math.hypot(hit * 1.6, -1);
    ball.y = this.paddle.y - this.ballRadius - 0.5;
    ball.vx = ((hit * 1.6) / length) * this.speed;
    ball.vy = (-1 / length) * this.speed;
  }

  private brickBounce(ball: Ball): void {
    const brick = this.bricks.find((item) => item.alive && this.circleRect(ball, item));
    if (!brick) {
      return;
    }
    brick.alive = false;
    ball.vy *= -1;
    this.apply(brick.kind, ball);
  }

  private apply(kind: BrickKind, source: Ball): void {
    this.score += this.multiplier > 0 ? 20 : 10;
    this.lastEffect = kind;
    if (kind === 'speed' || kind === 'slow') {
      this.speed = Math.max(230, Math.min(560, this.speed + (kind === 'speed' ? 45 : -45)));
      this.balls = this.balls.map((ball) => this.withSpeed(ball));
    }
    if (kind === 'wide') this.paddle.width = Math.min(210, this.paddle.width + 24);
    if (kind === 'narrow') this.paddle.width = Math.max(84, this.paddle.width - 24);
    if (kind === 'double') this.multiplier = 9;
    if (kind === 'extra' && this.balls.length < 5) this.balls.push(this.makeBall(source.x, source.y, -source.vx, -Math.abs(source.vy)));
  }

  private withSpeed(ball: Ball): Ball {
    const length = Math.hypot(ball.vx, ball.vy) || 1;
    return { ...ball, vx: (ball.vx / length) * this.speed, vy: (ball.vy / length) * this.speed };
  }

  private circleRect(ball: Ball, rect: Rect): boolean {
    const x = Math.max(rect.x, Math.min(ball.x, rect.x + rect.width));
    const y = Math.max(rect.y, Math.min(ball.y, rect.y + rect.height));
    return Math.hypot(ball.x - x, ball.y - y) <= this.ballRadius;
  }
}
