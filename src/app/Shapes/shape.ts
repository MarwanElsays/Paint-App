export class Shape {
  id: number = 0;
  x: number = 0;
  y: number = 0;
  col: string = '';
  valid: boolean = false;
  w: number = 0;
  h: number = 0;
  fillColour: string = '';

  public Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {}
  public Update(ctx: CanvasRenderingContext2D) {}
  public Move(x: number, y: number) {}
  public Resize(width: number, height: number) {}
  public Fill(fillColour: string, ctx: CanvasRenderingContext2D) {}
  public clone():Shape{return new Shape()}
}
