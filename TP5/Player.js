//Partie 1 – Implémentation des attributs de la classe Player
class Player {
	constructor( name,sprite, position = {x:0, y:0}){
		this.level = 1;
		this.xp = 0;
		this.name = name;
		this.total_hp = 100;
		this.current_hp = 100; //points de vie actuels
		this.regen_hp = 10;
		this.total_cooldown = 2;
		this.current_cooldown = 2; //cooldown down actuel
		this.speed = 10;
		this.degats = 0;
		this.sprite = sprite;
		this.position = position;

		//conditions/bool pour les déplacements, atk...
		this.is_moving = false;
		this.is_dying = false;
		this.is_attacking = false;

		this.walkSpriteDuration = 2;
		this.walkSpriteIndex = 0;
		this.walkSpriteNumber = 9;
		this.currentWalkSpriteStep = 0;
		this.attackSpriteDuration = 2;
		this.attackSpriteIndex = 0;
		this.attackSpriteNumber = 9;
		this.currentAttackSpriteStep = 0;
		this.deathSpriteDuration = 2;
		this.deathSpriteIndex = 0;
		this.deathSpriteNumber = 9;
		this.currentDeathSpriteStep = 0;
		
	}

	update(serverPlayer) { //on récupère la copie du joueur générée par le backend avec les stats actuels et on met notre vrai player à jour
		this.level = serverPlayer.level;
		this.total_hp = serverPlayer.total_hp; //va monter avec le niveau
		this.current_hp = serverPlayer.current_hp;
		this.regen_hp = serverPlayer.regen_hp;
		this.total_cooldown = serverPlayer.total_cooldown;
		this.current_cooldown = serverPlayer.current_cooldown;
		this.speed = serverPlayer.speed;
		this.degats = serverPlayer.degats;
		this.position = { ...serverPlayer.position };
	}

	animate(){
		if(this.is_moving){
			this.currentWalkSpriteStep++; //on incrémente notre compteur de pas
			if(this.currentWalkSpriteStep >= this.walkSpriteDuration){ //on divise le nombre de frame par 2 (vu que duration = 0)
				this.currentWalkSpriteStep = 0;
				this.walkSpriteIndex++;
			}
			if (this.walkSpriteIndex >= this.walkSpriteNumber){
				this.walkSpriteIndex = 0; //on boucle l'animation pour pas que le nb de frame dépasse le nombre de frame d'animations dispo
			}
		}
		//the player is attacking
		else if(this.is_attacking) {
			this.currentAttackSpriteStep++; 
			if(this.currentAttackSpriteStep >= this.attackSpriteDuration){
				this.currentAttackSpriteStep = 0;
				this.attackSpriteIndex++;
			}
			if (this.attackSpriteIndex >= this.attackSpriteNumber){
				this.attackSpriteIndex = 0;
				this.is_attacking = false; //repasse à false donc arrête la condition
			}
		} 
		//the player is dying
		else if(this.is_dying) {
			this.currentDeathSpriteStep++; 
			if(this.currentDeathSpriteStep >= this.deathSpriteDuration){
				this.currentDeathSpriteStep = 0;
			}
			if (this.deathSpriteIndex >= this.deathSpriteNumber){
				this.deathSpriteIndex++;
			}
		} 
		//idle player
		else {
			this.walkSpriteIndex = 0;
		}
		console.log("Walk Animation :\n");
		console.log("is_moving = ", this.is_moving);
		console.log("WalkSpritIndex = ", this.walkSpriteIndex, "/", this.walkSpriteNumber);
		console.log("this.currentWalkSpiritStep = ", this.currentWalkSpriteStep, "/", this.walkSpriteDuration);
		console.log("Walk Animation :\n");
		console.log("is_attacking = ", this.is_attacking);
		console.log("attackSpriteIndex = ", this.attackSpriteIndex, "/", this.attackSpriteNumber);
		console.log("this.currentattackSpiritStep = ", this.currentAttackSpriteStep, "/", this.attackSpriteDuration);
	}
	

}
const player1 = new Player("Raymondo", "character-spritesheet.png",{x: 100, y: 50});
player1.is_moving = true;

for (let i = 0; i  < 50; i++){
	if(i > 20){
		player1.is_attacking = true;
	}
	player1.animate();
}


