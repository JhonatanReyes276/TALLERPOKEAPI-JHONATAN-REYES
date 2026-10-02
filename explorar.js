async function obtenerPokemon() {
  const respuesta = await fetch("https://pokeapi.co/api/v2/pokemon/pikachu");
  const datos = await respuesta.json();
  console.log(datos);

  for (const t of datos.types) {
    console.log("Tipos: " +t.type.name);
  }


console.log("Estadisticas: ");
for (const s of datos.stats) {
    console.log(s.stat.name + s.base_stat);
}

console.log("Habilidades: ");
for (const a of datos.abilities) {
    console.log(a.ability.name);
}

obtenerPokemon();



