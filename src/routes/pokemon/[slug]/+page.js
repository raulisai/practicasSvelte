// @ts-nocheck
import { error } from '@sveltejs/kit';
import { getPokemonById } from "../../../stores/pokestore.js";
 
/** @type {import('./$types').PageLoad} */


const pokemonDetails = {};


export async function load({ fetch, params }) {
  let id = params.slug;
  if (pokemonDetails[id]) return pokemonDetails[id];
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
		const res = await fetch(url);
		const data = await res.json();
		console.log(data);
		pokemonDetails[id] = data;
		return data;
}