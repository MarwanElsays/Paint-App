import { Line } from './../Shapes/line';
import { CanvasComponent } from "../canvas/canvas.component";
import { SelectBox } from "../Shapes/selectbox";
import { Shape } from "../Shapes/shape";
import { DrawService } from "./draw.service";
import { lastValueFrom, map } from 'rxjs';
import { XmlJsoned } from '../NewTypes/XmlJsonedType';

export class ControllerService {
  constructor(private canvas: CanvasComponent, private drawServe: DrawService) { }

  copyedshapes: Shape[] = [];

  async Undo(ctx: CanvasRenderingContext2D) {

    this.canvas.shapes.splice(0, this.canvas.shapes.length);
    let returnedArray = await lastValueFrom(this.canvas.backService.performUndo());

    returnedArray.forEach((shape) => {
      let s = this.objectToShape(this.canvas.factory.getShape(shape.type), shape);
      this.canvas.shapes.push(s);
    })
    this.canvas.update(ctx);
  }

  async Redo(ctx: CanvasRenderingContext2D) {

    this.canvas.shapes.splice(0, this.canvas.shapes.length);
    let returnedArray = await lastValueFrom(this.canvas.backService.performRedo());

    returnedArray.forEach((s) => {
      let shape = this.objectToShape(this.canvas.factory.getShape(s.type), s);
      this.canvas.shapes.push(shape);
    })
    this.canvas.update(ctx);
  }

  Erase(ctx: CanvasRenderingContext2D) {
    this.canvas.startcanvas(ctx);
    this.canvas.shapes.splice(0, this.canvas.shapes.length);
    this.canvas.backService.reset().subscribe();
    this.canvas.ShapeID = 1;
  }

  Delete(ctx: CanvasRenderingContext2D) {
    if (this.drawServe.state != 'Selected') return;

    this.canvas.selectBox.getSelectedShapes().forEach((s) => {
      this.canvas.backService.deleteShape(s.id);
      this.canvas.shapes.splice(this.canvas.shapes.findIndex((x) => { return x.id == s.id }), 1);
    })

    this.canvas.shapes.splice(this.canvas.shapes.findIndex((x) => { return x.id == 0 }), 1);
    this.canvas.update(ctx)
  }

  Copy() {
    if (this.drawServe.state != 'Selected') return;

    this.copyedshapes.splice(0, this.copyedshapes.length);
    this.canvas.selectBox.getSelectedShapes().forEach((s) => {
      this.copyedshapes.push(s.clone());
    })
  }

  Paste(ctx: CanvasRenderingContext2D) {
    let ShapesToBeAdd: Shape[] = [];
    this.copyedshapes.forEach((s) => {
      ShapesToBeAdd.push(s.clone());
    });

    ShapesToBeAdd.forEach((s) => {
      let oldID = s.id;
      s.id = this.canvas.ShapeID++;
      this.canvas.shapes.push(s);
      if (s instanceof Line) {
        this.canvas.backService.createLineCopy(s.id, oldID, s.upperLeftCorner.x.toString() + "," + s.upperLeftCorner.y.toString(), s.endingPoint.x.toString() + "," + s.endingPoint.y.toString(), true);
      }
      else {
        this.canvas.backService.createShapeCopy(s.id, oldID, s.upperLeftCorner.x.toString() + "," + s.upperLeftCorner.y.toString(), true);
      }
    });

    this.canvas.selectBox.upperLeftCorner.x -= 20;
    this.canvas.selectBox.upperLeftCorner.y -= 20;
    this.canvas.selectBox.setSelectedShapes(ShapesToBeAdd);
    this.canvas.update(ctx);
  }

  changeShapeThickness(ctx: CanvasRenderingContext2D) {
    if (this.drawServe.state != 'Selected') return;

    this.canvas.selectBox.getSelectedShapes().forEach((shape) => {
      shape.thickness = this.drawServe.thickness;
      this.canvas.backService.changeThickness(shape.id, shape.thickness);
    })

    this.canvas.update(ctx);
  }

  changeShapeBorderColor(ctx: CanvasRenderingContext2D) {
    if (this.drawServe.state != 'Selected') return;

    this.canvas.selectBox.getSelectedShapes().forEach((shape) => {
      shape.outlineColor = this.drawServe.color;
      if(shape instanceof Line){
        this.canvas.backService.changeFillColor(shape.id, shape.outlineColor);
      }
      else
      {
        this.canvas.backService.changeOutlineColor(shape.id, shape.outlineColor);
      }
      
    })

    this.canvas.update(ctx);
  }

