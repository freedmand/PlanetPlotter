<script>
  import { onMount } from "svelte";
  import { parseCsv } from "@/data/parseCsv";
  import { shuffle } from "weighted-shuffle";
  import Planets from "@/common/Planets";
  import Header from "@/common/Header";

  let planets = null;

  onMount(async () => {
    const response = await fetch("/planets/planets.csv");
    const text = await response.text();
    planets = parseCsv(text);
  });

  function handleNewPlanets(e) {
    planets = e.detail;
  }
</script>

<style lang="scss">
  .loading {
    padding: 90px 6vw;
  }
</style>

{#if planets == null}
  <Header />
  <div class="loading">Loading...</div>
{:else}
  <Planets {planets} />
{/if}
