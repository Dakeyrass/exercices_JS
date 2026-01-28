class GameView {
  constructor(game) {
    this.game = game;
    this.canvas = document.getElementById("canvas-feur");
    this.canvas.width = 800;
    this.canvas.height = 800;
    this.ctx = this.canvas.getContext("2d"); //permet de dessiner en 2d

    //PART 3
    this.spritePath = localStorage.getItem("skin");
    this.sprite = new Image();
    this.sprite.src = this.spritePath;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
  drawBackground() {
    this.ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
  render() {
    this.clear();
    this.drawBackground();
    for (const id in this.game.players) {
      this.drawPlayer(this.game.players[id]);
    }
    this.drawTimer();
    this.PlayerNumber()
  }
  drawPlayer(player) {
    const x = player.finalX * this.canvas.width;
    const y = player.finalY * this.canvas.height;
    let size = 64;
    let milieuX = 64;
    let milieuY = 64;
    //console.log(player.direction);
    if (player.isDead) return;
    player.animate();

    let line = { 
      0: 8, //if direction === 0, line === 8
      1: 11,
      2: 10,
      3: 9
    }[player.direction];
    let colonne = 0;
    let ligne_sprite = line * size;

    if (player.isDying) {
      ligne_sprite = 1280;
      colonne = player.deathSpriteIndex;
    } else if (player.isAttacking) {
      if(player.direction === 0){
        ligne_sprite = 3456;
      } else if (player.direction === 1){
        ligne_sprite = 4032;
      } else if (player.direction === 2){
        ligne_sprite = 3840;
      } else {
        ligne_sprite = 3648;
      }
      milieuX = 192;
      milieuY = 192;
      size = 192;
      colonne = player.attackSpriteIndex;
    } else if (player.isWalking){
      colonne = player.walkSpriteIndex;
    }
    this.ctx.drawImage(
      this.sprite,
      colonne * size, // colonne
      ligne_sprite, //recupere la 10eme image tous les 64 pixels
      size, // sourceWidth
      size, // sourceHeight

      //oÃ¹ il va l'afficher sur la page
      x - milieuX / 2, // destX
      y - milieuY / 2, // destY
      size, // destWidth
      size, // destHeight
    );
    this.drawPlayerHUD(player);
  }

  drawPlayerHUD(player){
    const size = 64;
    const x = player.finalX * this.canvas.width;
    const y = player.finalY * this.canvas.height;
    const textX = x + size / 2 - 30; //le - sert à décaler sur la gauche
    const textY = y - 45; //décale vers le haut
    
    //pseudo
    this.ctx.fillStyle = "#ffffff";
    this.ctx.font = "15px 'Arial'";
    this.ctx.textAlign = "center";
    this.ctx.strokeText(`${player.name} | ${player.lvl}`,textX, textY);
    
    //hp
    const barWidth = 70;
    const barHeight = 6;
    const offsetY = 40;
    const centerX = x + size / 2 - 30;
    const barX = centerX - barWidth / 2;
    const barY = y - offsetY;
    const hpRatio = player.hp / player.maxHp;
    this.ctx.fillStyle = "red"; // fond
    this.ctx.fillRect(barX, barY, barWidth, barHeight);
    this.ctx.fillStyle = "green"; // vie au dessus
    this.ctx.fillRect(barX, barY, barWidth * hpRatio, barHeight);

    //cooldown atk 
    let width = 65;
    let height = 4;
    const offsetY1 = 32;
    let ratio = 1 - player.currentAttackCooldown / player.attackCooldown;

    this.ctx.fillStyle = "#000";
    this.ctx.fillRect(x - width / 2, y - offsetY1, width, height);
    this.ctx.fillStyle = "#1e4cff";
    this.ctx.fillRect(x - width / 2, y - offsetY1, width * ratio, height);
  }

  drawTimer() {
    const timer = Math.floor(this.game.timer); // arrondi propre

    this.ctx.font = "20px 'Arial'";

    this.ctx.fillStyle = "#fff";
    this.ctx.strokeStyle = "#000";

    const text = `TIME: ${timer}s`;

    this.ctx.strokeText(text, this.canvas.width / 2, 25);
    this.ctx.fillText(text, this.canvas.width / 2, 25);
  }

  PlayerNumber(){
    let alive = 0;
    let total = 0;
    for (let id in this.game.players) {
      total++;
      const p = this.game.players[id];
      if (!p.isDead && p.hp > 0) alive++;
    }
    let text = `Players: ${alive}/${total}`;
    this.ctx.strokeText(text, 55, 25);
    this.ctx.fillText(text, 55, 25);
  }
  
}