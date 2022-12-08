import { Shape } from './shape';

export class Triangle extends Shape{
    override Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {
        ctx.strokeStyle = color;
        ctx.moveTo(startx, starty);
        ctx.lineTo(x, y);
        ctx.lineTo(startx - (x - startx), y);
        ctx.closePath();
        ctx.stroke();
    
        this.w = (x - startx) * 2;
        this.h = (y - starty);
        this.x = startx - this.w / 2;
        this.y = starty;
        this.col = color;
        this.valid = true;
      }

      override Update(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.col;
        ctx.beginPath();
        ctx.moveTo(this.x + this.w / 2, this.y);
        ctx.lineTo(this.x + this.w, this.y + this.h);
        ctx.lineTo(this.x, this.y + this.h);
        ctx.closePath();
        ctx.stroke();
      }
}