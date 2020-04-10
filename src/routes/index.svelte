<script>
  import SvgClip from '../components/SvgClip.svelte'

  const images = [
    { src: 'kiwihug.jpg', desc: 'Photo by Kiwihug on Unsplash' },
    { src: 'bianca.jpg', desc: 'Photo by Bianca Ackermann on Unsplash' },
    { src: 'jacalyn.jpg', desc: 'Photo by Jacalyn on Unsplash' }
  ]
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
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<figure>
  {#each images as {src, desc}, i}
    <SvgClip src="{src}" desc="{desc}" left={i * 350} vertical={i % 2 !== 0}>
    </SvgClip>
  {/each}
</figure>
