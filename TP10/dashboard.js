let serverBaseUrl = null;

const serverInput = document.getElementById("serverAddress");
const connectBtn = document.getElementById("connectBtn");

connectBtn.addEventListener("click", (event) => {
	event.preventDefault();
  	const value = serverInput.value;
	serverBaseUrl = value;
 	console.log("Serveur défini :", serverBaseUrl);
});

async function loadPlayers(){
    try{
        //requete http vers api pour recup données joueurs
        const response = await fetch(serverBaseUrl);
        if (!response.ok){
            throw new Error("Erreur HTTP");
        }
        //extraction json de la réponse
        const data = await response.json();
        return data;

		//console.log("Nom:", data[1].name);
		//console.log("Total kills", data[1].totalDeaths);
	} catch (error){
		console.error("erreur lors de jsp",serverBaseUrl,  error);
	}
}

async function loadPlayerStats(name){
	try {
		const players = await loadPlayers();
		const player = players.find(p => p.name === name);
		if(!player){
			throw new Error ("En fait non");
		}
		console.log("Nom:", player.name);
		console.log("Parties jouées:", player.gamesPlayed);
		console.log("Nbr de kills:", player.totalKills);
		console.log("Nbr de morts:", player.totalDeaths);
		console.log("Ratio:", player.kdRatio);
		return player;
	} catch (error){
		console.error("La errora del error");
	}
}

async function loadRanking(){
	try {
		const players = await loadPlayers();
		
		for (let i=0; i < players.length; i++){
			console.log("Nom:", players[i].name);
			console.log("Parties jouées:", players[i].gamesPlayed);
			console.log("Nbr de kills:", players[i].totalKills);
			console.log("Nbr de morts:", players[i].totalDeaths);
			console.log("Ratio:", players[i].kdRatio);
		}
	} catch (error){
		console.error("Erreur");
	}
}

loadPlayers();
//loadRanking();
//loadPlayerStats("samy_ritleku");

