import { DrawService } from '../services/draw.service';
import { Shape } from './shape';
import { Line } from './line';
export class SelectBox extends Shape {
  override id = 0;
  private selectedShapes: Shape[] = [];
  private oldMouseX: number = 0;
  private oldMouseY: number = 0;
  private minWidth = 10;
  private minHeight = 10;

  override Draw(ctx: CanvasRenderingContext2D, color: string, linewidth: number, x: number, y: number, startx: number, starty: number) {
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
    this.drawCorners(ctx);
    ctx.setLineDash([0]);
  }

  override Move(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.upperLeftCorner.x += diffX;
      shape.upperLeftCorner.y += diffY;

      if (shape instanceof Line) {
        shape.endingPoint.x += diffX;
        shape.endingPoint.y += diffY;
      }
    });
    this.setOldX(x);
    this.setOldY(y);
  }

  topLeftResize(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.width -= diffX;
      shape.width = (shape.width < 10) ? 10 : shape.width;
      if (shape.width != 10) shape.upperLeftCorner.x += diffX;

      shape.height -= diffY;
      shape.height = (shape.height < 10) ? 10 : shape.height;
      if (shape.height != 10) shape.upperLeftCorner.y += diffY;

    });
    this.setOldX(x);
    this.setOldY(y);
  }

  topRightResize(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.width += diffX;
      shape.width = (shape.width < 10) ? 10 : shape.width;

      shape.height -= diffY;
      shape.height = (shape.height < 10) ? 10 : shape.height;
      if (shape.height != 10) shape.upperLeftCorner.y += diffY;

    });
    this.setOldX(x);
    this.setOldY(y);
  }


  bottomLeftResize(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.width -= diffX;
      shape.width = (shape.width < 10) ? 10 : shape.width;
      if (shape.width != 10) shape.upperLeftCorner.x += diffX;

      shape.height += diffY;
      shape.height = (shape.height < 10) ? 10 : shape.height;

    });
    this.setOldX(x);
    this.setOldY(y);
  }

  bottomRightResize(x: number, y: number) {
    this.selectedShapes.forEach(shape => {
      let diffX = x - this.oldMouseX;
      let diffY = y - this.oldMouseY;

      shape.width += diffX;
      shape.width = (shape.width < 10) ? 10 : shape.width;

      shape.height += diffY;
      shape.height = (shape.height < 10) ? 10 : shape.height;

    });
    this.setOldX(x);
    this.setOldY(y);
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

  setSelectedShapes(shapeArray: Shape[]) {
    this.reset();
    this.selectedShapes = shapeArray;
  }

  drawCorners(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.outlineColor;
    ctx.beginPath();
    ctx.fillRect(this.upperLeftCorner.x + this.width - 3, this.upperLeftCorner.y - 3, 6, 6);
    ctx.beginPath();
    ctx.fillRect(this.upperLeftCorner.x - 3, this.upperLeftCorner.y + this.height - 3, 6, 6);
    ctx.beginPath();
    ctx.fillRect(this.upperLeftCorner.x + this.width - 3, this.upperLeftCorner.y + this.height - 3, 6, 6);
    ctx.beginPath();
    ctx.fillRect(this.upperLeftCorner.x - 3, this.upperLeftCorner.y - 3, 6, 6);
  }

  override isMouseInside(mouseX: number, mouseY: number) {
    if (this.width > 0 && this.height > 0) {
      return mouseX > this.upperLeftCorner.x + 3 && mouseX < this.upperLeftCorner.x + this.width - 3 &&
        mouseY > this.upperLeftCorner.y + 3 && mouseY < this.upperLeftCorner.y + this.height - 3;
    }
    else if (this.width > 0 && this.height < 0) {
      return mouseX > this.upperLeftCorner.x + 3 && mouseX < this.upperLeftCorner.x + this.width - 3 &&
        mouseY < this.upperLeftCorner.y - 3 && mouseY > this.upperLeftCorner.y + this.height + 3;
    }
    else if (this.width < 0 && this.height > 0) {
      return mouseX < this.upperLeftCorner.x - 3 && mouseX > this.upperLeftCorner.x + this.width + 3 &&
        mouseY > this.upperLeftCorner.y + 3 && mouseY < this.upperLeftCorner.y + this.height - 3;
    }
    else if (this.width < 0 && this.height < 0) {
      return mouseX < this.upperLeftCorner.x - 3 && mouseX > this.upperLeftCorner.x + this.width + 3 &&
        mouseY < this.upperLeftCorner.y - 3 && mouseY > this.upperLeftCorner.y + this.height + 3;
    }
    return false;
  }

  isMouseOnVertex(mouseX: number, mouseY: number, x: number, y: number) {
    return mouseX >= x - 3 && mouseX <= x + 3 && mouseY >= y - 3 && mouseY <= y + 3;
  }

  isResizing(mouseX: number, mouseY: number) {
    return this.isMouseOnVertex(mouseX, mouseY, this.upperLeftCorner.x, this.upperLeftCorner.y) ||
      this.isMouseOnVertex(mouseX, mouseY, this.upperLeftCorner.x + this.width, this.upperLeftCorner.y) ||
      this.isMouseOnVertex(mouseX, mouseY, this.upperLeftCorner.x, this.upperLeftCorner.y + this.height) ||
      this.isMouseOnVertex(mouseX, mouseY, this.upperLeftCorner.x + this.width, this.upperLeftCorner.y + this.height);
  }

  getSelectedShapes() {
    return this.selectedShapes;
  }

  reset() {
    this.upperLeftCorner.x = 0;
    this.upperLeftCorner.y = 0;
    this.width = 0;
    this.height = 0;
    this.selectedShapes = [];
  }
}
