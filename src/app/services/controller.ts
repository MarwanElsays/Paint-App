import { CanvasComponent } from "../canvas/canvas.component";
import { Shape } from "../Shapes/shape";

export class ControllerService {
  constructor(private canvas: CanvasComponent) { }

  Undo(ctx: CanvasRenderingContext2D) {
    let removedShape = this.canvas.shapes.pop();
    if (removedShape) this.canvas.undoArray.push(removedShape);
    this.canvas.update(ctx);
  }

  Redo(ctx: CanvasRenderingContext2D) {
    let removedShape = this.canvas.undoArray.pop();
    if (removedShape) this.canvas.shapes.push(removedShape);
    this.canvas.update(ctx);
  }

  Move(shape: Shape, x: number, y: number) {
    shape.x = x;
    shape.y = y;
  }

  
  Resize(shape: Shape, width: number, height: number) {
    shape.w = width;
    shape.h = height;
  }

  Erase(ctx: CanvasRenderingContext2D) {
    this.canvas.startcanvas(ctx);
    this.canvas.shapes.splice(0, this.canvas.shapes.length);
  }
}
