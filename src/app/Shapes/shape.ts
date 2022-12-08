export class Shape {
  id: number = 0;
  x: number = 0;
  y: number = 0;
  col: string = '';
  valid: boolean = false;
  w: number = 0;
  h: number = 0;

  public Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {}
  public Update(ctx: CanvasRenderingContext2D) {}
  public Move(x: number, y: number) {}
  public Resize(width: number, height: number) {}
}
