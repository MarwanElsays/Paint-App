import { Shape } from "./shape";

export class Line extends Shape {
    endx: number = 0;
    endy: number = 0;
    override Draw(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, startx: number, starty: number) {
        ctx.strokeStyle = color;
        ctx.moveTo(startx, starty);
        ctx.lineTo(x, y);
        ctx.stroke();
    
        this.x = startx;
        this.y = starty;
        this.endx = x;
        this.endy = y;
        this.col = color;
        if (this.endx ==  this.x && this.endy ==  this.y)
            this.valid = false;
        else this.valid = true;
    }

    override Update(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.col;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.endx, this.endy);
        ctx.stroke();
    }
}