interface Drawable {
  draw(ctx: CanvasRenderingContext2D): void;
}

abstract class Shape implements Drawable {
  public x: number;
  public y: number;
  public color: string;

  constructor(x: number, y: number, color: string) {
    this.x = x;
    this.y = y;
    this.color = color;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void;
}

class Circle extends Shape {
  public radius: number;
  public startAngle: number = 0;
  public endAngle: number = Math.PI * 2;
  public counterClockwise: boolean = false;
  constructor(
    x: number,
    y: number,
    color: string,
    radius: number,
    startAngle: number = 0,
    endAngle: number = Math.PI * 2,
    counterClockwise: boolean = false,
  ) {
    super(x, y, color);
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    this.counterClockwise = counterClockwise;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    console.log(
      'Drawing Circle: ',
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      this.counterClockwise,
    );
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      this.startAngle,
      this.endAngle,
      this.counterClockwise,
    );
    ctx.fill();
  }
}

class Rectangle extends Shape {
  public width: number;
  public height: number;

  constructor(
    x: number,
    y: number,
    color: string,
    width: number,
    height: number,
  ) {
    super(x, y, color);
    this.width = width;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export { type Drawable, Circle, Rectangle };
