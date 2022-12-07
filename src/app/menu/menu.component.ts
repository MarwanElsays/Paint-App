import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DrawService } from '../services/draw.service';
import { faEraser } from '@fortawesome/free-solid-svg-icons';
import { faSave } from '@fortawesome/free-solid-svg-icons';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { faUndo } from '@fortawesome/free-solid-svg-icons';
import { faRedo } from '@fortawesome/free-solid-svg-icons';
import { faMousePointer } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
    
  constructor(public s: DrawService) {}

  ngOnInit(): void {}
  faEraser = faEraser;
  faSave = faSave;
  faFileUpload = faFileUpload;
  faUndo = faUndo;
  faRedo = faRedo;
  faMousePointer = faMousePointer;

  shapes: string[] = ['square', 'circle', 'triangle', 'line','pencil'];

  asign(shape: string) {
    this.s.shape = shape;
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
  
  select(){
    this.s.sel = !this.s.sel;
    if(this.s.sel){
      this.s.select = "drawSelectBox";
    }else{
      this.s.select = "drawShape";
    }
  }
}
