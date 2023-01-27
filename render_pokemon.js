const d = document;

export default async function renderPokemon(url, $template, checkClr) {
    try {
        let res = await fetch(url);
        let pokemon = await res.json();
        //console.log(pokemon)
        if(!res.ok) throw {status: res.status, statusText: res.statusText};
        
        let tipos = "";
        pokemon.types.forEach(el => {
            let clrType = checkClr(el.type.name)
          tipos += `<div style="background: ${clrType}" class="type">${el.type.name[0].toUpperCase()}${el.type.name.slice(1)}</div>`
        });
        
        let clrFigure = checkClr(pokemon.types[0].type.name)
        let id = pokemon.id.toString().padStart(4,0);

        let stats = ""
        let statName;
        pokemon.stats.forEach(stat => {
            switch (stat.stat.name) {
                case "hp":
                    statName = "HP"
                    break;
                case "attack":
                    statName = "ATK"
                    break;
                case "defense":
                    statName = "DEF"
                    break;
                case "special-attack":
                    statName = "SP-ATK"
                    break;
                case "special-defense":
                    statName = "SP-DEF"
                    break;
                case "speed":
                    statName = "SPD"
                    break;                
                default:
                    break;
            }
            stats += `<li class="li">${statName}: <div class="status-bar"><div class="progress-bar" style="width:${stat.base_stat}%">${stat.base_stat}</div></div></li>`
        })

        $template +=  `
        <figure id="${pokemon.id}" class="figure" style="background: ${clrFigure};">
            <img class="imgFront imgOpen" src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <figcaption class="figcaption">
                <div class="frontCap frontCapOpen">
                    <p class="code codeOpen">#${id}</p>
                    <h2 class="nombre nombreOpen">${pokemon.name[0].toUpperCase()}${pokemon.name.slice(1)}</h2>
                    <div class="btns btnsOpen">
                        ${tipos}
                    </div>
                </div>
                <div class="backCap backCapOpen">
                    <ul>   
                        ${stats}
                    </ul>
                </div>
            </figcaption>
        </figure>
        `;

    } catch (err) {
        let msg = err.statusText || "El nombre ingresado no es válido";
        $template += `
            <figure>
                <figcaption>Error ${err.status}: ${msg}</figcaption>
            </figure>
            `;
    }
    return $template;
}