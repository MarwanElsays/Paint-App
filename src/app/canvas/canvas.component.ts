import { ShapeFactoryService } from './../services/shape-factory.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Shape } from '../Shapes/shape';
import { ControllerService } from '../services/controller';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  constructor(private s: DrawService, private factory: ShapeFactoryService) { }

  @ViewChild('c', { static: true }) canvas!: ElementRef;
  startdraw: boolean = false;
  startx: number = 0;
  starty: number = 0;
  shapes: Shape[] = [];
  selectShapes: Shape[] = [];
  currshape: Shape = new Shape();
  moveSelected: boolean = false;
  controller: ControllerService = new ControllerService(this);
  undoArray: Shape[] = [];

  ngOnInit(): void {
    const mycanvas: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = mycanvas.getContext('2d');
    if (ctx) {
      this.startcanvas(ctx);
      this.eventSubscription(ctx);
      this.mouseInput(mycanvas, ctx);
    }
  }
  
  startcanvas(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, 1536, 701);
  }

  mouseInput(mycanvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    mycanvas.addEventListener('mousedown', (e) => {
      ctx.beginPath();
      this.startx = e.clientX;
      this.starty = e.clientY - 80;
      this.startdraw = true;

      if (this.s.select == 'drawSelectBox') {
        this.currshape = this.factory.getShape('selectbox');
        this.s.color = '#000000';
      } else if (this.s.select == 'drawShape') {
        this.currshape = this.factory.getShape(this.s.shape);
      } else if (
        this.s.select == 'selected' &&
        e.clientX >= this.currshape.x &&
        e.clientX <= this.currshape.x + this.currshape.w &&
        e.clientY-80 >= this.currshape.y &&
        e.clientY-80 <= this.currshape.y + this.currshape.h
      ){
        this.moveSelected = true;
        this.currshape.valid = false;
      }
      else {
        this.s.select = 'drawShape';
        this.s.shape = '';
        this.s.sel = false;
        this.shapes.pop();
        this.update(ctx);
        this.currshape.valid = false;
        this.moveSelected = false;
      }
    });

    mycanvas.addEventListener('mousemove', (e) => {
      if (!this.moveSelected) {
        this.update(ctx);
        this.Draw(ctx, e.clientX, e.clientY - 80);
      } else {

        /*Here We Will Do  Cases For Move, Resize , Drag, Copy ,Cut , etc.... of the Selected box */
        /*   ************** ***************      ********* **** ****          *************/

        // this.selectShapes.forEach((shape) => {
        //   shape.x = e.clientX;
        //   shape.y = e.clientY;
        //   shape.Draw(ctx, shape.col, e.clientX, e.clientY, this.startx, this.starty);
        //   this.update(ctx);
        // });


        /***********************************************************************/
      }
    });

    mycanvas.addEventListener('mouseup', (e) => {
      this.startdraw = false;
      this.moveSelected = false;

      if (this.s.select == 'drawSelectBox' && ctx) {
        this.select();
      }

      if (this.currshape.valid == true) this.shapes.push(this.currshape);
      if (this.currshape) this.currshape.id = this.shapes.length;
      console.log(this.shapes)
    });
  }

  update(ctx: CanvasRenderingContext2D) {
    this.startcanvas(ctx);
    this.shapes.forEach((s) => {
      s.Update(ctx);
    });
  }

  Draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.startdraw) return;
    ctx.beginPath();
    this.currshape.Draw(ctx, this.s.color, x, y, this.startx, this.starty);
  }

  select() {
    this.selectShapes = this.shapes.filter((shape) => {
      return (
        shape.x > this.currshape.x &&
        shape.x + shape.w < this.currshape.x + this.currshape.w &&
        shape.y > this.currshape.y &&
        shape.y + shape.h < this.currshape.y + this.currshape.h
      );
    });

    this.s.select = 'selected';
  }

  eventSubscription(ctx: CanvasRenderingContext2D) {
    this.s.erase.subscribe((b) => {
      this.controller.Erase(ctx);
    });

    this.s.undo.subscribe((b) => {
      this.controller.Undo(ctx);
    });

    this.s.redo.subscribe((b) => {
      this.controller.Redo(ctx);
    });
  }
}



// drawPencil(ctx: CanvasRenderingContext2D, x: number, y: number) {
//   ctx.strokeStyle = this.s.color;
//   ctx.beginPath();
//   ctx.lineTo(x, y);
//   ctx.stroke();
// }