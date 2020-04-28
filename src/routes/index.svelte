<script>
  import Thumbnail from '../components/Thumbnail.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { swipe } from '../actions/swipe.js'
  import Flickity from 'flickity'

  const images = [
    { src: 'kiwihug.jpg', desc: 'Photo by Kiwihug on Unsplash' },
    { src: 'bianca.jpg', desc: 'Photo by Bianca Ackermann on Unsplash' },
    { src: 'kiwihug.jpg', desc: 'Photo by Jacalyn on Unsplash' },
    { src: 'bianca.jpg', desc: 'Photo by Adrien Delforge on Unsplash' },
    { src: 'kiwihug.jpg', desc: 'Photo by Jacalyn on Unsplash' },
    { src: 'bianca.jpg', desc: 'Photo by Adrien Delforge on Unsplash' }
  ]

  let slider
  let active = false
  let scrollLeft = tweened(0, {
    duration: 400,
    easing: cubicOut
  })
  const handleMousemove = (e) => {
    console.log('[active]', active ? e : null)
    if (!active) return;
    e.preventDefault()
    if (e.detail.direction === 'left' || e.detail.direction === 'right') scrollLeft.set(200 * Math.sign(e.detail.distance))
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

<figure
  use:swipe
  class:active
  bind:this={slider}
  on:swipestart={e => active = true}
  on:swipeend={e => active = false}
  on:swipe={handleMousemove}
  >
  {#each images as {src, desc}, i}
    <Thumbnail source="{src}" description="{desc}">
    </Thumbnail>
  {/each}
</figure>
