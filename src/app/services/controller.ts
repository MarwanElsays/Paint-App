import { Line } from './../Shapes/line';
import { CanvasComponent } from "../canvas/canvas.component";
import { SelectBox } from "../Shapes/selectbox";
import { Shape } from "../Shapes/shape";
import { DrawService } from "./draw.service";
import {lastValueFrom} from 'rxjs';


export class ControllerService {
  constructor(private canvas: CanvasComponent, private drawServe: DrawService) { }

  copyedshapes: Shape[] = [];

   async Undo(ctx: CanvasRenderingContext2D) {
    
    this.canvas.shapes.splice(0, this.canvas.shapes.length);
    let returnedArray = await lastValueFrom (this.canvas.backService.performUndo());

    returnedArray.forEach((s) =>{
        let shape = this.objectToShape(this.canvas.factory.getShape(s.type),s);
        this.canvas.shapes.push(shape);
        this.canvas.update(ctx);
    })
   
  }

  async Redo(ctx: CanvasRenderingContext2D) {
    
    this.canvas.shapes.splice(0, this.canvas.shapes.length);
    let returnedArray = await lastValueFrom (this.canvas.backService.performRedo());

    returnedArray.forEach((s) =>{
        let shape = this.objectToShape(this.canvas.factory.getShape(s.type),s);
        this.canvas.shapes.push(shape);
        this.canvas.update(ctx);
    })
   
  }

  Erase(ctx: CanvasRenderingContext2D) {
    this.canvas.startcanvas(ctx);
    this.canvas.shapes.splice(0, this.canvas.shapes.length);
    this.canvas.backService.reset().subscribe();
    this.canvas.ShapeID = 1;
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

    s.Delete.subscribe(() => {
      if(this.drawServe.state != 'Selected')return;

      this.canvas.selectedShapes.forEach((s) => {
        this.canvas.shapes.splice(this.canvas.shapes.findIndex((x) => {return x.id == s.id}), 1); 
        this.canvas.backService.deleteShape(s.id);      
      })

      this.canvas.backService.deleteShape(this.canvas.selectBox.id);
      this.canvas.shapes.splice(this.canvas.shapes.findIndex((x) => {return x.id == this.canvas.selectBox.id}), 1);
      this.canvas.update(ctx);
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
        if(s instanceof Line){
          this.canvas.backService.createLineCopy(s.id,oldID,s.upperLeftCorner.x.toString()+","+s.upperLeftCorner.y.toString(),s.endx.toString()+","+s.endy.toString(),true);
        }
        else
        {
          this.canvas.backService.createShapeCopy(s.id,oldID,s.upperLeftCorner.x.toString()+","+s.upperLeftCorner.y.toString(),true);
        }
      });

      this.canvas.selectBox.upperLeftCorner.x-=20;
      this.canvas.selectBox.upperLeftCorner.y-=20;
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

  objectToShape(newShape:Shape,returnedObj:Shape):Shape{
    newShape.upperLeftCorner.x = returnedObj.upperLeftCorner.x;
    newShape.upperLeftCorner.y = returnedObj.upperLeftCorner.y;
    newShape.fillColor = returnedObj.fillColor;
    newShape.fillOpacity = returnedObj.fillOpacity;
    newShape.height = returnedObj.height;
    newShape.id = returnedObj.id;
    newShape.outlineColor = returnedObj.outlineColor;
    newShape.thickness = returnedObj.thickness;
    newShape.type = returnedObj.type;
    newShape.valid = returnedObj.valid;
    newShape.width = returnedObj.width;

    return newShape;
  }
}
