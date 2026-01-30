import Game from "../model/Game.js";
import GameView from "../view/GameView.js";

export default class GameController {
  constructor(game, view) {
    this.game = game;
    this.view = view;
    this.name = localStorage.getItem("username");
    this.serverUrl = localStorage.getItem("link");
    this.spritePath = localStorage.getItem("skin");
    this.inputState = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
    };
    this.socket = new WebSocket(this.serverUrl);
    this.initInput();
    this.initSocket();
    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    this.lastServerUpdate = performance.now();

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);
  }

  // === Main render loop ===
  loop(timestamp) {
    //console.log(this.inputState);
    // Request the next frame
    const alpha = Math.min(
      (timestamp - this.lastServerUpdate) / this.SERVER_INTERVAL,
      1,
    );
    console.log(alpha);
    for (const id in this.game.players) {
      this.game.players[id].interpolate(alpha);
    }
    requestAnimationFrame(this.loop);
    this.view.render();
  }

  initSocket() {
    this.socket.onopen = () => {
      //console.log("Connected to server.");

      //send player identity to the server
      this.socket.send(
        JSON.stringify({
          name: this.name,
          skinPath: this.spritePath,
        }),
      );
      this.startInputSender();
    };

    this.socket.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      //console.log("mssg reÃ§u");

      this.game.update(msg);
      this.lastServerUpdate = performance.now();
    };
  }

  initInput() {
    window.addEventListener("keydown", (event) => {
      switch (event.key.toLowerCase()) {
        case "z":
          this.inputState.up = true;
          break;
        case "s":
          this.inputState.down = true;
          break;
        case "q":
          this.inputState.left = true;
          break;
        case "d":
          this.inputState.right = true;
          break;
        case "e":
          this.inputState.attack = true;
          break;
      }
    });

    window.addEventListener("keyup", (event) => {
      switch (event.key.toLowerCase()) {
        case "z":
          this.inputState.up = false;
          break;
        case "s":
          this.inputState.down = false;
          break;
        case "q":
          this.inputState.left = false;
          break;
        case "d":
          this.inputState.right = false;
          break;
        case "e":
          this.inputState.attack = false;
          break;
      }
    });
  }

  startInputSender() {
    setInterval(() => {
      if (this.socket.readyState === WebSocket.OPEN) {
        //verify the current connection state
        this.socket.send(
          JSON.stringify({
            //converti en json pour le send au backend
            type: "input",
            input: this.inputState,
          }),
        );
      }
    }, this.SERVER_INTERVAL); //il doit se lancer tous les SERVER_INTERVAL
  }
}

// === Start the game controller by instantiating the GameController class ===
// This line will execute the constructor (e.g, launch the frontend)
