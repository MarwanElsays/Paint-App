export class Shape {
  id: number = 0;
  x: number = 0;
  y: number = 0;
  col: string = '';
  valid: boolean = false;
  w: number = 0;
  h: number = 0;
  fillColour: string = '';

  public Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) { }
  public Update(ctx: CanvasRenderingContext2D) { }
  public Move(x: number, y: number) { }
  public Resize(width: number, height: number) { }
  public Fill(fillColour: string, ctx: CanvasRenderingContext2D) { }
  public clone(): Shape { return new Shape() }
  public isMouseInside(mouseX: number, mouseY: number): boolean {
    return (mouseX >= Math.min(this.x, this.x + this.w) &&
    mouseX <= Math.max(this.x, this.x + this.w) &&
    mouseY >= Math.min(this.y, this.y + this.h) &&
    mouseY <= Math.max(this.y, this.y + this.h));
  }
}
