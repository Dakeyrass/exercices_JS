//Partie 1 - genererEleves 
function genererEleves(){
	let taille_minimum = 7;
	let taille_maximum = 10;
	let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;
	//note maximale
	let note_maximum = 20;
	//liste de prenoms
	let prenoms = [ "Nicolas", "Bob", "Nathan", "Marine", "Maeva", "MOIMOIMOIMOI", "Lilou", "Toto", "Feur", "Thierry"];

	// Déclarer le tableau pour stocker les élèves
	let eleves = [];
	//on implémente chaque éleve jusqu'à ce qu'on soit à la fin du tableau
	for (let i=0; i<taille; i++){
	//objet eleve
	let eleve = {
		//on pioche un prénom aléatoirement dans la liste prédéfinie
		prenom : prenoms[Math.floor(Math.random() * prenoms.length)],
		//on attribue une note aléatoirement 
		noteFrancais: Math.floor(Math.random() * (note_maximum + 1)),
		noteMaths: Math.floor(Math.random() * (note_maximum + 1)),
		noteHistoire: Math.floor(Math.random() * (note_maximum + 1)), //on met à 21 au lieu de 20 pour qu'il s'arrête bien à 20 au lieu de 19
		//on définit la moyenne
		moyenne: 0,
	}
		eleve.moyenne = (eleve.noteMaths + eleve.noteMaths + eleve.noteHistoire) / 3;
		eleves.push(eleve);
	}
	return eleves; 
}

//Partie 2 – afficherEleves
function afficherEleves(tableau) {
	tableau.forEach((eleve) =>{
    console.log(eleve.prenom, eleve.moyenne);
});
}


//Partie 3 – trouverMoyenneMin
function trouverMoyenneMin(tableau, indexDepart){
	let minimum = tableau[indexDepart].moyenne;
	let indice = indexDepart;
	for (let i = indexDepart; i < tableau.length; i++) {
		if (minimum > tableau[i].moyenne) {
			minimum = tableau[i].moyenne;
			indice = i;
		}
	}
	console.log("L'élève ayant la plus basse moyenne à partir de", indexDepart, "est l'élève numéro", indice, "avec une moyenne de", minimum);
}
//trouverMoyenneMin(eleves, 0);

//Partie 4 - afficherDonnees 
function trouverMoyenneMax(tableau, indexDepart){
	let maximum = tableau[indexDepart].moyenne;
	let indice = indexDepart;
	for (let i = indexDepart; i < tableau.length; i++) {
		if (maximum < tableau[i].moyenne) {
			maximum = tableau[i].moyenne;
			indice = i;
		}
	}
	console.log("L'élève ayant la plus haute moyenne à partir de", indexDepart, "est l'élève numéro", indice, "avec une moyenne de", maximum);
}
//trouverMoyenneMax(eleves, 0);
function afficherNbrEleves(tableau){
	let total = 0;
	tableau.forEach((eleve, index) =>{
	total ++;
	})
	console.log("Il y a", total, "élèves.");
}
function afficherDonnees(tableau){
	afficherNbrEleves(tableau);
	trouverMoyenneMin(tableau, 0);
	trouverMoyenneMax(tableau, 0);
}


//Partie 5 - swap
//on log une copie du tableau sinon il montre les mêmes valeurs sans changements 
//console.log([...eleves]);
function swap(tableau, indexA, indexB){
	let temp = tableau[indexA];
	tableau[indexA] = tableau[indexB];
	tableau[indexB] = temp;
	console.log(tableau);
}
//swap(eleves, 2, 5);

//Partie 6 – triParSelection
function triParSelection(tableau){	
	for (let i = 0; i < tableau.length - 1; i++) {
		let indiceMin = i;

		for (let j = i + 1; j < tableau.length; j++) {
			if (tableau[j].moyenne < tableau[indiceMin].moyenne) {
				indiceMin = j;
			}
		}

		if (indiceMin !== i) {
			let temp = tableau[i];
			tableau[i] = tableau[indiceMin];
			tableau[indiceMin] = temp;
		}
	}
	console.log(tableau);
}

//NE FONCTIONNE PAS 
function triParSelection1(tableau){
	console.log("je rentre dans mon tri par selec");
	console.log(tableau);	
	for (let i = 1; i < tableau.length - 1; i++) {
		let indiceMin = trouverMoyenneMin(tableau, i+1);
		if (indiceMin !== i) {
			console.log(eleves);
			swap(tableau, i, indiceMin);
		}
	}
	console.log(tableau);
}


//Partie 7 - Appel des fonctions 
eleves = genererEleves();

afficherEleves(eleves);
afficherDonnees(eleves);
//triParSelection(eleves);
