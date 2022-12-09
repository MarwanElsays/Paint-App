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
  { name: 'Copy', icon: faCopy },
  { name: 'Cut', icon: faCut },
  { name: 'Paste', icon: faPaste },
  ];


  asign(shape: string) {
    this.s.state = 'drawShape';
    this.s.shape = shape;
  }

  doEdits(edit: string) {
    this.s.state = edit;
  }

  Fill() {
    if (this.s.state != 'Fill') {
      this.s.state = 'Fill';
      this.s.emitFillEvent();
    } else {
      this.s.state = 'drawShape';
      this.s.emitFillEvent();
    }
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
    if (this.s.state != 'Selecting') {
      this.s.state = 'Selecting';
    } else {
      this.s.state = 'drawShape';
      this.s.emitUnSelectEvent();
    }
  }
}



