import { Renderer } from './drawing';
import Game from './game/game';
import './style.css';

/**
 * What all are we going to need to build flappy bird?
 * - Going to need an object to be the bird
 * - Going to need an 'endless' list of pipes
 **/

const renderer: Renderer = new Renderer(
    'game-canvas',
    window.innerWidth,
    window.innerHeight
);

const game: Game = new Game(renderer);

game.start();
