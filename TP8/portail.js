//pour garder le pseudo input
const pseudoForm = document.querySelector(".form");

/*le Problème venait d'un ? qui manquait à la value du sprite
je l'ai rajouté et j'en ai rajouté deux pour qu'il soit = à noskin si il n'y en
a aucun choisi, j'ai fait pareil avec le pseudo input (tu peux faire pareil avec le linkInput)

j'ai rajouté le queryselector pour ton link, t'as juste à ajouter le bon #id et enlever
les commentaires pour qu'il soit appelé dans le reste de la fonction

et j'ai mis le localstorage, normalement il fonctionne si tous les champs inclus
ne sont pas nulls
*/
pseudoForm.addEventListener("submit", function (event) {
  event.preventDefault(); //empeche rechargement de la page.
  const pseudoInput = document.getElementById("pseudo").value;
  const linkInput = document.querySelector("#backendlink").value;
  const sprite =
    document.querySelector('input[name="sprite"]:checked')?.value ?? "noskin";

  if (pseudoInput === "" || linkInput === "" || sprite === "noskin")
    alert("Remplissez tous les champs");
  else {
    const skinNumber = sprite.replace(/\D/g, "");
    console.log(pseudoInput, linkInput, `assets/${skinNumber}.png`);
    localStorage.setItem("username", pseudoInput);
    localStorage.setItem("link", linkInput);
    localStorage.setItem("skin", `assets/${skinNumber}.png`);
  }
  window.location.href = "game.html";
});

//pour charger mon sprite
const skinContainer = document.getElementById("skin-container");
let selectedCanvas = null;

for (let i = 1; i < 30; i++) {
  const div = document.createElement("div");

  const input = document.createElement("input");
  input.type = "radio";
  input.id = `input${i}`; //input numéro i
  input.name = "sprite";
  input.value = `input${i}`;

  const label = document.createElement("label");
  label.id = "label";
  label.htmlFor = `input${i}`; //relie contenu label au bouton

  div.appendChild(input);
  div.appendChild(label);

  document.querySelector("#skin-container").appendChild(div);

  //creation des canvas à chaque itération
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  canvas.classList.add("skin-canvas");

  const ctx = canvas.getContext("2d");

  //charger spritesheet
  const spritesheet = new Image();
  spritesheet.src = `assets/${i}.png`;

  spritesheet.onload = () => {
    console.log("feur");
    ctx.drawImage(
      spritesheet,

      //zone à cut dans la spritesheet
      0, // sourceX
      10 * 64, //recupere la 10eme image tous les 64 pixels
      64, // sourceWidth
      64, // sourceHeight

      //où il va l'afficher sur la page
      0, // destX
      0, // destY
      64, // destWidth
      64, // destHeight
    );
    label.appendChild(canvas);
  };
}
