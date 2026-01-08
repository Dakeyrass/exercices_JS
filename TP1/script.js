//partie 1 +
const class_name = "pablito";
let number = 5;
let open = true;
console.log(class_name);
console.log(number);
console.log(open);

//partie 2 +
let eleve0 = {
	name: "Eglantine",
	maths: 2,
	french: 14,
}
console.log(eleve0.name);

//partie 3
let eleves = [
	{name: "Thierry",maths: 18,french: 12},
	{name: "Vee", maths: 15, french: 19},
	{name: "Feur", maths: 0, french:19}
];
for(let i=0;i<eleves.length;i++){
	console.log(eleves[i].name);
}

//partie 4
eleves.forEach((caca) => {
	console.log((caca.maths + caca.french) / 2);
});

//partie 5
eleves.forEach((caca) => {
	console.log(caca.name, "est...");
	moyenne = (caca.maths + caca.french) / 2;
	if (moyenne >= 10){
		console.log("admis");
	} else {
		console.log("refusé");
	}
});

//partie 6
eleves.forEach((caca) => {
	console.log("La moyenne de", caca.name, "est...");
	moyenne = (caca.maths + caca.french) / 2;
	if (moyenne >= 10){
		console.log("passable");
	} else if(moyenne >= 12){
		console.log("assez bien");
	} else if(moyenne >= 14){
		console.log("bien");
	} else if(moyenne >= 16){
		console.log("bien");
	} else {
		console.log("insuffisante");
	}
});

//partie 7