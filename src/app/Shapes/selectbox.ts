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

    this.upperLeftCorner.x = startx;
    this.upperLeftCorner.y = starty;
    this.width = x - startx;
    this.height = y - starty;
    this.outlineColor = color;
    this.thickness = 1;
    if (this.width == 0 && this.height == 0)
      this.valid = false;
    else this.valid = true;

    ctx.setLineDash([0]);
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.setLineDash([6]);
    ctx.strokeStyle = this.outlineColor;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.strokeRect(this.upperLeftCorner.x, this.upperLeftCorner.y, this.width, this.height);
    ctx.setLineDash([0]);
  }

  override Move(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.upperLeftCorner.x += diffX;
      shape.upperLeftCorner.y += diffY;

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
      shape.width = width;
      shape.height = height;
    });
  }

  selectShapes(shapes: Shape[], s: DrawService) {
     this.selectedShapes = shapes.filter((shape) => {
      return (
        Math.min(shape.upperLeftCorner.x, shape.upperLeftCorner.x + shape.width) > Math.min(this.upperLeftCorner.x, this.upperLeftCorner.x + this.width) &&
        Math.max(shape.upperLeftCorner.x, shape.upperLeftCorner.x + shape.width) < Math.max(this.upperLeftCorner.x, this.upperLeftCorner.x + this.width) &&
        Math.min(shape.upperLeftCorner.y, shape.upperLeftCorner.y + shape.height) > Math.min(this.upperLeftCorner.y, this.upperLeftCorner.y + this.height) &&
        Math.max(shape.upperLeftCorner.y, shape.upperLeftCorner.y + shape.height) < Math.max(this.upperLeftCorner.y, this.upperLeftCorner.y + this.height)
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

