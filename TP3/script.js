//PARTIE 1 - Génération des élèves 
//taille du tableau d'élèves aléatoire
let taille_minimum = 7;
let taille_maximum = 10;
let taille = Math.floor(Math.random() * (taille_maximum - taille_minimum + 1)) + taille_minimum;
//note maximale (pas besoin de définir la note minimale car elle est 0 par défaut)
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
		noteHistoire: Math.floor(Math.random() * (note_maximum + 1)),
		//on définit la moyenne
		moyenne: 0,
	}
	eleve.moyenne = (eleve.noteMaths + eleve.noteMaths + eleve.noteHistoire) / 3;
	eleves.push(eleve);
}
console.log(eleves);


//récupération de la moyenne de chaque eleve avec leur prénom associé
eleves.forEach((eleve, index) => {
	console.log(eleves[index].prenom, eleves[index].moyenne);
});

//Partie 2
//récupérer le nombre total d'eleves
let total_eleves = 0;
eleves.forEach((eleve) => {
	total_eleves ++;
})
console.log("Le nombre total d'élèves est de:", total_eleves);
 
//récupérer la plus grande et la plus petite moyenne 
let minimum = eleves[0].moyenne;
let maximum = eleves[0].moyenne;

for (let i = 0; i < eleves.length; i++) {
    if (minimum > eleves[i].moyenne) {
        minimum = eleves[i].moyenne;
    }
	if (maximum < eleves[i].moyenne) {
       	maximum = eleves[i].moyenne;
    }
}
console.log(minimum);
console.log(maximum);