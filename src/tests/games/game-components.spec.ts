import { Type } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakBricksGameComponent } from '../../app/games/break-bricks-game.component';
import { SnakeGameComponent } from '../../app/games/snake-game.component';
import { TetrisGameComponent } from '../../app/games/tetris-game.component';
import { CanvasMock, installCanvasMock, pointer } from '../support/canvas-test-helpers';

describe('Game canvas components', () => {
  let context: CanvasMock;

  beforeEach(() => {
    context = installCanvasMock();
  });

  afterEach(() => TestBed.resetTestingModule());

  describe('BreakBricksGameComponent', () => {
    it('renders the board and reacts to keyboard restart controls', async () => {
      const fixture = await create(BreakBricksGameComponent);
      const component = fixture.componentInstance;
      expect(context.clearRect).toHaveBeenCalledWith(0, 0, 780, 560);
      expect(context.createLinearGradient).toHaveBeenCalled();

      const reset = spyOn(component.engine, 'reset');
      component.engine.gameOver = true;
      component.keydown(new KeyboardEvent('keydown', { key: ' ' }));
      expect(reset).toHaveBeenCalled();

      component.keydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      component.keyup();
      component.ngOnDestroy();
      expect(cancelAnimationFrame).toHaveBeenCalled();
    });

    it('maps pointer movement to paddle position and taps restart after loss', async () => {
      const fixture = await create(BreakBricksGameComponent);
      const component = fixture.componentInstance;
      const canvas = fixture.nativeElement.querySelector('canvas') as HTMLCanvasElement;
      spyOn(canvas, 'getBoundingClientRect').and.returnValue({ left: 10, width: 780 } as DOMRect);
      const setCenter = spyOn(component.engine, 'setPaddleCenter');

      component.drag(pointer(400, 20));
      expect(setCenter).toHaveBeenCalledWith(390);

      const reset = spyOn(component.engine, 'reset');
      component.engine.gameOver = true;
      component.drag(pointer(20, 20));
      expect(reset).toHaveBeenCalled();
    });
  });

  describe('SnakeGameComponent', () => {
    it('renders and maps keyboard commands', async () => {
      const fixture = await create(SnakeGameComponent);
      const component = fixture.componentInstance;
      expect(context.fillRect).toHaveBeenCalled();
      const turn = spyOn(component.engine, 'turn');
      const restart = spyOn(component.engine, 'restart');

      component.keydown(new KeyboardEvent('keydown', { key: 'w' }));
      expect(turn).toHaveBeenCalledWith('up');
      component.keydown(new KeyboardEvent('keydown', { key: ' ' }));
      expect(component.engine.paused).toBeTrue();
      component.keydown(new KeyboardEvent('keydown', { key: 'r' }));
      expect(restart).toHaveBeenCalled();
    });

    it('maps horizontal and vertical swipes and restarts on a game-over tap', async () => {
      const component = (await create(SnakeGameComponent)).componentInstance;
      const turn = spyOn(component.engine, 'turn');

      component.startSwipe(pointer(10, 10));
      component.endSwipe(pointer(80, 20));
      expect(turn).toHaveBeenCalledWith('right');

      component.startSwipe(pointer(10, 10));
      component.endSwipe(pointer(15, 90));
      expect(turn).toHaveBeenCalledWith('down');

      const restart = spyOn(component.engine, 'restartAfterLoss');
      component.engine.gameOver = true;
      component.startSwipe(pointer(1, 1));
      expect(restart).toHaveBeenCalled();
    });
  });

  describe('TetrisGameComponent', () => {
    it('renders the next piece entirely in the side panel', async () => {
      await create(TetrisGameComponent);
      const previewCalls = (context.strokeRect as jasmine.Spy).calls.allArgs();
      const nextPieceCells = previewCalls.filter(([x, y, width]) => x >= 348 && y >= 216 && width === 24);
      expect(nextPieceCells.length).toBeGreaterThanOrEqual(4);
      expect(nextPieceCells.every(([x]) => x >= 300)).toBeTrue();
    });

    it('maps keyboard controls to engine commands', async () => {
      const component = (await create(TetrisGameComponent)).componentInstance;
      const move = spyOn(component.engine, 'move');
      const softDrop = spyOn(component.engine, 'softDrop');
      const rotate = spyOn(component.engine, 'rotate');
      const hardDrop = spyOn(component.engine, 'hardDrop');
      const reset = spyOn(component.engine, 'reset');

      component.keydown(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
      component.keydown(new KeyboardEvent('keydown', { key: 'd' }));
      component.keydown(new KeyboardEvent('keydown', { key: 's' }));
      component.keydown(new KeyboardEvent('keydown', { key: 'w' }));
      component.keydown(new KeyboardEvent('keydown', { key: ' ' }));
      component.keydown(new KeyboardEvent('keydown', { key: 'r' }));

      expect(move.calls.allArgs()).toEqual([[-1], [1]]);
      expect(softDrop).toHaveBeenCalled();
      expect(rotate).toHaveBeenCalled();
      expect(hardDrop).toHaveBeenCalled();
      expect(reset).toHaveBeenCalled();
    });

    it('maps drag, drop, rotation gestures, and game-over restart', async () => {
      const component = (await create(TetrisGameComponent)).componentInstance;
      const move = spyOn(component.engine, 'move');
      const softDrop = spyOn(component.engine, 'softDrop');
      const rotate = spyOn(component.engine, 'rotate');
      const hardDrop = spyOn(component.engine, 'hardDrop');

      component.touchStart(pointer(100, 10));
      component.touchMove(pointer(170, 170));
      component.touchEnd(pointer(170, 250));

      expect(move).toHaveBeenCalledWith(1);
      expect(softDrop).toHaveBeenCalled();
      expect(rotate).toHaveBeenCalled();
      expect(hardDrop).toHaveBeenCalled();

      const reset = spyOn(component.engine, 'reset');
      component.engine.gameOver = true;
      component.touchStart(pointer(0, 0));
      expect(reset).toHaveBeenCalled();
    });
  });
});

async function create<T>(component: Type<T>): Promise<ComponentFixture<T>> {
  await TestBed.configureTestingModule({ imports: [component] }).compileComponents();
  const fixture = TestBed.createComponent(component);
  fixture.detectChanges();
  return fixture;
}
