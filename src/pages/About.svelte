<script>
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  let ready = false
  onMount(() => {
    ready = true
  })
</script>
{#if ready}
  <h1 in:fade="{{delay: 400}}" out:fade>About</h1>
{/if}
<style>
  h1 {
    display: block;
    clear: both;
    position: relative;
    width: 100%;
    text-align: center;
  }
</style>