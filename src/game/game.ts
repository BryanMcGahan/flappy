import { Rectangle, Renderer } from '../drawing';

class Game {
    public score: number = 0;
    public active: boolean = false;
    private bird: any;
    private pipes: Rectangle[][] = [];
    private renderer: Renderer;
    private flap: boolean = false;

    constructor(renderer: Renderer) {
        this.renderer = renderer;
        // this.bird = new Rectangle(20, renderer.height / 2, '#000000', 50, 50);
        this.bird = {
            x: renderer.width / 3,
            y: renderer.height / 2,
            width: 75,
            height: 75,
            dx: 4,
            dy: 4,
        };

        this.pipes = this.init_pipes();

        window.addEventListener('keydown', (event) => {
            if (event.code == 'Space') this.bird.dy = -4;
        });
        window.addEventListener('keyup', (event) => {
            if (event.code == 'Space') this.bird.dy = 4;
        });

        const image = new Image();
        image.onload = () => {
            Promise.all([
                createImageBitmap(image, 0, 0, 620, 500),
                createImageBitmap(image, 625, 0, 650, 500),
                createImageBitmap(image, 1250, 0, 700, 500),
            ]).then((sprite) => {
                this.bird.fallingSprite = sprite[0];
                this.bird.risingSprite = sprite[1];
                this.bird.flatSprite = sprite[2];
            });
        };
        image.src = '/test_bird.png';
    }

    private init_pipes(): Rectangle[][] {
        let pipe_gap: number =
            Math.floor(Math.random() * (400 - 300 + 1)) + 300;
        let top_bottom_gap: number =
            Math.floor(Math.random() * (this.renderer.height - 200 - 200 + 1)) +
            200;
        const pipes: Rectangle[][] = [];
        for (let i = 100000; i >= this.renderer.width; i -= pipe_gap) {
            const pipe_pairs: Rectangle[] = [
                new Rectangle(i, 0, '#000000', 100, top_bottom_gap - 100),
                new Rectangle(
                    i,
                    top_bottom_gap + 100,
                    '#000000',
                    100,
                    this.renderer.height - 100
                ),
            ];
            pipes.push(pipe_pairs);
            pipe_gap = Math.floor(Math.random() * (400 - 300 + 1)) + 300;
            top_bottom_gap =
                Math.floor(
                    Math.random() * (this.renderer.height - 200 - 200 + 1)
                ) + 200;
        }
        return pipes;
    }

    public start() {
        this.active = true;
        this.loop();
    }

    public stop() {
        this.active = false;
    }

    private update() {
        this.bird.y += this.bird.dy;
        if (
            this.bird.y < 0 ||
            this.bird.y + this.bird.height >= this.renderer.height
        ) {
            this.stop();
        }

        for (let i = 0; i < this.pipes.length; i++) {
            const pipe_pair: Rectangle[] = this.pipes[i];
            const top: Rectangle = pipe_pair[0];
            const bottom: Rectangle = pipe_pair[1];
            top.x -= 5;
            bottom.x -= 5;
            if (
                (this.bird.y < top.y &&
                    this.bird.x + this.bird.width > top.x &&
                    this.bird.x + this.bird.width < top.x + top.width) ||
                (this.bird.y < this.renderer.height &&
                    this.bird.y > bottom.y &&
                    this.bird.x + this.bird.width > bottom.x &&
                    this.bird.x + this.bird.width < bottom.x + bottom.width)
            ) {
                this.stop();
            }
            if (top.x + top.width < 0) {
                this.pipes.slice(i, 1);
            }
        }
    }

    private draw() {
        this.renderer.clearScreen();
        if (
            this.bird.fallingSprite &&
            this.bird.risingSprite &&
            this.bird.flatSprite
        ) {
            if (this.bird.dy < 0) {
                this.renderer.ctx.drawImage(
                    this.bird.flatSprite,
                    this.bird.x,
                    this.bird.y,
                    this.bird.width,
                    this.bird.height
                );
            } else {
                this.renderer.ctx.drawImage(
                    this.bird.fallingSprite,
                    this.bird.x,
                    this.bird.y,
                    this.bird.width,
                    this.bird.height
                );
            }
        }

        for (const pipe of this.pipes) {
            const top = pipe[0];
            const bottom = pipe[1];
            top.draw(this.renderer.ctx);
            bottom.draw(this.renderer.ctx);
        }
    }

    public loop() {
        this.update();
        this.draw();
        if (this.active) {
            requestAnimationFrame(() => this.loop());
        }
    }
}

export default Game;
