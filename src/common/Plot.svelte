<script>
  import { onMount } from "svelte";
  import { shuffle } from "@/util";

  let canvas;
  export let planet;
  let startTime;
  let commands;
  let done = false;

  const COORD_MAX = 1024;
  const DELAY = 0;
  const FINISH_TIME = 3000;
  const RAND_AMT = 1.7;

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
        const x = normalize(points[j]);
        const y = normalize(points[j + 1]);
        command.push([x, y]);
      }
      commands.push(command);

      i += length * 2;
    }
    return commands;
  }

  function initialDraw() {
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = BG;
    ctx.fillRect(0, 0, COORD_MAX, COORD_MAX);

    draw(1, "#333", false);
  }

  function draw(pctOverride = null, fg = FG, repeat = true) {
    if (done) return;

    let pct;
    if (pctOverride == null) {
      const currentTime = Date.now() - startTime - DELAY;

      pct = currentTime / FINISH_TIME;
      if (pct > 1) {
        pct = 1;
        done = true;
      }
      if (pct < 0) pct = 0;
    } else {
      pct = pctOverride;
    }

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = fg;

    for (
      let i = 0;
      i <
      Math.min(
        (pct * Math.random() * RAND_AMT * (1 - pct) + pct) * commands.length,
        commands.length
      );
      i++
    ) {
      const command = commands[i];
      ctx.beginPath();
      for (
        let j = 0;
        j <
        Math.min(
          (pct * Math.random() * RAND_AMT * (1 - pct) + pct) * command.length,
          command.length
        );
        j++
      ) {
        const [x, y] = command[j];
        if (j == 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
      ctx.stroke();
    }

    if (repeat) {
      window.requestAnimationFrame(() => draw());
    }
  }

  onMount(async () => {
    const response = await fetch(`planets/${planet}.bin`);
    const buffer = await response.arrayBuffer();
    const data = new Uint16Array(buffer);
    commands = shuffle(parse(data));

    startTime = Date.now();
    initialDraw();
    draw();
  });
</script>

<style lang="scss">
  canvas {
    width: 350px;
    height: 350px;
    margin: 50px;
  }

  h1 {
    font-weight: 100;
    width: 200px;
  }

  .planet {
    margin: 0 50px;

    > * {
      display: inline-block;
      vertical-align: middle;
    }
  }
</style>

<div class="planet">
  <h1>{planet}</h1>
  <canvas width="1024" height="1024" bind:this={canvas} />
</div>
