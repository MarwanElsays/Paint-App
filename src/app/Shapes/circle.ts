import { Shape } from "./shape";

export class Circle extends Shape {
  override type: string = "circle";
  override Draw(ctx: CanvasRenderingContext2D, color: string,linewidth:number, x: number, y: number, startx: number, starty: number, equalDims: boolean) {
    ctx.strokeStyle = color;
    ctx.lineWidth = linewidth;
    ctx.ellipse(startx, starty, Math.abs(x - startx), Math.abs(y - starty), 0, 0, 360);
    ctx.stroke();

    this.upperLeftCorner.x  = startx - this.width / 2;
    this.upperLeftCorner.y = starty - this.height / 2;
    this.width = Math.abs(x - startx) * 2;
    this.height = Math.abs(y - starty) * 2;
    this.outlineColor = color;
    this.thickness = linewidth;
    if (this.width == 0)
      this.valid = false;
    else this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.outlineColor;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.ellipse(this.upperLeftCorner.x  + this.width / 2, this.upperLeftCorner.y + this.height / 2, this.width / 2, this.height / 2, 0, 0, 360);
    ctx.stroke();
    if (this.fillColor != '') {
      ctx.fillStyle = this.fillColor;
      ctx.fill();
    }
  }

  override Move(x: number, y: number): void {
    this.upperLeftCorner.x  = x;
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

  override clone():Circle {
    let circ = new Circle();
    circ.upperLeftCorner.x = this.upperLeftCorner.x  - 20;
    circ.upperLeftCorner.y = this.upperLeftCorner.y - 20;
    circ.width = this.width;
    circ.height =this.height;
    circ.fillColor = this.fillColor;
    circ.outlineColor = this.outlineColor;
    circ.valid = this.valid;
    circ.id = this.id;
    circ.thickness = this.thickness;
    
    return circ;
  }
}
