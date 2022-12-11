import { Line } from './../Shapes/line';
import { CanvasComponent } from "../canvas/canvas.component";
import { SelectBox } from "../Shapes/selectbox";
import { Shape } from "../Shapes/shape";
import { DrawService } from "./draw.service";

export class ControllerService {
  constructor(private canvas: CanvasComponent, private drawServe: DrawService) { }

  copyedshapes: Shape[] = [];

  Undo(ctx: CanvasRenderingContext2D) {
    this.canvas.backService.performUndo().subscribe((a) => {
      console.log(JSON.stringify(a));
    });
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
    this.canvas.backService.reset().subscribe();
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
      if (this.drawServe.state != 'Selected') return;

      this.copyedshapes.splice(0, this.copyedshapes.length);
      this.canvas.selectedShapes.forEach((s) => {
        this.copyedshapes.push(s.clone());
      })

    });

    s.paste.subscribe(() => {
      let ShapesToBeAdd: Shape[] = [];
      this.copyedshapes.forEach((s) => {
        ShapesToBeAdd.push(s.clone());
      });

      ShapesToBeAdd.forEach((s) => {
        let oldID = s.id;
        s.id = this.canvas.ShapeID++;
        this.canvas.shapes.push(s);
        if (s instanceof Line) {
          this.canvas.backService.createLineCopy(s.id, oldID, s.x.toString() + "," + s.y.toString(), s.endx.toString() + "," + s.endy.toString(), true).subscribe();
        }
        else {
          this.canvas.backService.createShapeCopy(s.id, oldID, s.x.toString() + "," + s.y.toString(), true).subscribe();
        }
      });

      this.canvas.selectBox.x -= 20;
      this.canvas.selectBox.y -= 20;
      this.canvas.selectBox.setSelectedShapes(ShapesToBeAdd);
      this.canvas.update(ctx);

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
}
