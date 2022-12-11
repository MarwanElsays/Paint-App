import { Component, OnInit } from '@angular/core';
import { DrawService } from '../services/draw.service';
import {
  faEraser, faSave, faFileUpload, faUndo, faRedo, faMousePointer,
  faSquare, faCircle, faCopy, faPaste,faTrash, faFill
} from '@fortawesome/free-solid-svg-icons';
import { BackendCommunicatorService } from '../services/backend-communicator.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {

  constructor(public s: DrawService, private backendService: BackendCommunicatorService) { }

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
  ];

  Edits: any[] = [
  { name: 'Copy', icon: faCopy },
  { name: 'Delete', icon: faTrash },
  { name: 'Paste', icon: faPaste },
  ];


  asign(shape: string) {
    this.s.state = 'drawShape';
    this.s.shape = shape;
  }

  doEdits(edit: string) {
    switch(edit){
      case 'Copy':
        this.s.emitCopy();
        break;
      case 'Delete':
        this.s.emitDelete();
        break;
      case 'Paste':
        this.s.emitPaste();
        break;

    }
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

  ChangeThickness(){
    this.s.emitChangeThickness();
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
    if (this.s.state != 'DrawSelectBox') {
      this.s.state = 'DrawSelectBox';
    } else {
      this.s.state = 'drawShape';
      this.s.emitUnSelectEvent();
    }
  }

  save() {
    this.backendService.saveXML().subscribe((xml) => {
      console.log(xml);
    });
  }

  load(xml: string) {
    this.backendService.xmlToJSON(xml).subscribe((json) => {
      console.log(json.valueOf());
    })
  }
}
