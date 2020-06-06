<script>
  import { onMount } from "svelte";

  export let planet;
  export let height;

  function formatValue(x, xErr, unit) {
    if (x == null) return "N/A";
    if (xErr == null) return `${x} ${unit}`;
    return `${x} ± ${xErr} ${unit}`;
  }

  function formatRA(ra) {
    const parts = ra
      .split(/h|m|s/)
      .map(x => x.trim())
      .filter(x => x.length > 0);
    if (parts.length != 3) return "N/A";
    return `${parts[0]}<sup>h</sup> ${parts[1]}<sup>m</sup> ${parts[2]}<sup>s</sup>`;
  }

  function formatDec(dec) {
    const parts = dec
      .split(/d|m|s/)
      .map(x => x.trim())
      .filter(x => x.length > 0);
    if (parts.length != 3) return "N/A";
    return `${parts[0]}° ${parts[1]}’ ${parts[2]}”`;
  }
</script>

<style lang="scss">
  .description {
    display: table-cell;
    vertical-align: middle;
    padding-right: 10vw;
    font-size: 1vw;
    overflow: hidden;

    @media screen and (max-width: 725px) {
      vertical-align: top;
    }

    h1 {
      padding: 1vw 0;
      margin: 0;
      font-size: calc(20px + 1.5vw);

      @media screen and (max-width: 725px) {
        font-size: 16px;
      }
    }

    > table > tr > td {
      vertical-align: top;
      padding: 0 0.3vw 0 0;
      width: 20vw;

      @media screen and (max-width: 725px) {
        display: block;
        padding-bottom: 5px;
        padding-top: 5px;
      }
    }

    .title {
      font-weight: bold;
      font-size: calc(15px + 1.1vw);
      padding-top: 1vw;

      @media screen and (max-width: 725px) {
        font-size: 13px;
      }
    }

    .value {
      font-size: calc(10px + 0.6vw);

      @media screen and (max-width: 725px) {
        font-size: 10px;
      }

      td {
        vertical-align: baseline;
        padding-right: 0.2vw;
      }
    }
  }
</style>

<div class="description" style="height: {height}px">
  <h1>{planet.name}</h1>
  <table>
    <tr>
      <td>
        <div class="title">Mass</div>
        <div class="value">
          {@html formatValue(planet.mass, planet.massErr, 'M<sub>J</sub>')}
        </div>
      </td>
      <td>
        <div class="title">Orbital Period</div>
        <div class="value">
          {@html formatValue(planet.orbPer, planet.orbPerErr, 'days')}
        </div>
      </td>
    </tr>
    <tr>
      <td>
        <div class="title">Radius</div>

        <div class="value">
          {@html formatValue(planet.radius, planet.radiusErr, 'R<sub>J</sub>')}
        </div>
      </td>
      <td>
        <div class="title">Distance</div>
        <div class="value">
          {@html formatValue(planet.dist, planet.distErr, 'pc')}
        </div>
      </td>
    </tr>
    <tr>

      <td>
        <div class="title">Discovery</div>
        <div class="value">
          <table>
            <tr>
              <td>Method:</td>
              <td>{planet.method}</td>
            </tr>
            <tr>
              <td>Facility:</td>
              <td>{planet.facility}</td>
            </tr>
          </table>
        </div>
      </td>

      <td>
        <div class="title">Coordinates</div>
        <div class="value">
          <table>
            <tr>
              <td>RA:</td>
              <td>
                {@html formatRA(planet.ra)}
              </td>
            </tr>
            <tr>
              <td>Dec:</td>
              <td>
                {@html formatDec(planet.dec)}
              </td>
            </tr>
          </table>
        </div>
      </td>
    </tr>

  </table>
</div>
