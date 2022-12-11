import { Shape } from "./shape";

export class Line extends Shape {
  endx: number = 0;
  endy: number = 0;
  override Draw(ctx: CanvasRenderingContext2D, color: string,linewidth:number, x: number, y: number, startx: number, starty: number) {
    ctx.strokeStyle = color;
    ctx.lineWidth = linewidth;
    ctx.moveTo(startx, starty);
    ctx.lineTo(x, y);
    ctx.stroke();

    this.x = startx;
    this.y = starty;
    this.endx = x;
    this.endy = y;
    this.col = color;
    this.thickness = linewidth;
    if (this.endx == this.x && this.endy == this.y)
      this.valid = false;
    else this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.col;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.endx, this.endy);
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


  override clone():Line {
    let line = new Line();
    line.x = this.x - 20;
    line.y = this.y - 20;
    line.w = this.w;
    line.h =this.h;
    line.col = this.col;
    line.valid = this.valid;
    line.endx = this.endx - 20;
    line.endy = this.endy - 20;
    line.id = this.id;
    line.thickness = this.thickness;

    return line;
  }
}