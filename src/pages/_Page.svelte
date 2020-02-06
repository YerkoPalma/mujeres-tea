<script>
  import { fade } from 'svelte/transition'
  import { onMount } from 'svelte'
  import { route } from '../store.js'
  import { navigate } from 'svelte-routing'

  export let pathname

  function go () {
    navigate($route)
  }
</script>
{#if $route && $route === pathname}
  <div in:fade out:fade on:outroend="{go}">
    <slot></slot>
  </div>
{/if}
<style>
  div {
    margin-top: 5rem;
  }
</style>
