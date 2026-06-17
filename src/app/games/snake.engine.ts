export type Direction = 'up' | 'down' | 'left' | 'right';

export interface Cell {
  x: number;
  y: number;
}

const delta: Record<Direction, Cell> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 }
};

export class SnakeEngine {
  readonly columns = 24;
  readonly rows = 18;
  snake: Cell[] = [];
  food: Cell = { x: 8, y: 8 };
  obstacles: Cell[] = [];
  direction: Direction = 'right';
  nextDirection: Direction = 'right';
  score = 0;
  level = 1;
  paused = false;
  gameOver = false;

  constructor(private readonly random = Math.random) {
    this.restart();
  }

  restart(): void {
    this.snake = [{ x: 12, y: 9 }, { x: 11, y: 9 }, { x: 10, y: 9 }];
    this.direction = 'right';
    this.nextDirection = 'right';
    this.score = 0;
    this.level = 1;
    this.obstacles = this.obstaclesForLevel(this.level);
    this.paused = false;
    this.gameOver = false;
    this.placeFood();
  }

  get tickMs(): number {
    return Math.max(64, 120 - (this.level - 1) * 12);
  }

  turn(direction: Direction): void {
    if (!this.areOpposite(this.direction, direction)) {
      this.nextDirection = direction;
    }
  }

  step(): void {
    if (this.paused || this.gameOver) return;
    this.direction = this.nextDirection;
    const move = delta[this.direction];
    const head = this.snake[0];
    const next = { x: head.x + move.x, y: head.y + move.y };
    const eats = this.same(next, this.food);
    if (this.outOfBounds(next) || this.hitsSelf(next, eats) || this.obstacles.some((cell) => this.same(cell, next))) {
      this.gameOver = true;
      return;
    }
    this.snake.unshift(next);
    if (eats) {
      this.score += 10;
      this.updateLevel();
      this.placeFood();
    } else {
      this.snake.pop();
    }
  }

  restartAfterLoss(): void {
    this.restart();
  }

  private placeFood(): void {
    do {
      this.food = {
        x: Math.floor(this.random() * this.columns),
        y: Math.floor(this.random() * this.rows)
      };
    } while (this.occupied(this.food));
  }

  private hitsSelf(cell: Cell, keepsTail: boolean): boolean {
    const body = keepsTail ? this.snake : this.snake.slice(0, -1);
    return body.some((part) => this.same(part, cell));
  }

  private outOfBounds(cell: Cell): boolean {
    return cell.x < 0 || cell.x >= this.columns || cell.y < 0 || cell.y >= this.rows;
  }

  private updateLevel(): void {
    const nextLevel = Math.min(5, Math.floor(this.score / 50) + 1);
    if (nextLevel !== this.level) {
      this.level = nextLevel;
      this.obstacles = this.obstaclesForLevel(this.level);
    }
  }

  private occupied(cell: Cell): boolean {
    return this.snake.some((part) => this.same(part, cell)) || this.obstacles.some((part) => this.same(part, cell));
  }

  private obstaclesForLevel(level: number): Cell[] {
    if (level <= 1) return [];
    const obstacleSets: Cell[][] = [
      [{ x: 8, y: 5 }, { x: 9, y: 5 }, { x: 10, y: 5 }, { x: 14, y: 12 }, { x: 15, y: 12 }, { x: 16, y: 12 }],
      Array.from({ length: 8 }, (_, index) => ({ x: 8 + index, y: index % 2 === 0 ? 4 : 13 })),
      [
        ...Array.from({ length: 8 }, (_, index) => ({ x: 5, y: 5 + index })),
        ...Array.from({ length: 8 }, (_, index) => ({ x: 18, y: 5 + index }))
      ],
      [
        ...Array.from({ length: 7 }, (_, index) => ({ x: 8 + index, y: 6 })),
        ...Array.from({ length: 7 }, (_, index) => ({ x: 10 + index, y: 11 })),
        { x: 6, y: 14 },
        { x: 17, y: 3 }
      ]
    ];
    return obstacleSets[Math.min(level - 2, obstacleSets.length - 1)];
  }

  private areOpposite(first: Direction, second: Direction): boolean {
    return (first === 'up' && second === 'down') || (first === 'down' && second === 'up') || (first === 'left' && second === 'right') || (first === 'right' && second === 'left');
  }

  private same(first: Cell, second: Cell): boolean {
    return first.x === second.x && first.y === second.y;
  }
}
