import renderPokemon from "./render_pokemon.js";
import checkClr from "./check_color.js";

////////////////////////////////////////VARIABLES Y CONSTANTES////////////////////////////////////////
const d = document,
$input = d.getElementById("filter-text"),
$main = d.querySelector(".main");

let API = "https://pokeapi.co/api/v2/pokemon/";
let $template = "";
let limit;
let objetivo;

///////////////////////////////////////DECLARACION DE FUNCIONES///////////////////////////////////////
async function getPokemons(url) {
  try {
    let res = await fetch(url);
    let json = await res.json();
    limit = await json.count;
    
    API = await json.next;

    if(!res.ok) throw {status: res.status, statusText: res.statusText};
    
    for(let i = 0; i<json.results.length; i++){
      $template = await renderPokemon(json.results[i].url, $template, checkClr);
    }
    
    $main.innerHTML = $template;
    
  } catch (err) {
    let msg = err.statusText || "Ocurrio un error script";
    $main.innerHTML = `<p>Error ${err.status}: ${msg}</p>`;
  }
  
  //codigo para el observer
  const loadedPokemon = d.querySelectorAll(".figure");
  if(loadedPokemon.length < limit){
    objetivo = loadedPokemon[loadedPokemon.length - 1]
    observer.observe(objetivo)
  }
}
 
let observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      getPokemons(API); 
    }
  })
}, {
  rootMargin: "0px 0px 200px 0px",
  threshold: .5
});


async function filtrar() {
  let url = `https://pokeapi.co/api/v2/pokemon/${$input.value.toLowerCase()}`;
  $template = "";
  $main.innerHTML = await renderPokemon(url, $template, checkClr);
}

const isCard = (el) => {
  if (el.classList.contains("figure")) return el;
  return isCard(el.parentNode);
}


const toggleCard= (id) => {
  const $figcaption = d.getElementById(id).lastElementChild;
  const $frontCap= $figcaption.firstElementChild;
  const $backCap= $figcaption.lastElementChild;

  const $imgFront = d.getElementById(id).firstElementChild;
  
  const $id = $frontCap.firstElementChild;
  const $nombre = $id.nextElementSibling;
  const $types = $frontCap.lastElementChild;

  $figcaption.classList.toggle("figcaptionOpen");
  $imgFront.classList.toggle("imgOpen")
  $backCap.classList.toggle("backCapOpen")
  $frontCap.classList.toggle("frontCapOpen")
  $types.classList.toggle("btnsOpen")
  $id.classList.toggle("codeOpen")
  $nombre.classList.toggle("nombreOpen")
}



////////////////////////////////////////////EVENTOS DEL DOM///////////////////////////////////////////
d.addEventListener("DOMContentLoaded", e =>  getPokemons(API));

d.addEventListener("keyup", e => {
  if((e.key === "Enter") && (d.activeElement === $input)) filtrar();
  
  if((e.key === "Escape") || ($input.value === "")){
    $input.value = "";
    $template = "";
    API = "https://pokeapi.co/api/v2/pokemon/";
    getPokemons(API);
  }  
})

let card;
let oldCard;

d.addEventListener("click", e => {
  if(e.target.matches("#btn-load")) getPokemons(API);

  if((e.target.matches("#filter-submit")) && $input.value !== "") filtrar();

  if(e.target.matches(".figure") || (e.target.matches(".figure *"))){
    oldCard = card;
    card = isCard(e.target);
    
    let id = card.id;
    
    if(card !== oldCard){
      if((oldCard) && oldCard.classList.contains("isOpen")){
        let oldId = oldCard.id;
        toggleCard(oldId)
        oldCard.classList.remove("isOpen");
        toggleCard(id)
        card.classList.add("isOpen");
      }else{
        toggleCard(id)
        card.classList.add("isOpen");
      }
    }else if(card.classList.contains("isOpen")){
      toggleCard(id)
      card.classList.remove("isOpen");
    }else{
      toggleCard(id)
      card.classList.add("isOpen");
    }
  } 
})