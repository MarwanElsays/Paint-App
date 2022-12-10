import { Shape } from './shape';

export class Triangle extends Shape{
  override Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {
    ctx.strokeStyle = color;
    ctx.moveTo(startx, starty);
    ctx.lineTo(x, y);
    ctx.lineTo(startx - (x - startx), y);
    ctx.closePath();
    ctx.stroke();

    this.w = (x - startx) * 2;
    this.h = y - starty;
    this.x = startx - this.w / 2;
    this.y = starty;
    this.col = color;
    this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.col;
    ctx.beginPath();
    ctx.moveTo(this.x + this.w / 2, this.y);
    ctx.lineTo(this.x + this.w, this.y + this.h);
    ctx.lineTo(this.x, this.y + this.h);
    ctx.closePath();
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

  override clone():Triangle {
    let triangle = new Triangle();
    triangle.x = this.x - 20;
    triangle.y = this.y - 20;
    triangle.w = this.w;
    triangle.h =this.h;
    triangle.fillColour = this.fillColour;
    triangle.col = this.col;
    triangle.valid = this.valid;
    
    return triangle;
  }
}