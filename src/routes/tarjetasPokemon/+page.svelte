<script>
// @ts-nocheck

import PokemanCard from "./components/pokemanCard.svelte";
import {pokemon, fetchPokemon} from "../../stores/pokestore.js";


let searchTerm = "";
let filteredPokemon = [];

$: {
    if(searchTerm){
        filteredPokemon = $pokemon.filter( pokeman => pokeman.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    else {
        filteredPokemon = [...$pokemon];
    }
}
fetchPokemon();
</script>


<svelte:head>
	<title>Pokedex</title>
	<meta name="description" content="A Wordle clone written in SvelteKit" />
</svelte:head>


<h3>tarjetas Pokemon</h3>
<h1 class="text-4xl text-center my-8 uppercase">SvelteKit Pokedex</h1>
<input class="w-full rounded-md text-lg p-4 border-2 border-gray-200" bind:value={searchTerm} placeholder="Search Pokemon">
<div class="py-4 grid gap-4 md:grid-cols-2 grid-cols-1">
    
    {#each filteredPokemon as pokeman}
            <PokemanCard pokeman={pokeman}/>
    {/each}
</div>