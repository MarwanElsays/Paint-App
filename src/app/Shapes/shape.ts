export class Shape {
  type:string = '';
  id: number = 0;
  outlineColor: string = '';
  valid: boolean = false;
  width: number = 0;
  height: number = 0;
  fillColor: string = '';
  thickness :number = 1;
  fillOpacity:number = 1;
  upperLeftCorner = {x:0,y:0};

  public Draw(ctx: CanvasRenderingContext2D, color: string,linewidth:number,x: number, y: number, startx: number, starty: number) {}
  public Update(ctx: CanvasRenderingContext2D) {}
  public Move(x: number, y: number) {}
  public Resize(width: number, height: number) {}
  public Fill(fillColor: string, ctx: CanvasRenderingContext2D) {}
  public clone():Shape{return new Shape()}
}
