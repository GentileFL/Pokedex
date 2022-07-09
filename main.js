
const getPokemonUrl = (id, id2) => `https://pokeapi.co/api/v2/pokemon/${id}`;

const fetchPokemon = () => {
    const pokemonPromisses = [];

    for (let i = 1; i <= 151; i++) {
        pokemonPromisses.push(
            fetch(getPokemonUrl(i,)).then((response) => response.json())
        );
    }

    Promise.all(pokemonPromisses).then((pokemons) => {
        const listPokemons = pokemons.reduce((accumulator, pokemon) => {
            const types = pokemon.types.map((typeInfo) => typeInfo.type.name)
            //<img class= "card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_00${pokemon.id}_00.png">//
            
            let id2 = pokemon.id;
            if (id2 <= 9) {
                id2 = (`00${pokemon.id}`);
            } else if (id2 <= 99) {
                id2 = (`0${pokemon.id}`);
            } else {
                id2 = (`${pokemon.id}`);
            }
            
            accumulator += `
                            <li class= "card ${types[0]}">
                            <img class= "card-image" alt="${pokemon.name}" src="https://raw.githubusercontent.com/ZeChrales/PogoAssets/master/pokemon_icons/pokemon_icon_${id2}_00.png">
                            <h2 class= "card-title">${id2}. ${pokemon.name}</h2>
                            <p class = "card-subtitle">${types.join(" | ")}</p>
                            </li>`;
            return accumulator;


        },
            "");

        const ul = document.querySelector('[data="pokedex"]');
        ul.innerHTML = listPokemons;

    });
};

fetchPokemon();

