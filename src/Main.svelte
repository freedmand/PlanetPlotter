<script>
  import { router, Router } from "@/router/router";
  import { routes } from "@/routes";
  import { onMount } from "svelte";
  import { currentUrl } from "@/util/url";
  import { Svue } from "svue";

  // Set up routes
  router.routes = new Router(...routes);

  let component = null;
  let props = null;

  onMount(() => {
    router.currentUrl = currentUrl();
    if (!history.state) {
      window.history.replaceState(
        { path: currentUrl() },
        "",
        window.location.href
      );
    }

    router.subscribe(() => {
      component = router != null ? router.resolvedRoute.component : null;
      props = router != null ? router.resolvedRoute.props : null;
    });
  });

  function handleBackNav(e) {
    router.currentUrl = e.state.path;
  }
</script>

<style lang="scss">
  :global(html, body) {
    position: relative;
    width: 100%;
    margin: 0;
    padding: 0;
    font-family: "Leon Sans", sans-serif;
  }
</style>

<svelte:window on:popstate={handleBackNav} />

{#if component != null}
  <svelte:component this={component} {...props} />
{/if}
