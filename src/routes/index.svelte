<script>
  import Thumbnail from '../components/Thumbnail.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  const projects = [
    {
      name: 'Kiwihug Project',
      link: '',
      image: { src: 'kiwihug.jpg', desc: 'Photo by Kiwihug on Unsplash' }
    }, {
      name: 'Bianca Project',
      link: '',
      image: { src: 'bianca.jpg', desc: 'Photo by Bianca Ackermann on Unsplash' }
    }, {
      name: 'Kiwihug Project',
      link: '',
      image: { src: 'kiwihug.jpg', desc: 'Photo by Kiwihug on Unsplash' }
    }, {
      name: 'Bianca Project',
      link: '',
      image: { src: 'bianca.jpg', desc: 'Photo by Bianca Ackermann on Unsplash' }
    }, {
      name: 'Kiwihug Project',
      link: '',
      image: { src: 'kiwihug.jpg', desc: 'Photo by Kiwihug on Unsplash' }
    }, {
      name: 'Bianca Project',
      link: '',
      image: { src: 'bianca.jpg', desc: 'Photo by Bianca Ackermann on Unsplash' }
    }
  ]

  let slider
  let active = false
  let scrollLeft = tweened(0, {
    duration: 400,
    easing: cubicOut
  })
  onMount(() => {
    if (window) {
      import('flickity')
        .then(Flickity => {
          const flicky = new Flickity.default(slider, {
            freeScroll: true,
            contain: true,
            prevNextButtons: false,
            pageDots: false
          })
        })
    }
  })
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
  .hero {
    display: flex;
    align-items: center;
  }
  .hero img {
    width: 150px;
    display: inline-block;
  }
  .hero span {
    color: #8048b7;
    margin: 2rem auto auto 1rem;
    font-size: 2rem;
    width: 60%;
  }
  @media (max-width: 768px) {
    figure {
    height: 20%;
    }
  }
</style>

<div class="hero">
  <img src="logo.png" alt="Logo planTea">
  <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit</span>
</div>
<figure
  class:active
  bind:this={slider}
  class="main-carousel"
  >
  {#each projects as {name, link, image}, i}
    <Thumbnail name={name} link={link} source={image.src} description={image.desc} class="carousel-cell">
    </Thumbnail>
  {/each}
</figure>
