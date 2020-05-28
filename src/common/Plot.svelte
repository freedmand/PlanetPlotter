<script>
  import { onMount, onDestroy } from "svelte";
  import { shuffle } from "@/util";

  let canvas;
  export let planet;
  export let height;
  export let scroll;
  export let windowHeight;
  let startTime;
  let commands = null;
  let done = false;
  let destroyed = false;

  let percent = 0;
  let dpi = 1;
  let ctx = null;
  let drawing = false;

  const COORD_MAX = height;
  const PCT_INTERVAL = 0.01;

  const BG = "#232323";
  const FG = "#ededed";

  function normalize(point) {
    return (point / 256 / 256) * COORD_MAX;
  }

  function parse(data) {
    const commands = [];
    for (let i = 0; i < data.length; i++) {
      const length = data[i];
      const points = data.slice(i + 1, i + length * 2 + 1);

      let first = true;
      const command = [];
      for (let j = 0; j < points.length; j += 2) {
        const y = COORD_MAX - normalize(points[j]);
        const x = normalize(points[j + 1]);
        command.push([x, y]);
      }
      commands.push(command);

      i += length * 2;
    }
    return commands;
  }

  function draw(pct, lastPercent = 0, fg = FG) {
    if (destroyed) return;

    if (pct == 0) {
      ctx.clearRect(0, 0, COORD_MAX, COORD_MAX);
      done = false;
    }

    ctx.strokeStyle = fg;

    ctx.beginPath();
    for (
      let i = Math.min(lastPercent * commands.length, commands.length);
      i < Math.min(pct * commands.length, commands.length);
      i++
    ) {
      const command = commands[i];
      for (
        let j = Math.min(lastPercent * command.length, command.length);
        j < Math.min(pct * command.length, command.length);
        j++
      ) {
        const [x, y] = command[j];
        if (j == 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    }
    ctx.stroke();

    if (pct < 1) {
      requestAnimationFrame(() => draw(pct + PCT_INTERVAL));
    } else {
      // Done
      done = true;
    }
  }

  async function loadPlanet() {
    const response = await fetch(`/planets/planets/${planet.fn}.bin`);
    const buffer = await response.arrayBuffer();
    const data = new Uint16Array(buffer);
    commands = shuffle(parse(data));
  }

  $: {
    if (!drawing && canvas != null && ctx != null && commands != null) {
      // Update on scroll
      scroll;

      canvas.style.width = `${height}px`;
      canvas.style.height = `${height}px`;
      canvas.width = height * dpi;
      canvas.height = height * dpi;
      ctx.scale(dpi, dpi);

      const bounds = canvas.getBoundingClientRect();
      const topPosition = bounds.y;
      const bottomPosition = bounds.y + height;
      const middlePosition = (topPosition + bottomPosition) / 2;

      // Update scroll percent
      percent = bottomPosition / (windowHeight + height);
      const drawPercent = Math.min(1 - Math.abs(percent - 0.5) * 2);

      if (drawPercent > 0.15) {
        drawing = true;
        draw(0);
      }
    }
  }

  onMount(() => {
    dpi = window.devicePixelRatio || 1;
    ctx = canvas.getContext("2d");

    loadPlanet(planet);
  });

  onDestroy(() => {
    destroyed = true;
  });
</script>

<style lang="scss">
  .cell {
    display: table-cell;
    vertical-align: middle;
    padding: 5vw;

    @media screen and (max-width: 725px) {
      vertical-align: top;
    }

    canvas,
    .canvas {
      max-width: 45vw;
      max-height: 45vw;
      position: relative;
    }
  }

  .replay {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    padding: 2px 5px;
    user-select: none;
    cursor: pointer;
    transform: translate(-34px);
    width: 19px;
    height: 21px;

    @media screen and (max-width: 725px) {
      transform: translate(-6vw);
      width: 4vw;
      height: 5vw;
    }

    &:hover {
      opacity: 0.8;
    }
  }
</style>

<div class="cell" style="height: {height}px">
  <div class="canvas">
    <canvas {height} width={height} bind:this={canvas} />
    {#if done}
      <div
        class="replay"
        on:click={() => draw(0)}
        on:touchstart={() => draw(0)}>
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 33 32">
          <path
            d="M20.08 26.65a1 1 0 10-1.25-1.56l1.25 1.56zm-4.74.19v-1h-.02l.02
            1zM6.62
            13.77l.92.4-.92-.4zm4.12-4.5l.48.88-.48-.88zm6.01-1l-.16.98.16-.99zm5.36
            2.91l.88-.48-.06-.1-.08-.1-.74.68zm.65 11.68a1 1 0 001.41
            0l6.36-6.37a1 1 0 00-1.41-1.41l-5.66 5.66-5.65-5.66a1 1 0 10-1.42
            1.41l6.37 6.37zm-3.93
            2.23c-.4.32-1.03.53-1.74.64-.7.1-1.35.1-1.75.1v2c.4 0 1.2 0
            2.05-.13.85-.13 1.88-.4 2.69-1.05l-1.25-1.56zm-3.5.75a8.35 8.35 0
            01-5.18-1.7l-1.21 1.58c1.84 1.4 4.1 2.15 6.41
            2.12l-.03-2zm-5.18-1.7a8.35 8.35 0 01-3.02-4.54l-1.94.5c.59 2.24 1.9
            4.22 3.75 5.62l1.21-1.59zM7.13 19.6a8.35 8.35 0
            01.41-5.43l-1.83-.8c-.92 2.13-1.1 4.5-.52
            6.74l1.94-.51zm.41-5.43a8.35 8.35 0 013.68-4.02l-.96-1.76a10.35
            10.35 0 00-4.55 4.98l1.83.8zm3.68-4.02a8.35 8.35 0
            015.37-.9l.33-1.97c-2.28-.39-4.63 0-6.66 1.11l.96 1.76zm5.37-.9a8.35
            8.35 0 014.78 2.6l1.48-1.34a10.35 10.35 0 00-5.93-3.23l-.33
            1.97zm4.64 2.4c1.1 2.02 1.38 3.23 1.43 4.56.02.7-.03 1.46-.08
            2.43-.06.96-.12 2.1-.12
            3.51h2c0-1.35.06-2.44.12-3.4.05-.94.1-1.79.07-2.6-.05-1.7-.44-3.22-1.66-5.45l-1.76.96z"
            fill="#fff" />
        </svg>
      </div>
    {/if}
  </div>
</div>
