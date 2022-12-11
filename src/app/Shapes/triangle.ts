import { Shape } from './shape';

export class Triangle extends Shape {
  override type: string = "triangle";
  override Draw(ctx: CanvasRenderingContext2D, color: string, linewidth: number, x: number, y: number, startx: number, starty: number) {
    ctx.strokeStyle = color;
    ctx.lineWidth = linewidth;
    ctx.moveTo(startx, starty);
    ctx.lineTo(x, y);
    ctx.lineTo(startx - (x - startx), y);
    ctx.closePath();
    ctx.stroke();

    this.width = (x - startx) * 2;
    this.height = y - starty;
    this.upperLeftCorner.x = startx - this.width / 2;
    this.upperLeftCorner.y = starty;
    this.outlineColor = color;
    this.thickness = linewidth;
    this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.outlineColor;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.moveTo(this.upperLeftCorner.x + this.width / 2, this.upperLeftCorner.y);
    ctx.lineTo(this.upperLeftCorner.x + this.width, this.upperLeftCorner.y + this.height);
    ctx.lineTo(this.upperLeftCorner.x, this.upperLeftCorner.y + this.height);
    ctx.closePath();
    ctx.stroke();
    if (this.fillColor != '') {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }
  }

  override Move(x: number, y: number): void {
    this.upperLeftCorner.x = x;
    this.upperLeftCorner.y = y;
  }

  override Resize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }

  override Fill(fillColor: string, ctx: CanvasRenderingContext2D) {
    this.Update(ctx);
    ctx.fillStyle = fillColor;
    ctx.fill();
    this.fillColor = fillColor;
  }

  override clone(): Triangle {
    let triangle = new Triangle();
    triangle.upperLeftCorner.x = this.upperLeftCorner.x - 20;
    triangle.upperLeftCorner.y = this.upperLeftCorner.y - 20;
    triangle.width = this.width;
    triangle.height = this.height;
    triangle.fillColor = this.fillColor;
    triangle.outlineColor = this.outlineColor;
    triangle.valid = this.valid;
    triangle.id = this.id;
    triangle.thickness = this.thickness;

    return triangle;
  }
}