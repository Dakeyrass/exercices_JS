//////////////////////// Code fourni (ne pas moidifier) ////////////////////////

// Définir la taille du tableau de notes au hasard entre 15 et 30 éléments
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;

// Déclarer le tableau pour stocker les notes
let notes = [];
// Définir la note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
let note_maximum = 20;

// Itérer autant de fois qu'on a de notes aléatoires à générer
for (let i = 0; i < taille; i++) {
    // Générer une note aléatoire entre 0 et note_maximum (inclus)
    let note = Math.floor(Math.random() * (note_maximum + 1));
    // Ajouter la note générée au tableau
    notes.push(note);
}

///////////////////////////////////////////////////////////////////////////////

//Partie 1 – Etude des valeurs
let minimum = notes[0];
for(let i=0; i<notes.length; i++){
	if(notes[i] < minimum){
		minimum = notes[i];
	}
}
let maximum = notes[0];
for(let i=0; i<notes.length; i++){
	if(notes[i] > maximum){
		maximum = notes[i];
	}
}
console.log("La taille est de", taille);
console.log("Le minimum est de", minimum);
console.log("Le maximum est de", maximum);
console.log(notes);

//Partie 2 - Première étape du tri 
minimum = notes[0];
let min = 0;
for(let i=0; i<notes.length; i++){
	if(notes[i] < minimum){
		minimum = notes[i];
		min = i;
	}
}
console.log("Le minimum est de", minimum,"et son indice est de", min);

//Partie 3 - Échange de valeurs
/*let stock = notes[0];
notes[0] = minimum;
notes[min] = stock;
console.log(notes);

//Partie 4 – Tri par sélection complet
for(let j=0; j<notes.length; j++){
	//on réinitialise les valeurs
	stock = notes[j];
	minimum = notes[j];
	min = j;
	for(let i=j; i<notes.length; i++){
		if(notes[i] < minimum){
			minimum = notes[i];
			min = i;
		}
		
	}
	//on échange la valeur minimum à l'indice min avec la valeur notes[j] à l'indice j
	notes[j] = minimum;
	notes[min] = stock;
	
}
console.log(notes);

//Partie 5 - Affichage du résultat
console.log("tableau avant tri:", notes);
for(let j=0; j<notes.length; j++){
	//on réinitialise les valeurs
	stock = notes[j];
	minimum = notes[j];
	min = j;
	//on parcourt le tableau une seconde fois en même temps
	for(let i=j; i<notes.length; i++){
		if(notes[i] < minimum){
			minimum = notes[i];
			min = i;
		}
	}
	//on échange la valeur minimum à l'indice min avec la valeur notes[j] à l'indice j
	notes[j] = minimum;
	notes[min] = stock;
	
}
console.log("tableau après tri:", notes);

//Partie 6 - Bonus 
for(let j=0; j<notes.length; j++){
	//on réinitialise les valeurs
	stock = notes[j];
	minimum = notes[j];
	min = j;
	//on parcourt le tableau une seconde fois en même temps
	for(let i=j; i<notes.length; i++){
		if(notes[i] < minimum){
			minimum = notes[i];
			min = i;
			console.log("Tableau lors de l'échange", j+1, notes);
		}
	}
	//on échange la valeur minimum à l'indice min avec la valeur notes[j] à l'indice j
	notes[j] = minimum;
	notes[min] = stock;
}

//Partie 7
let echange = 0;
let verification = 0;
for(let j=0; j<notes.length; j++){
	//on réinitialise les valeurs
	stock = notes[j];
	minimum = notes[j];
	min = j;
	//on parcourt le tableau une seconde fois en même temps
	for(let i=j; i<notes.length; i++){
		if(notes[i] < minimum){
			minimum = notes[i];
			min = i;
			echange ++;
			console.log("Tableau lors de l'échange", notes);
		}
		verification ++;
	}
	//on échange la valeur minimum à l'indice min avec la valeur notes[j] à l'indice j
	notes[j] = minimum;
	notes[min] = stock;
}
console.log("Nombre d'échanges:", echange);
console.log("Nombre de vérifications:", verification);*/

//Partie 8
for(let j=0; j<notes.length; j++){
	//on réinitialise les valeurs
	stock = notes[j];
	maximum = notes[j];
	min = j;
	//on parcourt le tableau une seconde fois en même temps
	for(let i=j; i<notes.length; i++){
		if(notes[i] > maximum){
			maximum = notes[i];
			min = i;
			echange ++;
		}
	}
	//on échange la valeur minimum à l'indice min avec la valeur notes[j] à l'indice j
	notes[j] = minimum;
	notes[min] = stock;
	console.log("Tableau lors de l'échange", j+1, notes);
}