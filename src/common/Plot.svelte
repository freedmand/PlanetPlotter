<script>
  import { onMount } from "svelte";

  let canvas;
  export let planet;
  let startTime;
  let commands;
  let done = false;

  const COORD_MAX = 1024;
  const FINISH_TIME = 2000; // 5 seconds
  const RAND_AMT = 1.7;

  const BG = "#222";
  const FG = "#ededed";

  function normalize(point) {
    return (point / 256 / 256) * COORD_MAX;
  }

  // Fisher-Yates algorithm
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
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
  }

  function bezierBlend(t) {
    // Adadpted from https://stackoverflow.com/a/25730573
    return t * t * (3 - 2 * t);
  }

  function draw() {
    if (done) return;

    const currentTime = Date.now() - startTime;

    let pct = currentTime / FINISH_TIME;
    if (pct > 1) {
      pct = 1;
      done = true;
    }
    // pct = bezierBlend(pct);

    const ctx = canvas.getContext("2d");
    ctx.strokeStyle = FG;

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

    window.requestAnimationFrame(draw);
  }

  onMount(async () => {
    const response = await fetch(`planets/${planet}`);
    const buffer = await response.arrayBuffer();
    const data = new Uint16Array(buffer);
    commands = shuffle(parse(data));

    startTime = Date.now();
    initialDraw();
    draw();
  });
</script>

<style lang="scss">
  :global(body) {
    margin: 50px;
    color: #ededed;
    background: #222222;
  }

  canvas {
    width: 512px;
    height: 512px;
  }
</style>

<canvas width="1024" height="1024" bind:this={canvas} />
