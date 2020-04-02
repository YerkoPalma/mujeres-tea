<script>
  import Nav from '../components/Nav.svelte';

  export let segment;
</script>

<style>
  main {
    position: relative;
    max-width: 56em;
    background-color: transparent;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
    z-index: 10;
  }
  /* Smartphones (portrait) ----------- */
  @media only screen and (max-width : 768px) {
    main {
      padding-top: 4rem;
    }
  }
</style>

<Nav {segment}/>

<main>
  <slot></slot>
</main>