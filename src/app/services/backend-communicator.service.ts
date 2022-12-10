import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackendCommunicatorService {

  constructor(private http:HttpClient) { }

  public createMultiPointShape(id:number,type:string,upperLeftCorner:string,width:number,height:number){
     
    return this.http.post( "http://localhost:8085/createShape",null,
      {responseType:'json',
       params: new HttpParams().set('id', id.toString())
                               .set('type', type)
                               .set('upperLeftCorner',upperLeftCorner)
                               .set('width',width.toString())
                               .set('height',height.toString()),
  });

  }
  
}