  LoadXmlJsoned(ctx: CanvasRenderingContext2D,LoadedShapes:XmlJsoned[]){
    this.Erase(ctx);
    LoadedShapes.forEach((shape) => {
      let s = this.XmlJsonedToShape(this.canvas.factory.getShape(shape.type), shape);
      this.canvas.shapes.push(s);
      this.sendToBack(s);
    })
    let maxID = 0;
    this.canvas.shapes.forEach((shape) => {
      this.canvas.ShapeID = Math.max(shape.id, maxID);
    })
    this.canvas.ShapeID++;
    console.log(this.canvas.shapes)
    this.canvas.update(ctx);
  }

  LoadJsoned(ctx: CanvasRenderingContext2D,LoadedShapes:Shape[]){
    this.Erase(ctx);
    LoadedShapes.forEach((shape) => {
      let s = this.objectToShape(this.canvas.factory.getShape(shape.type), shape);
      this.canvas.shapes.push(s);
      this.sendToBack(s);
    })
    let maxID = 0;
    this.canvas.shapes.forEach((shape) => {
      this.canvas.ShapeID = Math.max(shape.id, maxID);
    })
    this.canvas.ShapeID++;
    console.log(this.canvas.shapes)
    this.canvas.update(ctx);
  }


  eventSubscription(ctx: CanvasRenderingContext2D, s: DrawService) {

    s.LoadJsoned.pipe(map( jsonedfile => jsonedfile.Shapes.Shape)).subscribe((jsonedfile)=>{
        this.LoadJsoned(ctx,jsonedfile)
    })
    
    s.LoadXmlJsoned.subscribe((LoadedShapes) => {
       this.LoadXmlJsoned(ctx,LoadedShapes);
    });

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
      this.Delete(ctx);
    });

    s.copy.subscribe(() => {
      this.Copy()
    });

    s.paste.subscribe(() => {
      this.Paste(ctx)
    });

    s.ChangeThickness.subscribe(() => {
      this.changeShapeThickness(ctx);
    })

    s.ChangeBorderColor.subscribe(() => {
      this.changeShapeBorderColor(ctx);
    })

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

  objectToShape(newShape: Shape, returnedObj: Shape): Shape {
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
    newShape.valid = true;

    if (newShape instanceof Line) {
      newShape.endingPoint.x = (<Line>returnedObj).endingPoint.x;
      newShape.endingPoint.y = (<Line>returnedObj).endingPoint.y;
      newShape.outlineColor = (<Line>returnedObj).fillColor;
      newShape.width = newShape.endingPoint.x - newShape.upperLeftCorner.x;
      newShape.height = newShape.endingPoint.y - newShape.upperLeftCorner.y;
    }

    return newShape;
  }


  XmlJsonedToShape(newShape: Shape, returnedObj: XmlJsoned): Shape {
    newShape.upperLeftCorner.x = parseFloat(returnedObj.upperLeftCorner.split(",",2)[0]);
    newShape.upperLeftCorner.y = parseFloat(returnedObj.upperLeftCorner.split(",",2)[1]);
    newShape.fillColor = returnedObj.fillColor;
    newShape.fillOpacity = returnedObj.fillOpacity;
    newShape.height = returnedObj.height;
    newShape.id = returnedObj.ID;
    newShape.outlineColor = returnedObj.outlineColor;
    newShape.thickness = returnedObj.thickness;
    newShape.type = returnedObj.type;
    newShape.width = returnedObj.width;
    newShape.valid = true;

    if (newShape instanceof Line) {
      newShape.endingPoint.x = parseFloat(returnedObj.endingPoint.split(",",2)[0]);
      newShape.endingPoint.y = parseFloat(returnedObj.endingPoint.split(",",2)[1]);
      newShape.outlineColor = returnedObj.fillColor;
      newShape.width = newShape.endingPoint.x - newShape.upperLeftCorner.x;
      newShape.height = newShape.endingPoint.y - newShape.upperLeftCorner.y;
    }

    return newShape;
  }


  sendToBack(s:Shape){
    let upperleftcornner = s.upperLeftCorner.x.toString() + "," + s.upperLeftCorner.y.toString();
    if (s instanceof Line) {
      let endingpoint = s.endingPoint.x.toString() + "," + s.endingPoint.y.toString();
      this.canvas.backService.createLine(s.id, upperleftcornner, endingpoint, s.thickness, s.fillColor);
    }
    else {
        this.canvas.backService.createMultiPointShape(s.id, s.type, upperleftcornner, s.width, s.height,
            s.fillColor,s.outlineColor, s.thickness);
    }
  }
}
