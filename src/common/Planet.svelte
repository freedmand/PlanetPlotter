<script>
  import Plot from "./Plot";
  import Description from "./Description";
  import { onMount, onDestroy } from "svelte";

  export let planet;
  export let scroll;
  export let height = 500;
  export let windowHeight;
  export let padding = 50;

  let elem;
  let observer = null;

  let visible = false;

  onMount(() => {
    observer = new IntersectionObserver(
      e => {
        visible = e[0].isIntersecting;
      },
      {
        root: null,
        rootMargin: "0px",
        threshold: 0
      }
    );
    observer.observe(elem);
  });

  onDestroy(() => {
    if (observer != null && elem != null) observer.unobserve(elem);
  });
</script>

<style lang="scss">
  .container {
    overflow: hidden;
  }

  .planet {
    overflow-y: hidden;
    display: table;
    width: 100%;
    padding: 0 10vw;
  }
</style>

<div class="container" style="height: {height + padding * 2}px">
  <div
    class="planet"
    style="height: {height + padding * 2}px; padding: {padding}px 0"
    bind:this={elem}>
    {#if visible}
      <Plot {planet} {height} {scroll} {windowHeight} />
      <Description {planet} {height} {scroll} {windowHeight} />
    {/if}
  </div>
</div>
