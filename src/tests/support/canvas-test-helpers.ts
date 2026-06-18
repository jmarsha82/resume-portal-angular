export interface CanvasMock extends CanvasRenderingContext2D {
  gradient: CanvasGradient;
}

export function installCanvasMock(): CanvasMock {
  const gradient = jasmine.createSpyObj<CanvasGradient>('CanvasGradient', ['addColorStop']);
  const context = jasmine.createSpyObj<CanvasRenderingContext2D>(
    'CanvasRenderingContext2D',
    ['arc', 'beginPath', 'clearRect', 'createLinearGradient', 'fill', 'fillRect', 'fillText', 'moveTo', 'roundRect', 'stroke', 'strokeRect', 'lineTo']
  ) as unknown as CanvasMock;
  (context.createLinearGradient as jasmine.Spy).and.returnValue(gradient);
  context.gradient = gradient;
  spyOn(HTMLCanvasElement.prototype, 'getContext').and.returnValue(context);
  spyOn(globalThis, 'requestAnimationFrame').and.returnValue(1);
  spyOn(globalThis, 'cancelAnimationFrame');
  return context;
}

export function pointer(x: number, y: number): PointerEvent {
  return { clientX: x, clientY: y } as PointerEvent;
}
