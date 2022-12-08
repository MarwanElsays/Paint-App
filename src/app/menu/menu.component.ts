import { Component, OnInit } from '@angular/core';
import { DrawService } from '../services/draw.service';
import {
  faEraser, faSave, faFileUpload, faUndo, faRedo, faMousePointer,
  faSquare, faCircle, faPencilAlt, faCopy, faPaste, faCut, faFill
} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

  constructor(public s: DrawService) { }

  faEraser = faEraser;
  faSave = faSave;
  faFileUpload = faFileUpload;
  faUndo = faUndo;
  faRedo = faRedo;
  faMousePointer = faMousePointer;
  faFill = faFill;

  shapes: any[] = [
  { name: 'square', icon: faSquare },
  { name: 'circle', icon: faCircle },
  { name: 'pencil', icon: faPencilAlt }
  ];

  Edits: any[] = [
  { name: 'Copy', icon: faCopy },       //change name to Copy
  { name: 'Cut', icon: faCut },
  { name: 'Paste', icon: faPaste },
  ];


  asign(shape: string) {
    this.s.shape = shape;
  }

  doEdits(edit: string) {
    this.s.Edit = edit;
  }

  Fill() {
    this.s.Fill = !this.s.Fill;
    this.s.Edit = '';
    this.s.sel = false;
    this.s.emitFillEvent();
  }

  erase() {
    this.s.emitErase();
  }

  undo() {
    this.s.emitUndo();
  }

  redo() {
    this.s.emitRedo();
  }

  select() {
    this.s.sel = !this.s.sel;
    if (this.s.sel) {
      this.s.select = "drawSelectBox";
      this.s.Fill = false;
    } else {
      this.s.select = "drawShape";
    }
  }
}



