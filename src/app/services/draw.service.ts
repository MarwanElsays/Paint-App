import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

  shape: string = "";
  color: string = "#000000FF";
  thickness:number = 1;
  state: string = 'drawShape';         

  ChangeThickness = new EventEmitter<void>();
  erase = new EventEmitter<void>();
  undo = new EventEmitter<void>();
  redo = new EventEmitter<void>();
  copy = new EventEmitter<void>();
  Delete = new EventEmitter<void>();
  paste = new EventEmitter<void>();
  fillEvent = new EventEmitter<void>();
  unSelectEvent = new EventEmitter<void>();

  emitChangeThickness(){
    this.ChangeThickness.emit()
  }

  emitErase() {
    this.erase.emit();
  }

  emitUndo() {
    this.undo.emit();
  }

  emitCopy() {
    this.copy.emit();
  }

  emitDelete() {
    this.Delete.emit();
  }

  emitPaste() {
    this.paste.emit();
  }

  emitRedo() {
    this.redo.emit();
  }

  emitFillEvent() {
    this.fillEvent.emit();
  }

  emitUnSelectEvent() {
    this.unSelectEvent.emit();
  }
}
