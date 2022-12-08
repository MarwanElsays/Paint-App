import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

  shape:string ="";
  Edit:string ="";
  color:string = "#000000FF";
  select:string = 'drawShape';
  sel:boolean = false;

  erase = new EventEmitter<boolean>();
  undo = new EventEmitter<boolean>();
  redo = new EventEmitter<boolean>();

  emitErase(){
    this.erase.emit(true);
  }

  emitUndo(){
    this.undo.emit(true);
  }

  emitRedo(){
    this.redo.emit(true);
  }
}
