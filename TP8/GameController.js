class GameController {
  constructor() {
    // Server sends updates at 20 ticks per second
    this.SERVER_TICK_RATE = 20;
    // Duration between two server ticks in milliseconds
    this.SERVER_INTERVAL = 1000 / this.SERVER_TICK_RATE;

    // Permanently bind "this" at the instance of the GameController class
    this.loop = this.loop.bind(this);

    // Regulates framerate to keep 60fps
    requestAnimationFrame(this.loop);

    this.game = new Game();
    this.name = localStorage.getItem("username");
    this.serverUrl = "ws://localhost:8000/ws";
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
    this.startInputSender();
  }

  // === Main render loop ===
  loop(timestamp) {
    //console.log(this.inputState);
    // Request the next frame
    requestAnimationFrame(this.loop);
  }

  initSocket() {
    this.socket.onopen = () => {
      console.log("Connected to server.");

      //send player identity to the server
      this.socket.send(
        JSON.stringify({
          name: this.name,
          skinPath: this.spritePath,
        }),
      );
    };

    this.socket.onmessage = (event) => {
      let msg = JSON.parse(event.data);
      this.game.update(msg);
      console.log(msg);
    };
  }

  initInput() {
    window.addEventListener("keydown", (event) => {
      switch (event.key) {
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
      switch (event.key) {
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
new GameController();
