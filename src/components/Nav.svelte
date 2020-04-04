<script>
  import Icon from './Icon.svelte'
  import Popover, { init } from './Popover.svelte'
  import { onMount } from 'svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'
  import { goto } from '@sapper/app'

  let btn
  const left = tweened(-500, {
    duration: 200,
    easing: cubicOut
  })
  const border = tweened(0, {
    duration: 200,
    easing: cubicOut
  })
  export let segment

  let nav
  let iconColor
  let isOpen = false
  let toggle
  let primary
  let secondary
  let isDarkThemed = false
  let isReading = false
  let firstRead = true
  let trigger
  let toggleRead = () => {}
  let showThemePane = false
  let mobileFactor = 3

  onMount(() => {
    iconColor = getComputedStyle(document.body).getPropertyValue('--primary-text')
    init(trigger)
    mobileFactor = window.matchMedia('(max-width : 768px)').matches ? 2 : 3

    toggle = (e) => {
      if (!isOpen) {
        left.set(0)
        border.set(2)
        iconColor = getComputedStyle(document.body).getPropertyValue('--secondary-text')
      } else {
        left.set(-getComputedStyle(nav).width.slice(0, -2))
        border.set(0)
        iconColor = getComputedStyle(document.body).getPropertyValue('--primary-text')
      }
      isOpen = !isOpen
    }

    if (window) {
      import('nanospeech')
        .then(({ speak }) => {
          toggleRead = e => {
            if (isReading) {
              window.speechSynthesis.cancel()
              isReading = false
            } else {
              let text = window.getSelection().toString()
              if (!text) {
                text = document.querySelector('main').textContent
              }
              if (firstRead) {
                firstRead = false
                window.speechSynthesis.addEventListener('voiceschanged', () => {
                  talk(text, { lang: 'en-GB'}, () => {
                    isReading = false
                  })
                }, { once: true })
              } else {
                talk(text, { lang: 'en-GB'}, () => {
                  isReading = false
                })
              }
              isReading = true
            }
          }

          function talk (text, opts, cb) {
            if (text) {
              // make queue from text
              const length = opts.length || 160
              const regex = new RegExp('[\\s\\S]{1,' + length + '}[.!?,]{1}|[\\s\\S]{1,' + length + '}', 'g')
              const chunks = text.match(regex)
              const words = chunks.shift()
              const speech = speak(words, opts)
              if (chunks.length) {
                speech.on('end', talk(chunks.join(' ').trim(), opts, cb))
              } else {
                speech.on('end', cb)
              }
            } else {
              cb()
            }
          }
        })
    }
  })

  const navigate = async (route) => {
    await goto(route)
    btn.click()
  }
  const toggleTheme = () => {
    isDarkThemed = !isDarkThemed
    document.body.classList.toggle('dark-theme')
    if (isOpen) {
      iconColor = getComputedStyle(document.body).getPropertyValue('--secondary-text')
    } else {
      iconColor = getComputedStyle(document.body).getPropertyValue('--primary-text')
    }
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
    top: 0;
  }

  ul.nav {
    margin: 0;
    padding: 3.5rem 0;
    position: fixed;
    width: 10%;
    top: 0;
    left: -20%;
    height: 100%;
    z-index: 100;
    background-color: var(--primary);
  }

  /* clearfix */
  ul.nav::after {
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
  ul.nav li:last-child a {
    border-bottom: 1px #222 solid;
  }
  .glass {
    position: relative;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, .4);
  }

  ul.toolbar {
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    z-index: 50;
  }

  ul.toolbar li {
    width: 50px;
    float: right;
    display: flex;
  }

  ul.toolbar li a {
    border: none;
  }
  @media (max-width: 768px) {
    ul.nav {
      left: 0px;
      width: 50%;
      font-size: 1.5rem;
      padding-left: 1rem;
    }
    /* ul.toolbar {
      margin-bottom: 10%;
    } */
  }
</style>

<button on:click="{toggle}" bind:this={btn} aria-label="Menu">
  <Icon name="menu" size="40" color={iconColor} isOpen={isOpen}></Icon>
</button>
<nav style="z-index:{isOpen ? 50 : 0};border: var(--primary) solid {$border}rem; border-left: var(--primary) solid {$border * 4}rem; border-bottom: var(--primary) solid {$border * mobileFactor}rem;">
  <ul class="nav" bind:this={nav} style="left:{$left}px;">
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a on:click|preventDefault="{e => navigate('.')}" aria-label="Home page">home</a>
    </li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a on:click|preventDefault="{e => navigate('about')}" aria-label="About page">about</a>
    </li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
         the blog data when we hover over the link or tap it on a touchscreen -->
    <!-- svelte-ignore a11y-missing-attribute -->
    <li>
      <a rel=prefetch on:click|preventDefault="{e => navigate('blog')}" aria-label="Blog">blog</a>
    </li>
  </ul>
  {#if isOpen}
    <div on:click="{toggle}" class="glass"></div>
  {/if}
</nav>
<ul class="toolbar" style="background-color: {isOpen ? 'transparent' : 'var(--secondary)'}">
  <li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <a on:click|preventDefault="{toggleTheme}" aria-label="Toggle dark and light mode">
      <Icon name={isDarkThemed ? 'sun' : 'moon'} color={iconColor}/>
    </a>
  </li>
  <li>
    <!-- svelte-ignore a11y-missing-attribute -->
    <Popover visible={showThemePane}>
      <div class="show">
        <Icon name='theme' color="#F25F5C"/>
        <Icon name='theme' color="#FFE066"/>
        <Icon name='theme' color="#247BA0"/>
        <Icon name='theme' color="#70C1B3"/>
      </div>
    </Popover>
    <a href bind:this={trigger} on:click|preventDefault="{e => showThemePane = !showThemePane}" aria-label="Switch theme">
      <Icon name='theme' color={iconColor}/>
    </a>
  </li>
  <li>
    <a href on:click|preventDefault="{toggleRead}" aria-label="Read page">
      <Icon name={isReading ? 'stop' : 'play'} color={iconColor}/>
    </a>
  </li>
</ul>
