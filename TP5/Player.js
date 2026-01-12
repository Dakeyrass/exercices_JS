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
		this.is_dead = false;
		this.is_attacking = false;
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

	printName(){
		console.log(this.name);
	}

	printLevel(){
		console.log(this.level);
	}

	printHP(){
		console.log(this.current_hp);
	}

	printCooldown(){
		console.log(this.current_cooldown);
	}
}
const player1 = new Player("Raymondo", "character-spritesheet.png",{x: 100, y: 50});
console.log(player1);
//player1.printName();
