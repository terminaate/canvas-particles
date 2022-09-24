import './style.css'

interface IParticle {
    x: number;
    y: number;
    velocityX: number;
    velocityY: number;
    radius: number;
    color: string;
}

type ParticlesProps = {
    canvas?: HTMLCanvasElement;
    minRadius?: number;
    maxRadius?: number;
    particlesVelocity?: number;
    mouseRadius?: number;
    width?: number | string;
    height?: number | string;
    generateOnMouseDown?: boolean;
    deleteOnMouseDown?: boolean;
    particlesCount?: number;
    drawMouse?: boolean;
    animate?: boolean;
}

export const defaultConfig = {
    minRadius: 1,
    maxRadius: 4,
    particlesVelocity: 2,
    particlesCount: 200,
    mouseRadius: 20,
    width: 500,
    height: 500,
    generateOnMouseDown: false,
    deleteOnMouseDown: true,
    drawMouse: false,
    animate: true
}

class Particles {
    minRadius: number;
    maxRadius: number;
    particlesVelocity: number;
    mouseRadius: number;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;
    particles: IParticle[] = [];
    width: number;
    height: number;
    mouseX: number = 0;
    mouseY: number = 0;
    isMouseDown: boolean = false;
    generateOnMouseDown: boolean;
    deleteOnMouseDown: boolean;
    particlesCount: number;
    drawMouse: boolean;
    animationId: number = 0;
    animate: boolean;

    constructor({
                    canvas,
                    minRadius = 1,
                    maxRadius = 4,
                    particlesVelocity = 2,
                    particlesCount = 200,
                    mouseRadius = 20,
                    width = 500,
                    height = 500,
                    generateOnMouseDown = false,
                    drawMouse = false,
                    deleteOnMouseDown = true,
                    animate = true
                }: ParticlesProps = {}) {
        if (!canvas) {
            canvas = document.createElement("canvas") as HTMLCanvasElement
            document.body.appendChild(canvas)
        }

        this.canvas = canvas;

        this.width = Particles.getWidth(width);
        this.height = Particles.getHeight(height);

        this.canvas.height = this.height;
        this.canvas.width = this.width;

        onresize = () => {
            this.canvas.width = Particles.getWidth(width);
            this.canvas.height = Particles.getHeight(height);
        }

        addEventListener("mousemove", (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        })

        addEventListener("mousedown", () => {
            this.isMouseDown = true
        })

        addEventListener("mouseup", () => {
            this.isMouseDown = false;
        })

        this.ctx = this.canvas.getContext("2d")!;
        this.minRadius = minRadius;
        this.maxRadius = maxRadius;
        this.particlesVelocity = particlesVelocity;
        this.particlesCount = particlesCount
        this.mouseRadius = mouseRadius;
        this.generateOnMouseDown = generateOnMouseDown;
        this.deleteOnMouseDown = deleteOnMouseDown;
        this.drawMouse = drawMouse;
        this.animate = animate;
        this.main = this.main.bind(this);
        this.loop = this.loop.bind(this)
        this.main()
    }

    setCanvasWidth(width: string | number) {
        this.canvas.width = Particles.getWidth(width);
    }

    setCanvasHeight(height: string | number) {
        this.canvas.height = Particles.getHeight(height);
    }

    private static getWidth(width: number | string) {
        if (typeof width === "string") {
            if (width.endsWith("%")) {
                return parseInt(width) < 100 ? (innerWidth / 100) * parseInt(width) : innerWidth
            } else {
                return parseInt(width)
            }
        } else {
            return width;
        }
    }

    private static getHeight(height: number | string) {
        if (typeof height === "string") {
            if (height.endsWith("%")) {
                return parseInt(height) < 100 ? (innerHeight / 100) * parseInt(height) : innerHeight
            } else {
                return parseInt(height)
            }
        } else {
            return height;
        }
    }

    private drawCircle(x: number, y: number, radius: number, fillStyle: string = "#000", fill: boolean = true, strokeStyle: string = "#222", stroke: boolean = false) {
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
        this.ctx.fillStyle = fillStyle;
        if (fill) this.ctx.fill();
        this.ctx.strokeStyle = strokeStyle;
        if (stroke) this.ctx.stroke();
    }

    private drawBackground(color = "#000") {
        this.ctx.fillStyle = color;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height)
    }

    main() {
        this.particles = [];

        if (!this.generateOnMouseDown) {
            for (let i = 0; i < this.particlesCount; i++) {
                this.generateParticle(Math.random() * this.canvas.width, Math.random() * this.canvas.height)
            }
        }

        this.loop()
    }

    loop() {
        this.drawBackground()

        if (this.generateOnMouseDown && this.particles.length < this.particlesCount && this.isMouseDown && this.mouseX > 0 && this.mouseY > 0) {
            this.generateParticle(this.mouseX, this.mouseY)
        }

        if (this.particles.length > this.particlesCount) {
            this.particles = this.particles.slice(0, this.particlesCount - 1)
        } else if (this.particlesCount !== Infinity) {
            for (let i = 0; i < this.particlesCount - this.particles.length; i++) {
                this.generateParticle(Math.random() * this.canvas.width, Math.random() * this.canvas.height)
            }
        }


        for (let i in this.particles) {
            let particle = this.particles[i]
            this.drawCircle(particle.x, particle.y, particle.radius, particle.color);
            if (particle.x < 0) {
                particle.x = this.canvas.width
            } else {
                particle.x += particle.velocityX;
            }

            if (particle.y < 0) {
                particle.y = this.canvas.height - (particle.radius / 2)
            } else {
                particle.y -= particle.velocityY;
            }

            if (this.isMouseDown && this.deleteOnMouseDown && (particle.x < this.mouseX + this.mouseRadius && particle.x > this.mouseX - this.mouseRadius) && (particle.y < this.mouseY + this.mouseRadius && particle.y > this.mouseY - this.mouseRadius)) {
                delete this.particles[i]
            }
        }

        let mouseColorOpacity = 0.1
        if (this.isMouseDown) {
            mouseColorOpacity += 0.1
        }

        if (this.drawMouse) {
            this.drawCircle(this.mouseX, this.mouseY, this.mouseRadius, `rgba(255, 255, 255, ${mouseColorOpacity})`)
        }
        // if (this.devTools) drawDevTools(ctx, this);

        if (this.animate) {
            this.animationId = requestAnimationFrame(this.loop)
        }
    }

    private generateParticle(x: number = 0, y: number = 0) {
        const radius = Math.floor(Math.random() * (this.maxRadius - this.minRadius + 1)) + this.minRadius
        this.particles.push({
            x,
            y,
            radius,
            color: `rgb(255, 255, 255, ${Math.random() * 1})`,
            velocityX: this.generateParticleVelocity() - this.particlesVelocity,
            velocityY: this.generateParticleVelocity() + this.particlesVelocity
        })
    }

    private generateParticleVelocity() {
        return Math.random() * (this.particlesVelocity * 2)
    }

    stop() {
        cancelAnimationFrame(this.animationId)
        this.animationId = 0;
    }

    start() {
        if (this.animationId <= 0) {
            this.animationId = requestAnimationFrame(this.loop)
        }
    }
}

export default Particles