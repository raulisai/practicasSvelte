<script>
import {getweatherFrom} from './weather.js';

const response = getweatherFrom('mexico');

</script>

<svelte:head>
	<title>Waether</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<h1>About this app</h1>
{#await response then data}
	<p>Country: {data.country}</p>
	<p>Local time: {data.localtime}</p>
	<p>Location: {data.name}</p>
		<img src="{data.conditionIcon}" alt="{data.conditionText}" />
{/await}

</div>
