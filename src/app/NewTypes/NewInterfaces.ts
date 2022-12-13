import { Shape } from "../Shapes/shape";
import { XmlJsoned } from "./XmlJsonedType";

export interface getResponseShapes {
    Shapes:{
        Shape:Shape[];
    }
}
  
export interface loadedXml {
    Shapes:{
        Shape:XmlJsoned[];
    }
}