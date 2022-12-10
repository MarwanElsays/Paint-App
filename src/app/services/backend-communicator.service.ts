import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicatorService {

  constructor(private http:HttpClient) { }

  public reset(){
    this.http.post( "http://localhost:8085/reset",null);
  }

  public createLine(id:number,startingPoint:string,endingPoint:string){
     
    this.http.post( "http://localhost:8085/createLine",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('startingPoint', startingPoint)
                               .set('endingPoint',endingPoint)
      }
    );
  }

  public createMultiPointShape(id:number,type:string,upperLeftCorner:string,width:number,height:number){
     
    this.http.post( "http://localhost:8085/createShape",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('type', type)
                               .set('upperLeftCorner',upperLeftCorner)
                               .set('width',width.toString())
                               .set('height',height.toString()),
      }
    );

  }

  public changeFillColor(id:number,fillColor:string){
     
    this.http.post( "http://localhost:8085/updateFillColor",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('fillColor', fillColor)
                       
      }
    );
  }

  public changeThickness(id:number,thickness:number){
     
    this.http.post( "http://localhost:8085/updateThickness",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('thickness', thickness)
                       
      }
    );
  }

  public changeLinePos(id:number,startingPoint:string,endingPoint:string){
     
    this.http.post( "http://localhost:8085/updateLinePos",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('startingPoint', startingPoint)
                               .set('endingPoint',endingPoint)
      }
    );
  }


  public changeShapePosAndSize(id:number,upperLeftCorner:string,width:number,height:number){
     
    this.http.post( "http://localhost:8085/updateShapePosAndSize",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('upperLeftCorner',upperLeftCorner)
                               .set('width',width.toString())
                               .set('height',height.toString()),
      }
    );
  }

  public changeOutlineColor(id:number,outlineColor:string){
     
    this.http.post( "http://localhost:8085/updateOutlineColor",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('outlineColor', outlineColor)
                       
      }
    );
  }

  public changeFillOpacity(id:number,opacity:number){
     
    this.http.post( "http://localhost:8085/updateFillOpacity",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('opacity', opacity.toString())
                       
      }
    );
  }

  public deleteShape(id:number){
     
    this.http.post( "http://localhost:8085/delete",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())        
      }
    );
  }

  public createShapeCopy(id:number,type:string,upperLeftCorner:string,width:number,height:number,
                        fillColor:string,fillOpacity:number ,thickness:number,outlineColor:string,
                        addUndo:boolean ){
     
    this.http.post( "http://localhost:8085/createShapeCopy",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('type', type)
                               .set('upperLeftCorner',upperLeftCorner)
                               .set('width',width.toString())
                               .set('height',height.toString())
                               .set('fillColor', fillColor)
                               .set('fillOpacity', fillOpacity.toString())
                               .set('thickness',thickness.toString())
                               .set('outlineColor',outlineColor)
                               .set('addUndo',addUndo.toString()),
      }
    );
  }

  public createLineCopy(id:number,startingPoint:string,endingPoint:string,
                        fillColor:string,thickness:number,addUndo:boolean ){

    this.http.post( "http://localhost:8085/createLineCopy",null,
      {responseType:'json',
      params: new HttpParams().set('id', id.toString())
                .set('startingPoint', startingPoint)
                .set('endingPoint',endingPoint)
                .set('fillColor', fillColor)
                .set('thickness',thickness.toString())
                .set('addUndo',addUndo.toString()),
      }
    );
  }

  public performUndo(){
    return this.http.get( "http://localhost:8085/undo",{responseType:'json'});
  }

  public performRedo(){
    return this.http.get( "http://localhost:8085/redo",{responseType:'json'});
  }

  public getShapeData(){
    return this.http.get( "http://localhost:8085/getShapeData",{responseType:'json'});
  }

  






  
  
}
