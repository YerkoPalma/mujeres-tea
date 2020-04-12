<script>
  import SvgClip from '../components/SvgClip.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const images = [
    { src: 'kiwihug.jpg', desc: 'Photo by Kiwihug on Unsplash' },
    { src: 'bianca.jpg', desc: 'Photo by Bianca Ackermann on Unsplash' },
    { src: 'jacalyn.jpg', desc: 'Photo by Jacalyn on Unsplash' },
    { src: 'adrien.jpg', desc: 'Photo by Adrien Delforge on Unsplash' }
  ]

  let slider
  let active = false
  let scrollLeft = tweened(0, {
    duration: 400,
    easing: cubicOut
  })
  const TRESHOLD = 20
  const handleMousedown = (e) => {
    active = true
  }
  const handleMousemove = (e) => {
    if (!active) return;
    e.preventDefault()
    if (Math.abs(e.movementX) > TRESHOLD) scrollLeft.set(200 * Math.sign(e.movementX))
  }
</script>

<style>
  figure {
    text-align: center;
    margin: 0 auto;
    position: fixed;
    width: 100%;
    left: 0;
    height: 30%;
    background-color: #F0F0F0;
    bottom: 10rem;
  }
  .active {
    cursor: grabbing;
  }
  @media (max-width: 768px) {
    figure {
    height: 20%;
    }
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<figure
  class:active
  bind:this={slider}
  on:mousedown={handleMousedown}
  on:mouseleave={e => active = false}
  on:mouseup={e => active = false}
  on:mousemove={handleMousemove}
  >
  {#each images as {src, desc}, i}
    <SvgClip src="{src}" desc="{desc}" left={i * 350 + $scrollLeft > i * 350 ? i * 350 : i * 350 + $scrollLeft} vertical={i % 2 !== 0}>
    </SvgClip>
  {/each}
</figure>
