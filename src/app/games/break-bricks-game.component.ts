import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

import { BreakBricksEngine, BrickKind } from './break-bricks.engine';

const brickColors: Record<BrickKind, string> = {
  normal: '#5e7096',
  speed: '#ff7066',
  slow: '#50ceff',
  wide: '#56eab1',
  narrow: '#ff68a6',
  double: '#ffcb56',
  extra: '#ab82ff'
};

@Component({
  selector: 'app-break-bricks-game',
  standalone: true,
  template: `<canvas #canvas class="game-canvas" width="780" height="560" (pointermove)="drag($event)" (pointerdown)="drag($event)" aria-label="BreakBricksGame canvas"></canvas>`
})
export class BreakBricksGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private readonly canvas!: ElementRef<HTMLCanvasElement>;
  readonly engine = new BreakBricksEngine();
  private frame = 0;
  private last = 0;
  private direction = 0;

  ngAfterViewInit(): void {
    this.loop(0);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }

  @HostListener('window:keydown', ['$event'])
  keydown(event: KeyboardEvent): void {
    if (event.key === 'ArrowLeft' || event.key.toLowerCase() === 'a') this.direction = -1;
    if (event.key === 'ArrowRight' || event.key.toLowerCase() === 'd') this.direction = 1;
    if ((event.key === ' ' || event.key.toLowerCase() === 'r') && this.engine.gameOver) this.engine.reset();
  }

  @HostListener('window:keyup')
  keyup(): void {
    this.direction = 0;
  }

  drag(event: PointerEvent): void {
    if (this.engine.gameOver) {
      this.engine.reset();
      return;
    }
    const rect = this.canvas.nativeElement.getBoundingClientRect();
    this.engine.setPaddleCenter(((event.clientX - rect.left) / rect.width) * this.engine.width);
  }

  private loop(time: number): void {
    const dt = Math.min(0.032, (time - this.last) / 1000 || 0.016);
    this.last = time;
    this.engine.movePaddle(this.direction, dt);
    this.engine.tick(dt);
    this.draw();
    this.frame = requestAnimationFrame((next) => this.loop(next));
  }

  private draw(): void {
    const ctx = this.context();
    ctx.clearRect(0, 0, 780, 560);
    this.background(ctx);
    for (const brick of this.engine.bricks.filter((item) => item.alive)) {
      ctx.fillStyle = brickColors[brick.kind];
      this.roundRect(ctx, brick.x, brick.y, brick.width, brick.height, 8);
      ctx.fill();
    }
    ctx.fillStyle = '#56eab1';
    this.roundRect(ctx, this.engine.paddle.x, this.engine.paddle.y, this.engine.paddle.width, this.engine.paddle.height, 12);
    ctx.fill();
    for (const ball of this.engine.balls) {
      ctx.fillStyle = '#f0fff9';
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, this.engine.ballRadius, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = '#f3f7ff';
    ctx.font = '18px Arial';
    ctx.fillText(`Score ${this.engine.score}`, 18, 532);
    ctx.fillText(`Lives ${this.engine.lives}`, 150, 532);
    ctx.fillText(`Level ${this.engine.level}`, 260, 532);
    ctx.fillText(`Effect ${this.engine.lastEffect}`, 360, 532);
    if (this.engine.gameOver || this.engine.won) {
      ctx.fillStyle = 'rgba(8, 12, 22, .78)';
      ctx.fillRect(0, 0, 780, 560);
      ctx.fillStyle = this.engine.won ? '#56eab1' : '#ff7066';
      ctx.font = '42px Arial';
      ctx.fillText(this.engine.won ? 'Board Cleared' : 'Game Over', 250, 260);
      ctx.font = '20px Arial';
      ctx.fillText('Press space or tap to restart', 268, 306);
    }
  }

  private background(ctx: CanvasRenderingContext2D): void {
    const gradient = ctx.createLinearGradient(0, 0, 780, 560);
    gradient.addColorStop(0, '#090d19');
    gradient.addColorStop(1, '#12313a');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 780, 560);
    ctx.strokeStyle = 'rgba(80, 206, 255, .12)';
    for (let x = 0; x < 780; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 560);
      ctx.stroke();
    }
  }

  private roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number): void {
    ctx.beginPath();
    ctx.roundRect(x, y, width, height, radius);
  }

  private context(): CanvasRenderingContext2D {
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) throw new Error('Canvas unavailable');
    return context;
  }
}
