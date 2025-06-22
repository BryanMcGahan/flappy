import { World } from './drawing';
import './style.css';

/**
 * What all are we going to need to build flappy bird?
 * - Going to need an object to be the bird
 * - Going to need an 'endless' list of pipes
 **/

const world: World = new World(
  'game-canvas',
  window.innerWidth,
  window.innerHeight,
);

world.draw();

window.addEventListener('resize', () => {
  world.resizeCanvas(window.innerWidth, window.innerHeight);
  world.draw();
});
