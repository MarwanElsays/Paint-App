import { Shape } from "./shape";

export class Line extends Shape {
  override type: string = "line";
  endx: number = 0;
  endy: number = 0;
  override Draw(ctx: CanvasRenderingContext2D, color: string,linewidth:number, x: number, y: number, startx: number, starty: number) {
    ctx.strokeStyle = color;
    ctx.lineWidth = linewidth;
    ctx.moveTo(startx, starty);
    ctx.lineTo(x, y);
    ctx.stroke();

    this.upperLeftCorner.x = startx;
    this.upperLeftCorner.y = starty;
    this.endx = x;
    this.endy = y;
    this.outlineColor = color;
    this.thickness = linewidth;
    if (this.endx == this.upperLeftCorner.x && this.endy == this.upperLeftCorner.y)
      this.valid = false;
    else this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.outlineColor;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.upperLeftCorner.x, this.upperLeftCorner.y);
    ctx.lineTo(this.endx, this.endy);
    ctx.stroke();
  }

  override Move(x: number, y: number): void {
    this.upperLeftCorner.x = x;
    this.upperLeftCorner.y = y;
  }

  override Resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }


  override clone():Line {
    let line = new Line();
    line.upperLeftCorner.x = this.upperLeftCorner.x - 20;
    line.upperLeftCorner.y = this.upperLeftCorner.y - 20;
    line.width = this.width;
    line.height =this.height;
    line.outlineColor = this.outlineColor;
    line.valid = this.valid;
    line.endx = this.endx - 20;
    line.endy = this.endy - 20;
    line.id = this.id;
    line.thickness = this.thickness;

    return line;
  }
}