import { Shape } from "./shape";

export class Circle extends Shape {
  override Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {
    ctx.strokeStyle = color;
    ctx.ellipse(startx, starty, Math.abs(x - startx), Math.abs(y - starty), 0, 0, 360);
    ctx.stroke();

    this.x = startx - this.w / 2;
    this.y = starty - this.h / 2;
    this.w = Math.abs(x - startx) * 2;
    this.h = Math.abs(y - starty) * 2;
    this.col = color;
    if (this.w == 0)
      this.valid = false;
    else this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.col;
    ctx.beginPath();
    ctx.ellipse(this.x + this.w / 2, this.y + this.h / 2, this.w / 2, this.h / 2, 0, 0, 360);
    ctx.stroke();
    if (this.fillColour != '') {
      ctx.fillStyle = this.fillColour;
      ctx.fill();
    }
  }

  override Move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  override Resize(width: number, height: number): void {
    this.w = width;
    this.h = height;
  }

  override Fill(fillColour: string, ctx: CanvasRenderingContext2D) {
    this.Update(ctx);
    ctx.fillStyle = fillColour;
    ctx.fill();
    this.fillColour = fillColour;
  }

  override clone():Circle {
    let circ = new Circle();
    circ.x = this.x - 20;
    circ.y = this.y - 20;
    circ.w = this.w;
    circ.h =this.h;
    circ.fillColour = this.fillColour;
    circ.col = this.col;
    circ.valid = this.valid;
    circ.id = this.id;
    
    return circ;
  }
}
