import { CanvasComponent } from "../canvas/canvas.component";
import { Shape } from "../Shapes/shape";
import { DrawService } from "./draw.service";

export class ControllerService {
  constructor(private canvas: CanvasComponent) {}

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

  Erase(ctx: CanvasRenderingContext2D) {
    this.canvas.startcanvas(ctx);
    this.canvas.shapes.splice(0, this.canvas.shapes.length);
  }

  eventSubscription(ctx: CanvasRenderingContext2D, s: DrawService) {
    s.erase.subscribe(() => {
      this.Erase(ctx);
    });

    s.undo.subscribe(() => {
      this.Undo(ctx);
    });

    s.redo.subscribe(() => {
      this.Redo(ctx);
    });
  }

  mouseInside(mouseX: number, mouseY: number, shape: Shape) {
    return (mouseX >= shape.x &&
    mouseX <= shape.x + shape.w &&
    mouseY - 80 >= shape.y &&
    mouseY - 80 <= shape.y + shape.h);
  }
}
