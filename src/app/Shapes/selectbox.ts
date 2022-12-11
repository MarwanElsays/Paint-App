import { DrawService } from '../services/draw.service';
import { Shape } from './shape';
import { Line } from './line';
export class SelectBox extends Shape {

  private selectedShapes: Shape[] = [];
  private oldMouseX: number = 0;
  private oldMouseY: number = 0;
  private minWidth = 10;
  private minHeight = 10;

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
    ctx.setLineDash([0]);
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.setLineDash([6]);
    ctx.strokeStyle = this.col;
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    this.drawCorners(ctx);
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
  
  topLeftResize(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;
      
      shape.w -= diffX;
      shape.h -= diffY;
      
    });
    this.setOldX(x);
    this.setOldY(y);
  }

  topRightResize(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.w += diffX;
      shape.h -= diffY;

    });
    this.setOldX(x);
    this.setOldY(y);
  }

  
  bottomLeftResize(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.w -= diffX;
      shape.h += diffY;

    });
    this.setOldX(x);
    this.setOldY(y);
  }

  bottomRightResize(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.w += diffX;
      shape.h += diffY;

    });
    this.setOldX(x);
    this.setOldY(y);
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

  drawCorners(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.col;
    ctx.beginPath();
    ctx.fillRect(this.x + this.w - 3, this.y - 3, 6, 6);
    ctx.beginPath();
    ctx.fillRect(this.x - 3, this.y + this.h - 3, 6, 6);
    ctx.beginPath();
    ctx.fillRect(this.x + this.w - 3, this.y + this.h - 3, 6, 6);
    ctx.beginPath();
    ctx.fillRect(this.x - 3, this.y - 3, 6, 6);
  }

  override isMouseInside(mouseX: number, mouseY: number) {
    if (this.w > 0 && this.h > 0) {
      return mouseX > this.x + 3 && mouseX < this.x + this.w - 3 &&
      mouseY > this.y + 3 && mouseY < this.y + this.h - 3;
    } 
    else if (this.w > 0 && this.h < 0) {
      return mouseX > this.x + 3 && mouseX < this.x + this.w - 3 &&
      mouseY < this.y - 3 && mouseY > this.y + this.h + 3;
    } 
    else if (this.w < 0 && this.h > 0) {
      return mouseX < this.x - 3 && mouseX > this.x + this.w + 3 &&
      mouseY > this.y + 3 && mouseY < this.y + this.h - 3;
    } 
    else if (this.w < 0 && this.h < 0) {      
      return mouseX < this.x - 3 && mouseX > this.x + this.w + 3 &&
      mouseY < this.y - 3 && mouseY > this.y + this.h + 3;
    }
    return false;
  }

  isMouseOnVertex(mouseX: number, mouseY: number, x: number, y: number) {
    return mouseX >= x - 3 && mouseX <= x + 3 && mouseY >= y - 3 && mouseY <= y + 3;
  }

  isResizing(mouseX: number, mouseY: number) {
    return this.isMouseOnVertex(mouseX, mouseY, this.x, this.y) ||
    this.isMouseOnVertex(mouseX, mouseY, this.x + this.w, this.y) ||
    this.isMouseOnVertex(mouseX, mouseY, this.x, this.y + this.h) ||
    this.isMouseOnVertex(mouseX, mouseY, this.x + this.w, this.y + this.h);
  }
}
