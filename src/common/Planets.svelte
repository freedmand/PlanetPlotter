<script>
  import Header from "./Header";
  import { writable } from "svelte/store";

  import Planet from "./Planet";

  export let planets;
  let scroller;

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
    padding-top: 30px;
  }
</style>

<Header />

<div class="scroller" bind:this={scroller} on:scroll={updateScroll}>
  {#each planets as planet (planet.name)}
    <Planet {planet} scroll={$scrollPosition} {windowWidth} {windowHeight} />
  {/each}
</div>

<svelte:window bind:innerWidth={windowWidth} bind:innerHeight={windowHeight} />
<svelte:body on:scroll={updateScroll} />
