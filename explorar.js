async function obtenerPokemon() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  console.log("Status de la respuesta:", respuesta.status);
  const datos = await respuesta.json();
  console.log(datos);

  for (const t of datos.types) {
    console.log("Tipos: " +t.type.name);
  }
  
  for (const s of datos.stats) {
    console.log("Estadisticas: " + s.stat.name + s.base_stat);
  }
  
  for (const a of datos.abilities) {
    console.log("Habilidades: " + a.ability.name);
  }
}







