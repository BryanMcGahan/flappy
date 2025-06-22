import { Circle, Rectangle, World } from './drawing';
import './style.css';

const cirlce: Circle = new Circle(
  10,
  10,
  '#000000',
  10,
  undefined,
  undefined,
  true,
);

const rectangle: Rectangle = new Rectangle(200, 200, '#000000', 200, 200);

const world: World = new World(
  'game-canvas',
  window.innerWidth,
  window.innerHeight,
  [cirlce, rectangle],
);

world.draw();

window.addEventListener('resize', () => {
  world.resizeCanvas(window.innerWidth, window.innerHeight);
  world.draw();
});
