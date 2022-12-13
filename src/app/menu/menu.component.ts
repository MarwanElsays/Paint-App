import { Component, OnInit } from '@angular/core';
import { DrawService } from '../services/draw.service';
import {
  faEraser, faSave, faFileUpload, faUndo, faRedo, faMousePointer,
  faSquare, faCircle, faCopy, faPaste,faTrash, faFill , faFillDrip
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
  faFillDrip = faFillDrip;

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

  Fillborder(){
    this.s.emitFillBorderEvent();
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


  saving:boolean = false;

  saveXML() {
    this.backendService.saveXML().subscribe((xml) => {   
      let file = new Blob([xml],{type:"xml"});
      let anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(file);
      anchor.download = "XmlFile.xml";
      anchor.click();
    });
  }

  saveJson() {
    this.backendService.getAllShapesJsonInfo().subscribe((Json) => {
      let file = new Blob([JSON.stringify(Json)],{type:"json"});
      let anchor = document.createElement("a");
      anchor.href = URL.createObjectURL(file);
      anchor.download = "JsonFile.json";
      anchor.click();
    });
  }

  load(event: Event) {
    const files = (<HTMLInputElement> event.target).files;
    if (files) {
      files[0].text().then((loadedFile) => {

        if(files[0].type == 'xml'){
          this.backendService.xmlToJSON(loadedFile).subscribe((returnedArray) => {
            this.s.emitLoadXmlJsoned(returnedArray);
          });
        }else{
          let jsonedfile = JSON.parse(loadedFile)
          this.s.emitLoadJson(jsonedfile);
        }

      });
    }
  }
}

