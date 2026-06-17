export type ShapeName = 'I' | 'O' | 'T' | 'S' | 'Z' | 'J' | 'L';

export interface TetrisPiece {
  name: ShapeName;
  color: string;
  blocks: [number, number][];
  x: number;
  y: number;
}

export const shapes: Record<ShapeName, { color: string; blocks: [number, number][] }> = {
  I: { color: '#00d8ff', blocks: [[0, 1], [1, 1], [2, 1], [3, 1]] },
  O: { color: '#ffd60a', blocks: [[1, 0], [2, 0], [1, 1], [2, 1]] },
  T: { color: '#b15dff', blocks: [[1, 0], [0, 1], [1, 1], [2, 1]] },
  S: { color: '#2dd679', blocks: [[1, 0], [2, 0], [0, 1], [1, 1]] },
  Z: { color: '#ff5050', blocks: [[0, 0], [1, 0], [1, 1], [2, 1]] },
  J: { color: '#3a86ff', blocks: [[0, 0], [0, 1], [1, 1], [2, 1]] },
  L: { color: '#ff922b', blocks: [[2, 0], [0, 1], [1, 1], [2, 1]] }
};

export class TetrisEngine {
  readonly columns = 10;
  readonly rows = 20;
  board: (string | null)[][] = [];
  current: TetrisPiece;
  next: TetrisPiece;
  score = 0;
  level = 1;
  gameOver = false;
  private bag: ShapeName[] = ['I', 'O', 'T', 'S', 'Z', 'J', 'L'];

  constructor(private readonly random = Math.random) {
    this.current = this.newPiece();
    this.next = this.newPiece();
    this.reset();
  }

  reset(): void {
    this.board = Array.from({ length: this.rows }, () => Array<string | null>(this.columns).fill(null));
    this.current = this.newPiece();
    this.next = this.newPiece();
    this.score = 0;
    this.level = 1;
    this.gameOver = false;
  }

  move(dx: number): boolean {
    if (this.valid(dx, 0)) {
      this.current.x += dx;
      return true;
    }
    return false;
  }

  rotate(): boolean {
    const rotated = this.rotatedBlocks();
    for (const kick of [0, -1, 1, -2, 2]) {
      if (this.valid(kick, 0, rotated)) {
        this.current.x += kick;
        this.current.blocks = rotated;
        return true;
      }
    }
    return false;
  }

  softDrop(): boolean {
    if (this.valid(0, 1)) {
      this.current.y += 1;
      this.score += 1;
      return true;
    }
    this.lock();
    return false;
  }

  hardDrop(): void {
    while (this.valid(0, 1)) {
      this.current.y += 1;
      this.score += 2;
    }
    this.lock();
  }

  cells(piece = this.current, dx = 0, dy = 0, blocks = piece.blocks): [number, number][] {
    return blocks.map(([x, y]) => [piece.x + x + dx, piece.y + y + dy]);
  }

  valid(dx = 0, dy = 0, blocks = this.current.blocks): boolean {
    return this.cells(this.current, dx, dy, blocks).every(([x, y]) => x >= 0 && x < this.columns && y < this.rows && (y < 0 || this.board[y][x] === null));
  }

  private lock(): void {
    for (const [x, y] of this.cells()) {
      if (y >= 0 && y < this.rows) this.board[y][x] = this.current.color;
    }
    const cleared = this.clearLines();
    this.score += [0, 100, 300, 500, 800][cleared] * this.level;
    this.level = Math.floor(this.score / 1000) + 1;
    this.current = this.next;
    this.next = this.newPiece();
    this.gameOver = !this.valid();
  }

  private clearLines(): number {
    const remaining = this.board.filter((row) => row.some((cell) => cell === null));
    const cleared = this.rows - remaining.length;
    this.board = [...Array.from({ length: cleared }, () => Array<string | null>(this.columns).fill(null)), ...remaining];
    return cleared;
  }

  private rotatedBlocks(): [number, number][] {
    if (this.current.name === 'O') return this.current.blocks;
    const rotated = this.current.blocks.map(([x, y]) => [3 - y, x] as [number, number]);
    const minX = Math.min(...rotated.map(([x]) => x));
    const minY = Math.min(...rotated.map(([, y]) => y));
    return rotated.map(([x, y]) => [x - minX, y - minY]);
  }

  private newPiece(): TetrisPiece {
    const name = this.bag[Math.floor(this.random() * this.bag.length)];
    const shape = shapes[name];
    return { name, color: shape.color, blocks: [...shape.blocks], x: this.columns / 2 - 2, y: 0 };
  }
}
