<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let size = 24
  export let color = '#333'
  export let strokeWidth = 2
  export let name

  const lines = tweened([[6, 6],[12, 12], [18, 18]], {
    duration: 200,
    easing: cubicOut
  })
  export let isOpen = false
  function toggle (e) {
    if (isOpen) {
      lines.set([[6, 6],[12, 12], [18, 18]])
    } else {
      lines.set([[4, 20],[12, 12], [20, 4]])
    }
    isOpen = !isOpen
  }
</script>

{#if name === 'menu'}
<svg 
  on:mouseenter="{e => !isOpen && lines.set([[4, 4], [12, 12], [20, 20]])}"
  on:mouseleave="{e => !isOpen && lines.set([[6, 6],[12, 12], [18, 18]])}"
  on:click="{toggle}"
  viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="3" y1={$lines[0][0]} x2="21" y2={$lines[0][1]}></line>
  <line x1="3" y1={$lines[1][0]} x2={isOpen ? 3 : 21} y2={$lines[1][1]}></line>
  <line x1="3" y1={$lines[2][0]} x2="21" y2={$lines[2][1]}></line>
</svg>
{/if}