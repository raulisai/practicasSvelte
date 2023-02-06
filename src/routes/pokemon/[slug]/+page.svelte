<script>
    /** @type {import('./$types').PageData} */
    export let data;

    let pokeman = data;
    const type = pokeman.types[0].type.name;
  </script>
  
  <svelte:head>
	<title>Pokedex - {pokeman.name}</title>
</svelte:head>

<div class="flex flex-col items-center">

  
    
</div>

<div class="card" style="width: 18rem;">
    <img class="card-img-top" src={pokeman.sprites['front_default']} 
    alt={pokeman.name}
    />
    <div class="card-body">
        <h1 class="text-4xl text-center my-8 uppercase">{pokeman.name}</h1>
    <p class="card-text">Type: <strong>{type}</strong> | Height: <strong>{pokeman.height}</strong>
        | Weight: <strong>{pokeman.weight}</strong>
    </p>
    </div>
  </div>

<style>
.card{
    margin: 20px;
    border: 1px solid #ccc;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
    transition: all 0.3s ease-out;
    margin-left: 35%;
}
</style>