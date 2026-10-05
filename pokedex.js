async function buscarPokemon(nombre) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
    if (!respuesta.ok) {
        console.log("Status de la respuesta:", respuesta.status);
        return null;
    }
    else {
        const datos = await respuesta.json();
        return datos;
    }
}

async function seleccion() {
    const datosPokemon = await buscarPokemon("squirtle");
    
    if (datosPokemon !== null) {
        console.log("Nombre: " + datosPokemon.name);
        console.log("ID: " + datosPokemon.id);
    }
}

function mostrarFicha(datos) {
    if (!datos) {
        console.log("No existe el Pokemon.");
        return;
    }
    else {
        console.log("Nombre: " + datos.name.toUpperCase() + " - ID: " + datos.id);
        
        const tipos = Array.from(datos.types, t => t.type.name).join(" / ");
        console.log("Tipos: " + tipos);

        let altura = datos.height * 10; 
        let peso = datos.weight / 10;
        console.log(`Altura: ${altura} cm, Peso: ${peso} kg`);

        console.log("Estadísticas: ");
        for (const s of datos.stats) {
            console.log(s.stat.name + " - " + s.base_stat);
        }

        console.log("Habilidades: ");
        for (const a of datos.abilities) {
            if (a.is_hidden) {
                console.log(a.ability.name + " (oculta)");
            }
            else {
                console.log(a.ability.name);
            }
        }
    }
}

function obtenerStat(datos, nombreStat) {
    for (const s of datos.stats) {
        if (s.stat.name === nombreStat) {
            return s.base_stat;
        }
    }
    return null;
}

async function compararPokemon(nombre1, nombre2, stat) {
    console.log("COMPARACIÓN: ")
    const pokemon1 = await buscarPokemon(nombre1);
    const pokemon2 = await buscarPokemon(nombre2);
    
    if (pokemon1 === null || pokemon2 === null) {
    console.log("No se puede comparar porque uno o ambos Pokémon no existen.");
    return;
    }

    const stat1 = obtenerStat(pokemon1, stat);
    const stat2 = obtenerStat(pokemon2, stat);

    if (stat1 === null || stat2 === null) {
    console.log("La estadística no es válida. Solo se admiten: hp, attack, defense, special-attack, special-defense, speed.");
    return;
    }

    console.log(pokemon1.name + " : " + stat + " - " + stat1);
    console.log(pokemon2.name + " : " + stat + " - " + stat2);

    if (stat1 > stat2) {
    console.log("¡Gana: " + pokemon1.name + "!");
    }
    else if (stat2 > stat1) {
    console.log("¡Gana: " + pokemon2.name + "!");
    } 
    else {
    console.log("¡Es un empate!");
    }
}

async function pokemonMasFuerte(listaNombres, stat) {
    let mejorNombre = null;
    let mejorValor = -1;

    for (const nombre of listaNombres) {
        const datos = await buscarPokemon(nombre);
        if (datos === null) {
            continue;
        }

        const valorStat = obtenerStat(datos, stat);
        if (valorStat === null) {
            continue;
        }
        
        if (valorStat > mejorValor) {
      mejorValor = valorStat;
      mejorNombre = datos.name;
    }
  }

  console.log(`El pokemon ganador en "${stat}" es: ${mejorNombre} con ${mejorValor}.`);
  return mejorNombre
}

listaNombres = ["charmander", "squirtle", "nidoking", "eevee", "clefairy", "weedle"];
pokemonMasFuerte(listaNombres, "attack").then(async (ganador) => {
    const datosGanador = await buscarPokemon(ganador);
    mostrarFicha(datosGanador);
})

pokemonMasFuerte(listaNombres, "defense");




