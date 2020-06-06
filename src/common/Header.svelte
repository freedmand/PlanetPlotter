<script>
  import Link from "@/router/Link";
</script>

<style lang="scss">
  header {
    position: sticky;
    top: 0;
    width: 100%;
    background: #222222;
    margin: 0;
    z-index: 9;
    padding: 0 5vw;

    .link {
      display: inline-block;
      margin: 0 10px;
      padding: 20px 0;
      vertical-align: middle;
      font-size: 16px;
      user-select: none;
      cursor: pointer;

      :global(a) {
        color: inherit;
        text-decoration: inherit;
      }

      &:hover {
        opacity: 0.8;
      }

      &.large {
        font-weight: bold;
      }
    }
  }
</style>

<header>
  <div class="link large">
    <b>
      <Link to="home">Planet Gallery</Link>
    </b>
  </div>
  <div class="link">
    <Link to="about">About</Link>
  </div>
</header>
