<script>
  import Header from "./Header";
  import { writable } from "svelte/store";
  import { shuffle } from "weighted-shuffle";
  import konami from "konami";
  import emitter from "@/emit";

  const emit = emitter({
    newPlanets() {}
  });

  let showFilters = false;

  konami(() => (showFilters = true));

  import Planet from "./Planet";

  export let planets;

  let scroller;

  let sort = "random";

  function nullSwap(x, replacement) {
    if (x == null || isNaN(x)) return replacement;
    return x;
  }

  function defaultSort(reverse, list) {
    const multiplier = reverse ? -1 : 1;
    return list
      .sort((a, b) => a[1] * multiplier - b[1] * multiplier)
      .map(x => x[0]);
  }

  function handleSort(planets) {
    if (sort == "random") {
      return shuffle(planets, "desc");
    } else if (sort == "close") {
      return defaultSort(
        false,
        planets.map(x => [x, nullSwap(x[0].dist, Infinity)])
      );
    } else if (sort == "far") {
      return defaultSort(
        true,
        planets.map(x => [x, nullSwap(x[0].dist, -Infinity)])
      );
    } else if (sort == "large") {
      return defaultSort(
        true,
        planets.map(x => [x, nullSwap(x[0].radius, -Infinity)])
      );
    } else if (sort == "small") {
      return defaultSort(
        false,
        planets.map(x => [x, nullSwap(x[0].radius, Infinity)])
      );
    } else if (sort == "heavy") {
      return defaultSort(
        true,
        planets.map(x => [x, nullSwap(x[0].mass, -Infinity)])
      );
    } else if (sort == "light") {
      return defaultSort(
        false,
        planets.map(x => [x, nullSwap(x[0].mass, Infinity)])
      );
    } else if (sort == "long") {
      return defaultSort(
        true,
        planets.map(x => [x, nullSwap(x[0].orbPer, -Infinity)])
      );
    } else if (sort == "short") {
      return defaultSort(
        false,
        planets.map(x => [x, nullSwap(x[0].orbPer, Infinity)])
      );
    }
  }

  $: sortedPlanets = handleSort(planets, sort);
  $: _planets = sortedPlanets.map(x => x[0]);

  $: console.log("PP", planets[0], _planets[0]);

  const scrollPosition = writable(0);
  let windowWidth = 0;
  let windowHeight = 0;

  function updateScroll() {
    scrollPosition.set(scroller.scrollTop);
  }
</script>

<style lang="scss">
  .scroller {
    overflow-x: hidden;
    height: 100vh;
    overflow-y: auto;
    scrollbar-color: rgb(237, 237, 237) #151515;
  }

  .blurb {
    max-width: 600px;
    margin: 40px 30px 0 calc(5vw + 10px);

    // h1 {
    //   font-size: calc(12px + 0.8vw);
    // }

    select {
      margin-left: 10px;
      background: #222;
      color: rgb(237, 237, 237);
      font-family: inherit;
      border: solid 1px rgb(237, 237, 237);
      padding: 3px 5px;
      outline: none;
    }
  }
</style>

<div class="scroller" bind:this={scroller} on:scroll={updateScroll}>
  <Header />
  {#if showFilters}
    <div class="blurb">
      <select bind:value={sort}>
        <option value="random">Random sort</option>
        <option value="close">Closest first</option>
        <option value="far">Farthest first</option>
        <option value="large">Largest first</option>
        <option value="small">Smallest first</option>
        <option value="heavy">Heaviest first</option>
        <option value="light">Lightest first</option>
        <option value="long">Long orbit first</option>
        <option value="short">Short orbit first</option>
      </select>
    </div>
  {/if}
  <div class="padding" />
  {#each _planets as planet (planet.name)}
    <Planet {planet} scroll={$scrollPosition} {windowWidth} {windowHeight} />
  {/each}
</div>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />
<svelte:body on:scroll={updateScroll} />
