import { DrawService } from '../services/draw.service';
import { Shape } from './shape';
export class SelectBox extends Shape {

  private selectedShapes: Shape[] = [];
  private active: boolean = false;

  override Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {
    ctx.setLineDash([6]);
    ctx.strokeStyle = color;
    ctx.strokeRect(startx, starty, x - startx, y - starty);

    this.x = startx;
    this.y = starty;
    this.w = x - startx;
    this.h = y - starty;
    this.col = color;
    if (this.w == 0 && this.h == 0)
      this.valid = false;
    else this.valid = true;
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.setLineDash([6]);
    ctx.strokeStyle = this.col;
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  override Move(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      shape.x = x;
      shape.y = y;
    });
  }


  override Resize(width: number, height: number) {
    this.selectedShapes.forEach(shape => {
      shape.w = width;
      shape.h = height;
    });
  }

  selectShapes(shapes: Shape[], s: DrawService) {
    this.selectedShapes = shapes.filter((shape) => {
      return (
        shape.x > this.x &&
        shape.x + shape.w < this.x + this.w &&
        shape.y > this.y &&
        shape.y + shape.h < this.y + this.h
      );
    });
    s.select = 'selected';
  }
}

