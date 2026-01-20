class Game {
  constructor() {
    this.isRunning = false;
    this.isOver = false;
    this.timer = 100;
    this.players = {};
  }

  update(gameStateFromServer) {
    this.isRunning = gameStateFromServer.isRunning;
    this.isOver = gameStateFromServer.isOver;
    this.timer = gameStateFromServer.timer;

    for (const id in gameStateFromServer.players) {
      //dans le serveur: on entre dans la liste de players serveur
      const data = gameStateFromServer.players[id]; //on cherche un player en particulier
      //data = tiroir global

      //joueur existe pas
      if (!this.players[id]) {
        //If id == null
        this.players[id] = new Player(
          id,
          data.name,
          data.skinPath,
          data.position,
        );
      } else {
        //joueur existe
        this.players[id].update(data);
      }

      //joueur existe que dans le front, plus dans le back
      for (const id in this.players) {
        //on cherche dans le local
        if (!gameStateFromServer.players[id]) {
          delete this.players[id];
        } else {
          //si il existe dans les deux
          this.players[id].update(data);
        }
      }
    }
  }
}
