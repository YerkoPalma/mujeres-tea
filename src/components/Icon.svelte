<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let size = 24
  export let color
  export let strokeWidth = 2
  export let name

  const lines = tweened([[6, 6],[12, 12], [18, 18]], {
    duration: 200,
    easing: cubicOut
  })
  export let isOpen = false
  $: if (isOpen) {
    lines.set([[4, 20],[12, 12], [20, 4]])
  } else {
    lines.set([[6, 6],[12, 12], [18, 18]])
  }
  function toggle (e) {
    isOpen = !isOpen
  }
</script>

{#if name === 'menu'}
<svg 
  on:mouseenter="{e => !isOpen && lines.set([[4, 4], [12, 12], [20, 20]])}"
  on:mouseleave="{e => !isOpen && lines.set([[6, 6],[12, 12], [18, 18]])}"
  viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
  <line x1="3" y1={$lines[0][0]} x2="21" y2={$lines[0][1]}></line>
  <line x1="3" y1={$lines[1][0]} x2={isOpen ? 3 : 21} y2={$lines[1][1]}></line>
  <line x1={isOpen ? 21 : 3} y1={$lines[1][0]} x2="21" y2={$lines[1][1]}></line>
  <line x1="3" y1={$lines[2][0]} x2="21" y2={$lines[2][1]}></line>
</svg>
{/if}

{#if name === 'moon'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
{/if}

{#if name === 'sun'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="5"></circle>
    <line x1="12" y1="1" x2="12" y2="3"></line>
    <line x1="12" y1="21" x2="12" y2="23"></line>
    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
    <line x1="1" y1="12" x2="3" y2="12"></line>
    <line x1="21" y1="12" x2="23" y2="12"></line>
    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
  </svg>
{/if}

{#if name === 'theme'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12,2 Q 30,12 12, 22 Z" fill="{color}"></path>
  </svg>
{/if}

{#if name === 'play'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
{/if}

{#if name === 'stop'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <rect x="9" y="9" width="6" height="6"></rect>
  </svg>
{/if}