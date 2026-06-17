import { AfterViewInit, Component, ElementRef, HostListener, OnDestroy, ViewChild } from '@angular/core';

import { Direction, SnakeEngine } from './snake.engine';

@Component({
  selector: 'app-snake-game',
  standalone: true,
  template: `<canvas #canvas class="game-canvas" width="576" height="432" (pointerdown)="startSwipe($event)" (pointerup)="endSwipe($event)" aria-label="Snake canvas"></canvas>`
})
export class SnakeGameComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true }) private readonly canvas!: ElementRef<HTMLCanvasElement>;
  readonly engine = new SnakeEngine();
  private frame = 0;
  private elapsed = 0;
  private last = 0;
  private swipe = { x: 0, y: 0 };

  ngAfterViewInit(): void {
    this.loop(0);
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.frame);
  }

  @HostListener('window:keydown', ['$event'])
  keydown(event: KeyboardEvent): void {
    const keyMap: Record<string, Direction> = { ArrowUp: 'up', w: 'up', ArrowDown: 'down', s: 'down', ArrowLeft: 'left', a: 'left', ArrowRight: 'right', d: 'right' };
    const direction = keyMap[event.key] ?? keyMap[event.key.toLowerCase()];
    if (direction) this.engine.turn(direction);
    if (event.key === ' ') this.engine.paused = !this.engine.paused;
    if (event.key.toLowerCase() === 'r') this.engine.restart();
  }

  startSwipe(event: PointerEvent): void {
    if (this.engine.gameOver) {
      this.engine.restartAfterLoss();
      return;
    }
    this.swipe = { x: event.clientX, y: event.clientY };
  }

  endSwipe(event: PointerEvent): void {
    const dx = event.clientX - this.swipe.x;
    const dy = event.clientY - this.swipe.y;
    if (Math.abs(dx) > Math.abs(dy)) this.engine.turn(dx > 0 ? 'right' : 'left');
    else this.engine.turn(dy > 0 ? 'down' : 'up');
  }

  private loop(time: number): void {
    const dt = time - this.last || 16;
    this.last = time;
    this.elapsed += dt;
    if (this.elapsed >= this.engine.tickMs) {
      this.elapsed = 0;
      this.engine.step();
    }
    this.draw();
    this.frame = requestAnimationFrame((next) => this.loop(next));
  }

  private draw(): void {
    const ctx = this.context();
    const size = 24;
    ctx.fillStyle = '#09101a';
    ctx.fillRect(0, 0, 576, 432);
    ctx.strokeStyle = 'rgba(255,255,255,.08)';
    for (let x = 0; x <= 576; x += size) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 432);
      ctx.stroke();
    }
    for (let y = 0; y <= 432; y += size) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(576, y);
      ctx.stroke();
    }
    ctx.fillStyle = '#ffcb56';
    ctx.fillRect(this.engine.food.x * size + 5, this.engine.food.y * size + 5, 14, 14);
    ctx.fillStyle = '#ff68a6';
    this.engine.obstacles.forEach((cell) => {
      ctx.fillRect(cell.x * size + 2, cell.y * size + 2, 20, 20);
      ctx.strokeStyle = 'rgba(255,255,255,.36)';
      ctx.strokeRect(cell.x * size + 6, cell.y * size + 6, 12, 12);
    });
    this.engine.snake.forEach((cell, index) => {
      ctx.fillStyle = index === 0 ? '#56eab1' : '#38b990';
      ctx.fillRect(cell.x * size + 3, cell.y * size + 3, 18, 18);
    });
    ctx.fillStyle = '#f3f7ff';
    ctx.font = '18px Arial';
    ctx.fillText(`Score ${this.engine.score}`, 16, 28);
    ctx.fillText(`Level ${this.engine.level}`, 126, 28);
    if (this.engine.gameOver || this.engine.paused) {
      ctx.fillStyle = 'rgba(8, 12, 22, .78)';
      ctx.fillRect(0, 0, 576, 432);
      ctx.fillStyle = this.engine.gameOver ? '#ff7066' : '#ffcb56';
      ctx.font = '40px Arial';
      ctx.fillText(this.engine.gameOver ? 'Game Over' : 'Paused', 188, 205);
      ctx.font = '18px Arial';
      ctx.fillStyle = '#f3f7ff';
      ctx.fillText(this.engine.gameOver ? 'Tap or press R to restart' : 'Press space to resume', 178, 245);
    }
  }

  private context(): CanvasRenderingContext2D {
    const context = this.canvas.nativeElement.getContext('2d');
    if (!context) throw new Error('Canvas unavailable');
    return context;
  }
}
