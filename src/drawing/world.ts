import { type Drawable } from './drawable';
/**
 * Represents the game object
 **/
class World {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private bodies: Drawable[] = [];

  /**
   * params {string} canvas_id - The id of canvas element to be used for the game
   * params {number} width - The width of the canvas for the game
   * params {number} height - The height of the canvas for the game
   **/
  constructor(
    canvas_id: string,
    width: number,
    height: number,
    bodies?: Drawable[],
  ) {
    const canvas: HTMLCanvasElement = document.getElementById(
      canvas_id,
    ) as HTMLCanvasElement;

    canvas.width = width;
    canvas.height = height;

    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = canvas;
    if (bodies) {
      this.bodies = bodies;
    }
  }

  resizeCanvas(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  draw(): void {
    this.bodies.forEach((body: Drawable) => {
      body.draw(this.ctx);
    });
  }
}

export { World };
