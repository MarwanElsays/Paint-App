import { EventEmitter, Injectable } from '@angular/core';
import { XmlJsoned } from '../NewTypes/XmlJsonedType';
import { getResponseShapes } from '../NewTypes/NewInterfaces';

@Injectable({
  providedIn: 'root'
})
export class DrawService {

  constructor() { }

  shape: string = "";
  color: string = "#000000FF";
  thickness:number = 1;
  state: string = 'drawShape';      
  equalDims: boolean = false;   

  LoadJsoned = new EventEmitter<getResponseShapes>();
  LoadXmlJsoned = new EventEmitter<XmlJsoned[]>();
  ChangeBorderColor = new EventEmitter<void>();
  ChangeThickness = new EventEmitter<void>();
  erase = new EventEmitter<void>();
  undo = new EventEmitter<void>();
  redo = new EventEmitter<void>();
  copy = new EventEmitter<void>();
  Delete = new EventEmitter<void>();
  paste = new EventEmitter<void>();
  fillEvent = new EventEmitter<void>();
  unSelectEvent = new EventEmitter<void>();

  emitLoadJson(ShapesLoaded:Object){
    this.LoadJsoned.emit(<getResponseShapes>ShapesLoaded);
  }

  emitLoadXmlJsoned(ShapesLoaded:XmlJsoned[]){
    this.LoadXmlJsoned.emit(ShapesLoaded);
  }

  emitFillBorderEvent(){
    this.ChangeBorderColor.emit()
  }

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
