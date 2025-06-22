import { Circle, Rectangle, type Drawable } from '../drawing';

class Game {
  public bird: Drawable;
  public pipes: Drawable[] = [];
  public score: number = 0;
  public active: boolean = false;

  constructor(bird: Drawable) {
    this.bird = bird;
  }

  start() {
    this.active = true;
  }

  stop() {
    this.active = false;
  }

  loop(): void {
    this.draw();
    this.update();
    if (this.active) {
      requestAnimationFrame(this.loop);
    }
  }

  update() {
    const birdIsRect: boolean = this.bird instanceof Rectangle;
    const birdIsCircle: boolean = this.bird instanceof Circle;

    if (birdIsRect) {
      if (this.bird.x + this.bird.width >= this) {
      }
    }
  }
  draw() {}
}

export default Game;
