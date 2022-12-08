import { Shape } from './shape';
export class Square extends Shape {
  
  override Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {
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
  }

  override Update(ctx: CanvasRenderingContext2D) {
    ctx.strokeStyle = this.col;
    ctx.beginPath();
    ctx.strokeRect(this.x, this.y, this.w, this.h);
  }

  override Move(x: number, y: number): void {
    this.x = x;
    this.y = y;
  }

  override Resize(width: number, height: number): void {
    this.w = width;
    this.h = height;
  }

}

