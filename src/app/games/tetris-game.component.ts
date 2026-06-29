import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

import { TetrisEngine } from './tetris.engine';

@Component({
  selector: 'app-tetris-game',
  standalone: true,
  template: `<canvas #canvas class="game-canvas tetris-canvas" width="470" height="600" (pointerdown)="touchStart($event)" (pointermove)="touchMove($event)" (pointerup)="touchEnd($event)" aria-label="Tetris canvas"></canvas>`
})
export class TetrisGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private readonly canvas!: ElementRef<HTMLCanvasElement>;
  readonly engine = new TetrisEngine();
  private frame = 0;
  private last = 0;
  private dropTimer = 0;
  private touch = { x: 0, y: 0, angle: 0 };

  ngAfterViewInit(): void {
    this.loop(0);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }

  @HostListener('window:keydown', ['$event'])
  keydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') this.engine.move(-1);
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') this.engine.move(1);
    if (event.key === 'ArrowDown' || event.key.toLowerCase() === 's') this.engine.softDrop();
    if (event.key === 'ArrowUp' || event.key.toLowerCase() === 'w') this.engine.rotate();
    if (event.key === ' ') this.engine.hardDrop();
    if (event.key.toLowerCase() === 'r') this.engine.reset();
  }

  touchStart(event: PointerEvent): void {
    if (this.engine.gameOver) {
      this.engine.reset();
      this.dropTimer = 0;
      return;
    }
    this.touch = { x: event.clientX, y: event.clientY, angle: Math.atan2(event.clientY, event.clientX) };
  }

  touchMove(event: PointerEvent): void {
    const dx = event.clientX - this.touch.x;
    const dy = event.clientY - this.touch.y;
    const angle = Math.atan2(event.clientY, event.clientX);
    if (Math.abs(angle - this.touch.angle) > 0.45) {
      this.engine.rotate();
      this.touch.angle = angle;
    }
    if (Math.abs(dx) > 34) {
      this.engine.move(dx > 0 ? 1 : -1);
      this.touch.x = event.clientX;
    }
    if (dy > 42) {
      this.engine.softDrop();
      this.touch.y = event.clientY;
    }
  }

  touchEnd(event: PointerEvent): void {
    if (event.clientY - this.touch.y > 70) this.engine.hardDrop();
  }

  private loop(time: number): void {
    const dt = time - this.last || 16;
    this.last = time;
    this.dropTimer += dt;
    const interval = Math.max(100, 700 - (this.engine.level - 1) * 60);
    if (!this.engine.gameOver && this.dropTimer >= interval) {
      this.engine.softDrop();
      this.dropTimer = 0;
    }
    this.draw();
    this.frame = requestAnimationFrame((next) => this.loop(next));
  }

  private draw(): void {
    const ctx = this.context();
    const size = 30;
    ctx.fillStyle = '#101218';
    ctx.fillRect(0, 0, 470, 600);
    ctx.fillStyle = '#1b1f28';
    ctx.fillRect(300, 0, 170, 600);
    this.engine.board.forEach((row, y) => row.forEach((color, x) => this.cell(ctx, x, y, color ?? 'transparent', size)));
    for (const [x, y] of this.engine.cells()) {
      if (y >= 0) this.cell(ctx, x, y, this.engine.current.color, size);
    }
    ctx.fillStyle = '#f3f7ff';
    ctx.font = '28px Arial';
    ctx.fillText('TETRIS', 322, 48);
    ctx.font = '18px Arial';
    ctx.fillText(`Score: ${this.engine.score}`, 322, 92);
    ctx.fillText(`Level: ${this.engine.level}`, 322, 122);
    ctx.fillText('Next', 350, 204);
    const minNextX = Math.min(...this.engine.next.blocks.map(([x]) => x));
    const minNextY = Math.min(...this.engine.next.blocks.map(([, y]) => y));
    for (const [x, y] of this.engine.next.blocks) {
      this.cell(ctx, x - minNextX + 14.5, y - minNextY + 9, this.engine.next.color, 24);
    }
    if (this.engine.gameOver) {
      ctx.fillStyle = 'rgba(8, 12, 22, .78)';
      ctx.fillRect(0, 0, 300, 600);
      ctx.fillStyle = '#f3f7ff';
      ctx.font = '36px Arial';
      ctx.fillText('GAME OVER', 45, 292);
      ctx.font = '18px Arial';
      ctx.fillText('Tap or press R to restart', 45, 332);
    }
  }

  private cell(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size: number): void {
    ctx.strokeStyle = '#2a2e3a';
    ctx.strokeRect(x * size, y * size, size, size);
    if (color !== 'transparent') {
      ctx.fillStyle = color;
      ctx.fillRect(x * size + 1, y * size + 1, size - 2, size - 2);
      ctx.strokeStyle = 'rgba(255,255,255,.5)';
      ctx.strokeRect(x * size + 6, y * size + 6, size - 12, size - 12);
    }
  }

  private context(): CanvasRenderingContext2D {
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) throw new Error('Canvas unavailable');
    return context;
  }
}
