<script>
	// @ts-nocheck

	import { getweatherFrom } from "./weather.js";
	let city = "mexico";
	let response = getweatherFrom(city);

	function hadleClick(city) {
		response = getweatherFrom(city);
	}
</script>

<svelte:head>
	<title>Waether</title>
	<meta name="description" content="Waether" />
</svelte:head>

{#await response then data}
	<div class={data.isDay == 0 ? "text-column-black" : "text-column-dark"}>
		<h1>Weather</h1>
		<p class="textInfo">Enter the name of your city</p>
		<input class="form-control" type="text" bind:value={city} />
		<button class="btn btn-primary item" on:click={hadleClick(city)}
			>Get weather</button
		>

		<h1>{data.country}</h1>
		<p class="location">Location: {data.name}</p>
		<p class="temp">{data.temperature}°C</p>
		<img  class="img-fluid imgSimb" src={data.conditionIcon} alt={data.conditionText} />

		<div class="fooderWeather">
			<div class="complement">
				<span>{data.humidity}%</span>
				<p>Humidity</p>
			</div>
			<div class="complement">
				<span>{data.windSpeed} km/h</span>
				<p>Wind speed</p>
			</div>
			<div class="complement">
				<span>{data.feelsLike}</span>
				<p>feelsLike</p>
			</div>
		</div>
	</div>
{/await}

<style>
	.text-column-black {
		margin: 0 auto;
		background-color: #0f0e0ed3;
		color: white;
	}
	.text-column-dark {
		background-color: aliceblue;
		margin: 0 auto;
	}
	.temp {
		font-size: 4rem;
		font-size: 4rem;
		text-align: center;
	}
	.location {
		font-size: 0.8rem;
		text-align: center;
	}
	.fooderWeather {
		display: flex;
		border-color: black;
		border: solid 4px;
		border-radius: 10px;
	}
	.complement {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1rem;
	}

	.textInfo {
		font-size: 0.7rem;
		text-align: center;
	}
	.item {
		margin: 0 auto;
		margin-left: 30%;
	}
	.imgSimb {
		width: 90%;
		margin: 0 auto;
		margin-left: 10%;
		

	}
</style>
