import { Shape } from './shape';
export class selectbox extends Shape {
  
  override Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {
    ctx.setLineDash([6]);
    ctx.strokeStyle = color;
    ctx.strokeRect(startx, starty, x - startx, y - starty);
    
    this.x = startx;
    this.y = starty;
    this.w = x - startx;
    this.h = y - starty;
    this.col = color;
    if (this.w == 0 && this.h == 0)
      this.valid = false;
    else this.valid = true;

    ctx.setLineDash([0]);
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.setLineDash([6]);
    ctx.strokeStyle = this.col;
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.w, this.h);
    ctx.setLineDash([0]);
  }

}

