import { Shape } from "./shape";

export class Line extends Shape {
  override type: string = "line";
  endingPoint = {x: 0, y: 0};
  override Draw(ctx: CanvasRenderingContext2D, color: string,linewidth:number, x: number, y: number, startx: number, starty: number) {
    ctx.strokeStyle = color;
    ctx.lineWidth = linewidth;
    ctx.moveTo(startx, starty);
    ctx.lineTo(x, y);
    ctx.stroke();

    this.upperLeftCorner.x = startx;
    this.upperLeftCorner.y = starty;
    this.endingPoint.x = x;
    this.endingPoint.y = y;
    this.width = this.endingPoint.x - this.upperLeftCorner.x;
    this.height = this.endingPoint.y - this.upperLeftCorner.y;
    this.outlineColor = color;
    this.thickness = linewidth;
    if (this.endingPoint.x == this.upperLeftCorner.x && this.endingPoint.y == this.upperLeftCorner.y)
      this.valid = false;
    else this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.outlineColor;
    ctx.lineWidth = this.thickness;
    this.endingPoint.x = this.upperLeftCorner.x + this.width;
    this.endingPoint.y = this.upperLeftCorner.y + this.height;
    ctx.beginPath();
    ctx.moveTo(this.upperLeftCorner.x, this.upperLeftCorner.y);
    ctx.lineTo(this.endingPoint.x, this.endingPoint.y);
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
    line.endingPoint.x = this.endingPoint.x - 20;
    line.endingPoint.y = this.endingPoint.y - 20;
    line.id = this.id;
    line.thickness = this.thickness;

    return line;
  }
}