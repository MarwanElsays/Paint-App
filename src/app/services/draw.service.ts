import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

  shape: string = "";
  color: string = "#000000FF";
  state: string = 'drawShape';

  erase = new EventEmitter<void>();
  undo = new EventEmitter<void>();
  redo = new EventEmitter<void>();
  fillEvent = new EventEmitter<void>();
  unSelectEvent = new EventEmitter<void>();

  emitErase() {
    this.erase.emit();
  }

  emitUndo() {
    this.undo.emit();
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
