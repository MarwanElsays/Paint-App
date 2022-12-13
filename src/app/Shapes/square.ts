import { Shape } from './shape';
export class Square extends Shape {
  override type: string = "square";
  override Draw(ctx: CanvasRenderingContext2D, color: string, linewidth: number, x: number, y: number, startx: number, starty: number, equalDims: boolean) {
    ctx.strokeStyle = color;
    ctx.lineWidth = linewidth;
    this.upperLeftCorner.x = startx;
    this.upperLeftCorner.y = starty;
    this.width = x - startx;
    if (equalDims) {
      this.height = this.width;
    }
    else {
      this.height = y - starty;
    }
    ctx.strokeRect(startx, starty, this.width, this.height);
    this.outlineColor = color;
    this.thickness = linewidth;
    if (this.width == 0 && this.height == 0)
      this.valid = false;
    else this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.outlineColor;
    ctx.lineWidth = this.thickness;
    ctx.beginPath();
    ctx.strokeRect(this.upperLeftCorner.x, this.upperLeftCorner.y, this.width, this.height);
    if (this.fillColor != '') {
      ctx.fillStyle = this.fillColor;
      ctx.fillRect(this.upperLeftCorner.x + this.thickness / 2, this.upperLeftCorner.y + this.thickness / 2, this.width - this.thickness, this.height - this.thickness);
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
    ctx.fillStyle = fillColor;
    ctx.fillRect(this.upperLeftCorner.x + this.thickness / 2, this.upperLeftCorner.y + this.thickness / 2, this.width - this.thickness, this.height - this.thickness);
    this.fillColor = fillColor;
  }

  override clone(): Square {
    let sq = new Square();
    sq.upperLeftCorner.x = this.upperLeftCorner.x - 20;
    sq.upperLeftCorner.y = this.upperLeftCorner.y - 20;
    sq.width = this.width;
    sq.height = this.height;
    sq.fillColor = this.fillColor;
    sq.outlineColor = this.outlineColor;
    sq.valid = this.valid;
    sq.id = this.id;
    sq.thickness = this.thickness;

    return sq;
  }
}

