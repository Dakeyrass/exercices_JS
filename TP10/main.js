import Game from "./frontend/model/Game.js";
import GameView from "./frontend/view/GameView.js";
import GameController from "./frontend/controller/GameController.js";

//Model
const game = new Game();
//View
const gameView = new GameView(game);
//Controller (launch game);
console.log(game, gameView);
const gameController = new GameController(game, gameView);