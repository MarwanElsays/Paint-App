import { DrawService } from '../services/draw.service';
import { Shape } from './shape';
import { Line } from './line';
export class SelectBox extends Shape {

  private selectedShapes: Shape[] = [];
  private oldMouseX: number = 0;
  private oldMouseY: number = 0;

  override Draw(ctx: CanvasRenderingContext2D, color: string,linewidth:number,x: number, y: number, startx: number, starty: number) {
    ctx.setLineDash([6]);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.strokeRect(startx, starty, x - startx, y - starty);

    this.x = startx;
    this.y = starty;
    this.w = x - startx;
    this.h = y - starty;
    this.col = color;
    this.thickness = 1;
    if (this.w == 0 && this.h == 0)
      this.valid = false;
    else this.valid = true;

    ctx.setLineDash([0]);
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.setLineDash([6]);
    ctx.strokeStyle = this.col;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.setLineDash([0]);
  }

  override Move(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.x += diffX;
      shape.y += diffY;

      if (shape instanceof Line) {
        shape.endx += diffX;
        shape.endy += diffY;
      }

    });
    this.setOldX(x);
    this.setOldY(y);
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
        Math.min(shape.x, shape.x + shape.w) > Math.min(this.x, this.x + this.w) &&
        Math.max(shape.x, shape.x + shape.w) < Math.max(this.x, this.x + this.w) &&
        Math.min(shape.y, shape.y + shape.h) > Math.min(this.y, this.y + this.h) &&
        Math.max(shape.y, shape.y + shape.h) < Math.max(this.y, this.y + this.h)
      );
    });
    s.state = 'Selected';
    return this.selectedShapes;
  }

  setOldX(x: number) {
    this.oldMouseX = x;
  }

  setOldY(y: number) {
    this.oldMouseY = y;
  }

  setSelectedShapes(shapeArray : Shape[]) {
    this.selectedShapes = shapeArray;
  }
}

