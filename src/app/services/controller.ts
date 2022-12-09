import { CanvasComponent } from "../canvas/canvas.component";
import { SelectBox } from "../Shapes/selectbox";
import { Shape } from "../Shapes/shape";
import { DrawService } from "./draw.service";

export class ControllerService {
  constructor(private canvas: CanvasComponent,private drawServe:DrawService) {}

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

    s.copy.subscribe(() => {
      if(this.drawServe.state != 'Selected')return;

      this.canvas.selectedShapes.forEach((s) => {
        s.Fill("#0F0",ctx);
      })
     
    });

    s.cut.subscribe(() => {
      if(this.drawServe.state != 'Selected')return;

      this.canvas.selectedShapes.forEach((s) => {
        s.Fill("#0FF",ctx);
      })
    });

    s.paste.subscribe(() => {
      this.Redo(ctx);
    });

    s.fillEvent.subscribe(() => {
      if (this.canvas.shapes[this.canvas.shapes.length - 1] instanceof SelectBox)
        this.canvas.shapes.pop();
      this.canvas.update(ctx);
    })

    s.unSelectEvent.subscribe(() => {
      if (this.canvas.shapes[this.canvas.shapes.length - 1] instanceof SelectBox)
        this.canvas.shapes.pop();
      this.canvas.update(ctx);
    })
  }

  mouseInside(mouseX: number, mouseY: number, shape: Shape) {
    return (mouseX >= Math.min(shape.x, shape.x + shape.w) &&
    mouseX <= Math.max(shape.x, shape.x + shape.w) &&
    mouseY - 80 >= Math.min(shape.y, shape.y + shape.h) &&
    mouseY - 80 <= Math.max(shape.y, shape.y + shape.h));
  }
}
