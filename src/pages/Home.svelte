<script>
  import VirtualList from "@/common/VirtualList";
  import Plot from "@/common/Plot";
  import { onMount } from "svelte";
  import { shuffle } from "@/util";

  let planets = [];

  onMount(async () => {
    const response = await fetch("planets/listing.json");
    planets = shuffle(await response.json());
  });
</script>

<style lang="scss">
  :global(body) {
    margin: 0;
    color: #ededed;
    background: #222222;
    font-family: "Avenir Next", Avenir, Helvetica, Arial, sans-serif;
  }
</style>

<VirtualList items={planets} let:item>
  <Plot planet={item} />
</VirtualList>
