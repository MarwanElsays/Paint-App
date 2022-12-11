import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { Shape } from '../Shapes/shape';
import { ControllerService } from '../services/controller';
import { SelectBox } from '../Shapes/selectbox';
import { ShapeFactoryService } from '../services/shape-factory.service';
import { BackendCommunicatorService } from '../services/backend-communicator.service';
import { Line } from '../Shapes/line';

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css'],
})
export class CanvasComponent implements OnInit {
  constructor(private s: DrawService, private factory: ShapeFactoryService, public backService: BackendCommunicatorService) { }

  @ViewChild('c', { static: true }) canvas!: ElementRef;
  mouseX: number = 0;
  mouseY: number = 0;
  moveSelected: boolean = false;
  startDraw: boolean = false;
  resizing: boolean = false;
  shapes: Shape[] = [];
  undoArray: Shape[] = [];
  currshape: Shape = new Shape();
  selectBox: SelectBox = new SelectBox();
  controller: ControllerService = new ControllerService(this, this.s);
  selectedShapes: Shape[] = [];
  ShapeID: number = 1;

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

  mouseInput(mycanvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    mycanvas.addEventListener('mousedown', (e) => {
      this.update(ctx);
      ctx.beginPath();
      this.mouseX = e.clientX;
      this.mouseY = e.clientY - 80;
      this.startDraw = true;
      if (this.s.state == 'Fill') { //filling shapes
        console.log('here');
        this.s.shape = '';
        this.currshape = new Shape();
        this.Fill(ctx);
      } 
      else if (this.s.state == 'DrawSelectBox') { //selecting shapes
        this.currshape = this.selectBox;
        this.s.color = '#000000';
      } 
      else if (this.s.state == 'drawShape') { //drawing shape
        this.currshape = this.factory.getShape(this.s.shape);
      }
      else if (this.s.state == 'Selected' && this.selectBox.isMouseInside(e.clientX, e.clientY - 80)) { //selected and moving
        this.moveSelected = true;
        this.s.state = 'Move';
        this.selectBox.setOldX(e.clientX);
        this.selectBox.setOldY(e.clientY);
      }
      else if (this.s.state == 'Selected' && this.selectBox.isResizing(e.clientX, e.clientY - 80)) {
        this.resizing = true;
        this.s.state = 'Resize';
        this.selectBox.setOldX(e.clientX);
        this.selectBox.setOldY(e.clientY);
      }
      else { //selected and clicked outside
        this.reset();
      }
    });

    mycanvas.addEventListener('mousemove', (e) => {
      this.update(ctx);
      if (!this.moveSelected && !this.resizing && !(this.s.state == 'Fill')) {
        this.Draw(ctx, e.clientX, e.clientY - 80);
      } else {
        switch (this.s.state) {
          case 'Move': this.selectBox.Move(e.clientX, e.clientY); break;
          case 'Resize':
            if (this.selectBox.isMouseOnVertex(this.mouseX, this.mouseY, this.selectBox.x + this.selectBox.w, this.selectBox.y)) {
              this.selectBox.topRightResize(e.clientX, e.clientY);
            }
            else if (this.selectBox.isMouseOnVertex(this.mouseX, this.mouseY, this.selectBox.x, this.selectBox.y)) {
              this.selectBox.topLeftResize(e.clientX, e.clientY);
            }
            else if (this.selectBox.isMouseOnVertex(this.mouseX, this.mouseY, this.selectBox.x + this.selectBox.w, this.selectBox.y + this.selectBox.h)) {
              this.selectBox.bottomRightResize(e.clientX, e.clientY);
            }
            else if (this.selectBox.isMouseOnVertex(this.mouseX, this.mouseY, this.selectBox.x, this.selectBox.y + this.selectBox.h)) {
              this.selectBox.bottomLeftResize(e.clientX, e.clientY);
            }
            this.selectBox.Resize(e.clientX, e.clientY); 
            break;
        }
      }
    });

    mycanvas.addEventListener('mouseup', (e) => {
      this.update(ctx);
      this.startDraw = false;
      this.moveSelected = false;
      this.resizing = false;

      if (this.s.state == 'DrawSelectBox') {
        ctx.setLineDash([0]);
        this.selectedShapes = this.selectBox.selectShapes(this.shapes, this.s);
        if (this.selectBox.w < 0) {
          this.selectBox.x += this.selectBox.w;
          this.selectBox.w = - this.selectBox.w;
        }
        if (this.selectBox.h < 0) {
          this.selectBox.y += this.selectBox.h;
          this.selectBox.h = - this.selectBox.h;
        }
      }
      else if (this.s.state == 'Move') {
        let upperleftcornner = this.currshape.x.toString() + "," + this.currshape.y.toString();
        if (this.currshape instanceof Line) {
          let endingpoint = this.currshape.endx.toString() + "," + this.currshape.endy.toString();
          this.backService.changeLinePos(this.currshape.id, upperleftcornner, endingpoint).subscribe();
        }
        else {
          this.backService.changeShapePosAndSize(this.currshape.id, upperleftcornner, this.currshape.w, this.currshape.h).subscribe();
        }
      }
      else if (this.s.state == 'Resize') {
        let upperleftcornner = this.currshape.x.toString() + "," + this.currshape.y.toString();
        if (this.currshape instanceof Line) {
          let endingpoint = this.currshape.endx.toString() + "," + this.currshape.endy.toString();
          this.backService.changeLinePos(this.currshape.id, upperleftcornner, endingpoint).subscribe();
        }
        else {
          this.backService.changeShapePosAndSize(this.currshape.id, upperleftcornner, this.currshape.w, this.currshape.h).subscribe();
        }
      }

      if (this.currshape.valid == true) {
        this.currshape.id = this.ShapeID++;
        if (this.currshape.w < 0) {
          this.currshape.x += this.currshape.w;
          this.currshape.w = - this.currshape.w;
        }
        if (this.currshape.h < 0) {
          this.currshape.y += this.currshape.h;
          this.currshape.h = - this.currshape.h;
        }
        this.shapes.push(this.currshape);

        let upperleftcornner = this.currshape.x.toString() + "," + this.currshape.y.toString();
        if (this.currshape instanceof Line) {
          let endingpoint = this.currshape.endx.toString() + "," + this.currshape.endy.toString();
          this.backService.createLine(this.currshape.id, upperleftcornner, endingpoint).subscribe();
        }
        else {
          this.backService.createMultiPointShape(this.currshape.id, this.s.shape, upperleftcornner, this.currshape.w, this.currshape.h).subscribe();
        }
      }
    });
  }

  update(ctx: CanvasRenderingContext2D) {
    this.startcanvas(ctx);
    ctx.setLineDash([0]);
    if (this.s.state != 'DrawSelectBox' && this.s.state != 'Selected' && this.shapes.includes(this.selectBox)) {
      this.shapes.splice(this.shapes.findIndex((x) => { return x.id == this.selectBox.id }), 1);
    }
    this.shapes.forEach((s) => {
      s.Update(ctx);
    });
  }

  Draw(ctx: CanvasRenderingContext2D, x: number, y: number) {
    if (!this.startDraw) return;
    ctx.beginPath();
    this.currshape.Draw(ctx, this.s.color, x, y, this.mouseX, this.mouseY);
  }

  Fill(ctx: CanvasRenderingContext2D) {
    this.shapes.forEach((s) => {
      if (s.isMouseInside(this.mouseX, this.mouseY)) {
        ctx.fillStyle = this.s.color;
        this.backService.changeFillColor(s.id, this.s.color).subscribe();
        s.Fill(this.s.color, ctx);
      }
    })
  }

  reset() {
    this.s.state = '';
    this.currshape = new Shape();
    this.s.shape = '';
    this.moveSelected = false;
    this.startDraw = false;
  }
}
