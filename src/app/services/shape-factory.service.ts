import { Square } from './../Shapes/square';
import { Injectable } from '@angular/core';
import { Circle } from '../Shapes/circle';
import { Shape } from '../Shapes/shape';
import { Line } from '../Shapes/line';
import { Triangle } from '../Shapes/triangle';
import { selectbox } from '../Shapes/selectbox';

@Injectable({
  providedIn: 'root'
})
export class ShapeFactoryService {
  getShape(shapeType: string) {
    switch (shapeType) {
      case 'square': return new Square();
      case 'circle': return new Circle();
      case 'line': return new Line();
      case 'triangle': return new Triangle();
      case 'selectbox': return new selectbox();
    }
    return new Shape();
  }
}
