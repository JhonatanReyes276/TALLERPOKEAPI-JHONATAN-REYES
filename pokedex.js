async function buscarPokemon(nombre) {
    const respuesta = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre.toLowerCase()}`);
    console.log("Status de la respuesta:", respuesta.status);
    if (!respuesta.ok) {
        return null;
    }
    else {
        const datos = await respuesta.json();
        console.log(datos);
        
        if (datos !== null) {
        console.log("Nombre: " + datos.name); 
        console.log("ID: " + datos.id); 
        }
    }
}

buscarPokemon("charmander");

