const pokemonImg = document.getElementById('pokemon');
const guessInput = document.getElementById('guess');
const guessButton = document.getElementById('guess-button');
const feedback = document.getElementById('feedback');
const newPokemonButton = document.getElementById('new-pokemon');

let currentPokemonName = '';

async function fetchPokemon() {
    const id = Math.floor(Math.random() * 151) + 1; // IDs de 1 a 151
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        currentPokemonName = data.name.toLowerCase();

        const imageUrl = data.sprites.other['official-artwork'].front_default
            || data.sprites.front_default;

        pokemonImg.src = imageUrl;
        pokemonImg.style.filter = 'brightness(0)'; // ocultar detalles
        feedback.textContent = '';
        guessInput.value = '';
    } catch (error) {
        console.error('Error al obtener el Pokémon:', error);
    }
}

guessButton.addEventListener('click', () => {
    const userGuess = guessInput.value.toLowerCase().trim();
    if (userGuess === currentPokemonName) {
        feedback.textContent = '¡Correcto! 🎉';
        feedback.style.color = 'green';
        pokemonImg.style.filter = 'brightness(1)';
    } else {
        feedback.textContent = '¡Incorrecto! Intenta de nuevo.';
        feedback.style.color = 'red';
    }
});

newPokemonButton.addEventListener('click', fetchPokemon);

// Cargar un Pokémon al inicio
fetchPokemon();
