import './style.css'
import {drawBackground, drawCircle, drawDevTools} from "./methods";

const canvas: HTMLCanvasElement = document.querySelector("#canvas") as HTMLCanvasElement;

canvas.height = innerHeight;
canvas.width = innerWidth;

onresize = () => {
    canvas.height = innerHeight;
    canvas.width = innerWidth;
    // main()
}

const ctx = canvas.getContext("2d")!;

interface IParticle {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    radius: number;
    color: string;
}

let particles: IParticle[] = []

const config = {
    minRadius: 1,
    maxRadius: 4,
    particlesVelocity: 2,
    mouseRadius: 20,
    particlesCount: 200,
    devTools: false,
}

let mouseX = 0;
let mouseY = 0;
let isMouseDown = false;

addEventListener("mousemove", (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
})

addEventListener("mousedown", () => {
    isMouseDown = true
})

addEventListener("mouseup", () => {
    isMouseDown = false;
})

const loop = () => {
    drawBackground(ctx)

    if (isMouseDown && mouseX > 0 && mouseY > 0) {
        const radius = Math.floor(Math.random() * (config.maxRadius - config.minRadius + 1)) + config.minRadius
        particles.push({
            x: mouseX,
            y: mouseY,
            radius,
            color: `rgb(255, 255, 255, ${Math.random() * 1})`,
            velocityX: Math.random() * (config.particlesVelocity * 2) - config.particlesVelocity,
            velocityY: Math.random() * (config.particlesVelocity * 2) + config.particlesVelocity
        })
    }

    for (let i in particles) {
        let particle = particles[i]
        drawCircle(ctx, particle.x, particle.y, particle.radius, particle.color);
        if (particle.x < 0) {
            particle.x = canvas.width
        } else {
            particle.x += particle.velocityX;
        }

        if (particle.y < 0) {
            particle.y = canvas.height - (particle.radius / 2)
        } else {
            particle.y -= particle.velocityY;
        }

        // if ((particle.x < mouseX + config.mouseRadius && particle.x > mouseX - config.mouseRadius) && (particle.y < mouseY + config.mouseRadius && particle.y > mouseY - config.mouseRadius)) {
        //     particle.x = canvas.width
        //     particle.y = canvas.height - (particle.radius / 2)
        // }
    }

    let mouseColorOpacity = 0.1
    if (isMouseDown) {
        mouseColorOpacity += 0.1
        // let intervalId = setInterval(() => {
        //     if (mouseColorOpacity === 1) {
        //         clearInterval(intervalId)
        //     }
        // }, 1)
    }

    drawCircle(ctx, mouseX,mouseY, config.mouseRadius, `rgba(255, 255, 255, ${mouseColorOpacity})`)
    // ctx.fillRect(mouseX - config.mouseRadius, mouseY - config.mouseRadius, config.mouseRadius * 2, config.mouseRadius * 2);
    if (config.devTools) drawDevTools(ctx, config);

    requestAnimationFrame(loop)
}

addEventListener("keypress", (e) => {
    if (e.key === "1") config.devTools = !config.devTools
})

const main = () => {
    particles = []
    // let x = config.initialX;
    //
    // for (let i = 0; i < canvas.width-(config.initialX * 2); i++) {
    //     particles.push({
    //         x,
    //         y: config.initialY - radius,

    //     })
    //     x++
    // }

    loop()
}

// addEventListener("click", main)

main()

