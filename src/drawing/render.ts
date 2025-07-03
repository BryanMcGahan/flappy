/**
 * Represents the game object
 **/
class Renderer {
  private canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public width: number;
  public height: number;

  /**
   * params {string} canvas_id - The id of canvas element to be used for the game
   * params {number} width - The width of the canvas for the game
   * params {number} height - The height of the canvas for the game
   **/
  constructor(canvas_id: string, width: number, height: number) {
    const canvas: HTMLCanvasElement = document.getElementById(
      canvas_id,
    ) as HTMLCanvasElement;

    canvas.width = width;
    canvas.height = height;

    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    this.canvas = canvas;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  resizeCanvas(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.width = width;
    this.height = height;
  }

  public clearScreen() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}

export { Renderer };
