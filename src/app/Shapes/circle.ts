import { Shape } from "./shape";

export class Circle extends Shape {
  override Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {
    ctx.strokeStyle = color;
    ctx.ellipse(startx, starty, Math.abs(x - startx), Math.abs(y - starty), 0, 0, 360);
    ctx.stroke();

    this.x = startx;
    this.y = starty;
    this.w = Math.abs(x - startx);
    this.h = Math.abs(y - starty);
    this.col = color;
    if (this.w == 0)
      this.valid = false;
    else this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.col;
    ctx.beginPath();
    ctx.ellipse(this.x, this.y, this.w, this.h, 0, 0, 360);
    ctx.stroke();
  }

  override Move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  override Resize(width: number, height: number): void {
    this.w = width;
    this.h = height;
  }
}
