<script>
    // @ts-nocheck
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { onMount } from 'svelte';
    let titles = ['#', 'Id', 'Name','price','price change', 'Symbol','Logo'];
    let coins = [];
    let coinFilter = [];
    let ref=null;

    const loadCoins = async () => {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false",
            {
                method: "GET",
                headers: new Headers({ "Content-type": "application/json" }),

                Origin: "https://api.coingecko.com",
            }
        );
        const data = await response.json();
        coins = data;
        coinFilter = coins;
    };

    const searchCoin = (value) =>{

        coinFilter = coins.filter((coin) => 
             coin.name.toLowerCase().includes(value.toLowerCase()) ||
             coin.symbol.toLowerCase().includes(value.toLowerCase())
        );
      console.log(coins);
        console.log(value);
    }

    onMount(() => {
        loadCoins();
        ref.focus();
    });

</script>

<h1>Market Coin</h1>
<div class="container">
    <div class="row">
        <input
            type="text"
            class="form-control bg-dark text-white rounded-0 border-0 my-4"
            placeholder="Search your coin"
            on:keyup={({target : {value}}) => searchCoin(value)}
            bind:this={ref}
        />
        <table class="table table-dark">
            <tr>
                
                {#each titles as title}
                    <th>{title}</th>
                {/each}
                
                
            </tr>
            {#each coinFilter as coin, i}
                <tr>
                    <td>{i + 1}</td>
                    <td>{coin.id}</td>
                    <td>{coin.name}</td>
                    <td class={coin.price_change_percentage_24h > 0 ? 'up' :'down' } >$ {coin.current_price}</td>
                    <td class={coin.price_change_percentage_24h > 0 ? 'up' :'down' }>% {coin.price_change_percentage_24h}</td>
                    <td >{coin.symbol}</td>
                    <td><img src={coin.image} alt="logo" class="img" /></td>
                </tr>
            {/each}
        </table>
    </div>
</div>

<style>
    .img {
        width: 50px;
        height: 50px;
        margin-left: 20%;
    }
    th {
        text-align: center;
        background-color: #212529;
    }
    td {
        text-align: center;
        background-color: #212529;
    }
    .up {
        color: green;
    }
    .down {
        color: red;
    }

</style>
