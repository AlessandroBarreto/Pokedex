const getPokemonUrl = (id) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const generatePokemonPromises = () => {
  return Array(151)
    .fill()
    .map((_, index) =>
      fetch(getPokemonUrl(index + 1)).then((response) => response.json())
    );
};
function zeroFill(number, width) {
  width -= number.toString().length;
  if (width > 0) {
    return new Array(width + (/\./.test(number) ? 2 : 1)).join("0") + number;
  }
  return number + ""; // always return a string
}

const generateHTML = (pokemons) => {
  return pokemons.reduce((accumlator, { name, id, types, sprites }) => {
    const elementTypes = types.map((typeInfo) => typeInfo.type.name);
    //const pokemonSprites = sprites.front_default;

    accumlator += `
            <li class="card ${elementTypes[0]}">
                <img class="card-image" alt="${name}" src=" https://assets.pokemon.com/assets/cms2/img/pokedex/full/${zeroFill(
      id,
      3
    )}.png">
                <h2 class="card-title">${id}. ${name}</h2>
                <p class="card-subtitle">${elementTypes.join(" | ")}</p>
            </li>             
        `;
    return accumlator;
  }, "");
};

const insertPokemonsIntoPage = (pokemons) => {
  const ul = document.querySelector('[data-js="pokedex"]');
  ul.innerHTML = pokemons;
};

const pokemonPromises = generatePokemonPromises();

Promise.all(pokemonPromises) //static method (without new), return a promise
  .then(generateHTML)
  .then(insertPokemonsIntoPage);
