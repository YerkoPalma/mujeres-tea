<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let size = 24
  export let color
  export let strokeWidth = 2
  export let name
  export let solid = false

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
  viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="{solid ? 'currentColor' : 'none'}" stroke-linecap="round" stroke-linejoin="round">
  <line x1="3" y1={$lines[0][0]} x2="21" y2={$lines[0][1]}></line>
  <line x1="3" y1={$lines[1][0]} x2={isOpen ? 3 : 21} y2={$lines[1][1]}></line>
  <line x1={isOpen ? 21 : 3} y1={$lines[1][0]} x2="21" y2={$lines[1][1]}></line>
  <line x1="3" y1={$lines[2][0]} x2="21" y2={$lines[2][1]}></line>
</svg>
{/if}

{#if name === 'moon'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="{solid ? 'currentColor' : 'none'}" stroke-linecap="round" stroke-linejoin="round">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
  </svg>
{/if}

{#if name === 'sun'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="{solid ? 'currentColor' : 'none'}" stroke-linecap="round" stroke-linejoin="round">
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
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="{solid ? 'currentColor' : 'none'}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <path d="M12,2 Q 30,12 12, 22 Z" fill="{color}"></path>
  </svg>
{/if}

{#if name === 'play'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="{solid ? 'currentColor' : 'none'}" stroke-linecap="round" stroke-linejoin="round">
    <polygon points="5 3 19 12 5 21 5 3"></polygon>
  </svg>
{/if}

{#if name === 'stop'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="{solid ? 'currentColor' : 'none'}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <rect x="9" y="9" width="6" height="6"></rect>
  </svg>
{/if}

{#if name === 'pause'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="{solid ? 'currentColor' : 'none'}" stroke-linecap="round" stroke-linejoin="round">
    <rect x="6" y="4" width="4" height="16"></rect>
    <rect x="14" y="4" width="4" height="16"></rect>
  </svg>
{/if}

{#if name === 'volume'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    <polygon fill="{solid ? 'currentColor' : 'none'}" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
  </svg>
{/if}

{#if name === 'mute'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" stroke-linecap="round" stroke-linejoin="round">
    <polygon fill="{solid ? 'currentColor' : 'none'}" points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
    <line x1="23" y1="9" x2="17" y2="15"></line>
    <line x1="17" y1="9" x2="23" y2="15"></line>
  </svg>
{/if}

{#if name === 'maximize'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path>
  </svg>
{/if}

{#if name === 'minimize'}
  <svg viewBox="0 0 24 24" width="{size}" height="{size}" stroke="{color}" stroke-width="{strokeWidth}" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"></path>
  </svg>
{/if}