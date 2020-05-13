<script context="module">
  export async function preload () {
    const url = `https://graph.instagram.com/me/media?fields=caption,id,media_type,media_url,permalink,thumbnail_url,timestamp,username&access_token=${process.env.ACCESS_TOKEN}`

    const res = await this.fetch(url)
    const json = await res.json()
    const projects = json.data.map(p => {
      let d = new Date(p.timestamp)
      return {
        name: `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`,
        link: p.permalink,
        image: {
          src: p.media_type === 'VIDEO' ? p.thumbnail_url : p.media_url,
          desc: p.caption || 'Instagram media'
        }
      }
    })
    return { projects }
  }
</script>
<script>
  import Thumbnail from '../components/Thumbnail.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { onMount } from 'svelte'

  export let projects

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
    justify-content: center;
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
    .hero img {
      width: 200px;
    }
    .hero span {
      display: none;
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
