export const drawCircle = (ctx: CanvasRenderingContext2D, x: number, y: number, radius: number, fillStyle: string = "#000", fill: boolean = true, strokeStyle: string = "#222", stroke: boolean = false) => {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
    ctx.fillStyle = fillStyle;
    if (fill) ctx.fill();
    // ctx.lineWidth = 5;
    ctx.strokeStyle = strokeStyle;
    if (stroke) ctx.stroke();
}

export const drawBackground = (ctx: CanvasRenderingContext2D, color = "#000") => {
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}

export const drawDevTools = (ctx: CanvasRenderingContext2D, config: any, backgroundColor = "rgba(8,255,0,0.37)") => {
    let y = 25;
    let x = 10;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, 300, 200 + y);
    ctx.fillStyle = "#000"
    ctx.font = "20px Arial, sans-serif"
    for (let key in config) {
        ctx.fillText(`${key}: ${config[key]}`, x, y);
        y += 25
    }
}

export const drawCollisions = (ctx: CanvasRenderingContext2D, collisions: any) => {
    for (let collision of collisions) {
        ctx.beginPath()
        ctx.strokeStyle = collision.strokeColor;
        ctx.strokeRect(collision.x - collision.width / 2, collision.y - collision.height / 2, collision.width, collision.height)
        ctx.closePath()
    }
}