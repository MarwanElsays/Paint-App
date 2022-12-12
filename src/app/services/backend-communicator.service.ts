import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Shape } from '../Shapes/shape';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicatorService {

  constructor(private http: HttpClient) { }

  public reset() {
    return this.http.post("http://localhost:8085/reset", null);
  }

  public createLine(id:number,startingPoint:string,endingPoint:string,
                    thickness:number,fillColor:string){
     
    this.http.post( "http://localhost:8085/createLine",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('startingPoint', startingPoint)
                               .set('endingPoint',endingPoint)
                               .set('thickness',thickness.toString())
                               .set('fillColor',fillColor)
      }
    ).subscribe();
  }

  public createMultiPointShape(id:number,type:string,upperLeftCorner:string,width:number,height:number,
                                fillColor:string,outlineColor:string,thickness:number ){
     
    this.http.post( "http://localhost:8085/createShape",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('type', type)
                               .set('upperLeftCorner',upperLeftCorner)
                               .set('width',width.toString())
                               .set('height',height.toString())
                               .set('fillColor',fillColor)
                               .set('outlineColor',outlineColor)
                               .set('thickness',thickness.toString())
      }
    ).subscribe();

  }

  public changeFillColor(id: number, fillColor: string) {

    return this.http.post("http://localhost:8085/updateFillColor", null,
      {
        responseType: 'json',
        params: new HttpParams().set('id', id.toString())
          .set('fillColor', fillColor)

      }
    ).subscribe();
  }

  public changeThickness(id: number, thickness: number) {

    return this.http.post("http://localhost:8085/updateThickness", null,
      {
        responseType: 'json',
        params: new HttpParams().set('id', id.toString())
          .set('thickness', thickness)

      }
    ).subscribe();
  }

  public changeLinePos(id: number, startingPoint: string, endingPoint: string) {

    return this.http.post("http://localhost:8085/updateLinePos", null,
      {
        responseType: 'json',
        params: new HttpParams().set('id', id.toString())
          .set('startingPoint', startingPoint)
          .set('endingPoint', endingPoint)
      }
    ).subscribe();
  }


  public changeShapePosAndSize(id: number, upperLeftCorner: string, width: number, height: number) {

    return this.http.post("http://localhost:8085/updateShapePosAndSize", null,
      {
        responseType: 'json',
        params: new HttpParams().set('id', id.toString())
          .set('upperLeftCorner', upperLeftCorner)
          .set('width', width.toString())
          .set('height', height.toString()),
      }
    ).subscribe();
  }


  public changeOutlineColor(id: number, outlineColor: string) {

    return this.http.post("http://localhost:8085/updateOutlineColor", null,
      {
        responseType: 'json',
        params: new HttpParams().set('id', id.toString())
          .set('outlineColor', outlineColor)

      }
    ).subscribe();
  }


  /*Lsaaaaaaaaaaaaaaaaaa*/
  public changeFillOpacity(id: number, opacity: number) {

    return this.http.post("http://localhost:8085/updateFillOpacity", null,
      {
        responseType: 'json',
        params: new HttpParams().set('id', id.toString())
          .set('opacity', opacity.toString())

      }
    ).subscribe();
  }

  public deleteShape(id: number) {

    return this.http.post("http://localhost:8085/delete", null,
      {
        responseType: 'json',
        params: new HttpParams().set('id', id.toString())
      }
    ).subscribe();
  }


  public createShapeCopy(newID: number, copiedID: number, newUpperLeftCorner: string,
    addUndo: boolean) {

    return this.http.post("http://localhost:8085/createShapeCopy", null,
      {
        responseType: 'json',
        params: new HttpParams().set('newID', newID.toString())
          .set('copiedID', copiedID.toString())
          .set('newUpperLeftCorner', newUpperLeftCorner)
          .set('addUndo', addUndo.toString()),
      }
    ).subscribe();
  }

  public createLineCopy(newID: number, copiedID: number, newStartingPoint: string,
    newEndingPoint: string, addUndo: boolean) {

    return this.http.post("http://localhost:8085/createLineCopy", null,
      {
        responseType: 'json',
        params: new HttpParams().set('newID', newID.toString())
          .set('newStartingPoint', newStartingPoint)
          .set('newEndingPoint', newEndingPoint)
          .set('copiedID', copiedID.toString())
          .set('addUndo', addUndo.toString()),
      }
    ).subscribe();
  }

  public performUndo():Observable<Shape[]>{
    return this.http.get<getResponseShapes>( "http://localhost:8085/undo",{responseType:'json'}).pipe(
      map(response => response.Shapes.Shape)
    );
  }

  public performRedo():Observable<Shape[]>{
    return this.http.get<getResponseShapes>( "http://localhost:8085/redo",{responseType:'json'}).pipe(
      map(response => response.Shapes.Shape)
    );
  }

  /*lsaaaaa*/
  public getShapeData() {
    return this.http.get("http://localhost:8085/getShapeData", { responseType: 'json' });
  }

  public saveXML() {
    return this.http.get("http://localhost:8085/saveXml", { responseType: 'text' });
  }

  public getAllShapesJsonInfo() {
    return this.http.get("http://localhost:8085/saveJson", { responseType: 'json' });
  }

  public xmlToJSON(xml: string) {
    return this.http.get("http://localhost:8085/xmlToJson", { responseType: 'json', params: new HttpParams().set('xmlString', xml)});
  }
}

interface getResponseShapes {
  Shapes:{
    Shape:Shape[];
  }
}

