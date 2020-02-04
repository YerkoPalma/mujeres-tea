<script>
  import Page from './_Page.svelte'
  export let pathname
</script>
<Page {pathname}>
  <h1>About</h1>
</Page>
<style>
  h1 {
    display: block;
    clear: both;
    position: relative;
    width: 100%;
    text-align: center;
  }
</style>