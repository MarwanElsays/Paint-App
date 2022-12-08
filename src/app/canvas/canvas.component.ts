import { ShapeFactoryService } from './../services/shape-factory.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Shape } from '../Shapes/shape';
import { ControllerService } from '../services/controller';
import { SelectBox } from '../Shapes/selectbox';

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
  currshape: Shape = new Shape();
  moveSelected: boolean = false;
  controller: ControllerService = new ControllerService(this);
  undoArray: Shape[] = [];
  selectBox: SelectBox = new SelectBox();

  ngOnInit(): void {
    const mycanvas: HTMLCanvasElement = this.canvas.nativeElement;
    const ctx = mycanvas.getContext('2d');
    if (ctx) {
      this.startcanvas(ctx);
      this.controller.eventSubscription(ctx, this.s);
      this.mouseInput(mycanvas, ctx);
    }
  }

  startcanvas(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, 1536, 701);
  }

  update(ctx: CanvasRenderingContext2D) {
    this.startcanvas(ctx);
    ctx.setLineDash([0]);
    this.shapes.forEach((s) => {
      s.Update(ctx);
    });
  }

  Draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.startdraw) return;
    ctx.beginPath();
    this.currshape.Draw(ctx, this.s.color, x, y, this.startx, this.starty);
  }

  // drawPencil(ctx: CanvasRenderingContext2D, x: number, y: number) {
  //   ctx.strokeStyle = this.s.color;
  //   ctx.beginPath();
  //   ctx.lineTo(x, y);
  //   ctx.stroke();
  // }

  mouseInput(mycanvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    mycanvas.addEventListener('mousedown', (e) => {
      this.update(ctx);
      ctx.beginPath();
      this.startx = e.clientX;
      this.starty = e.clientY - 80;
      this.startdraw = true;
      console.log(this.controller.mouseInside(e.clientX, e.clientY, this.selectBox));
      if (this.s.select == 'drawSelectBox') {
        this.currshape = this.selectBox;
        this.s.color = '#000000';
        this.s.shape = '';
      } else if (this.s.select == 'drawShape') {
        this.currshape = this.factory.getShape(this.s.shape);
      } else if (this.s.select === 'selected' && this.controller.mouseInside(e.clientX, e.clientY, this.selectBox)) {
        this.moveSelected = true;
        this.currshape.valid = false;
        this.selectBox.setOldX(e.clientX);
        this.selectBox.setOldY(e.clientY);
      } else {
        this.s.select = 'drawShape';
        this.s.sel = false;
        this.shapes.pop();
        this.currshape.valid = false;
        this.moveSelected = false;
      }
    });

    mycanvas.addEventListener('mousemove', (e) => {
      this.update(ctx);
      if (!this.moveSelected) {
        this.Draw(ctx, e.clientX, e.clientY - 80);
      } else {
        switch (this.s.Edit) {
          case 'Move':
            this.selectBox.Move(e.clientX, e.clientY);
            break;
          case 'Resize': this.selectBox.Resize(e.clientX, e.clientY); break;
        }
        /*Here We Will Do  Cases For Move, Resize , Drag, Copy ,Cut , etc.... of the Selected box */
        /*   ************** ***************      ********* **** ****          *************/

        // this.selectShapes.forEach((shape) => {
        //   shape.x = e.clientX;
        //   shape.y = e.clientY;
        //   shape.Draw(ctx, shape.col, e.clientX, e.clientY, this.startx, this.starty);
        // });
        /***********************************************************************/
      }
    });

    mycanvas.addEventListener('mouseup', (e) => {
      this.update(ctx);
      this.startdraw = false;
      this.moveSelected = false;

      console.log(this.s.select);
      if (this.s.select == 'drawSelectBox') {
        ctx.setLineDash([0]);
        this.selectBox.selectShapes(this.shapes, this.s);
      }

      if (this.currshape.valid == true) 
        this.shapes.push(this.currshape);
      if (this.currshape)
        this.currshape.id = this.shapes.length;
    });
  }
}
