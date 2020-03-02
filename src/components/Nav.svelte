<script>
  import Icon from './Icon.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { goto } from '@sapper/app'

  let btn
  const left = tweened(-300, {
    duration: 200,
    easing: cubicOut
  })
  const border = tweened(0, {
    duration: 200,
    easing: cubicOut
  })
  let color = '#333'
  let isOpen = false
  export let segment

  const toggle = (e) => {
    if (color === '#333') {
      left.set(0)
      border.set(2)
      color= '#eee'
    } else {
      left.set(-300)
      border.set(0)
      color= '#333'
    }
    isOpen = !isOpen
  }

  const navigate = async (route) => {
    await goto(route)
    btn.click()
  }
</script>

<style>
  nav {
    font-weight: 300;
    position: fixed;
    width: 100%;
    display: block;
    height: 100vh;
    top: 0;
    left: 0;
    padding: 0;
  }

  button {
    background: transparent;
    border: none;
    padding: .5rem;
    cursor: pointer;
    z-index: 100;
    position: absolute;
    margin-left: 1rem;
    outline: none;
  }

  ul {
    margin: 0;
    padding: 3.5rem 0;
    position: fixed;
    width: 10%;
    top: 0;
    left: -20%;
    height: 100%;
    z-index: 100;
    background-color: #333;
  }

  /* clearfix */
  ul::after {
    content: '';
    display: block;
    clear: both;
  }

  li {
    display: block;
    float: left;
    width: 100%;
  }

  a {
    text-decoration: none;
    padding: 1em 0.5em;
    display: block;
    color: #eee;
    font-size: 1em;
    cursor: pointer;
    text-transform: uppercase;
    border-top: 1px #222 solid;
  }
  li:last-child a {
    border-bottom: 1px #222 solid;
  }
  .glass {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .4);
  }
</style>

<button on:click="{toggle}" bind:this={btn}>
  <Icon name="menu" size="40" color={color} isOpen={isOpen}></Icon>
</button>
<nav style="z-index:{isOpen ? 50 : 0};border: #333 solid {$border}rem; border-left: #333 solid {$border * 4}rem;">
  <ul style="left:{$left}px;">
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a on:click|preventDefault="{e => navigate('.')}">home</a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a on:click|preventDefault="{e => navigate('about')}">about</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
         the blog data when we hover over the link or tap it on a touchscreen -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a rel=prefetch on:click|preventDefault="{e => navigate('blog')}">blog</a>
    </li>
  </ul>
  {#if color !== '#333'}
    <div on:click="{toggle}" class="glass"></div>
  {/if}
</nav>
