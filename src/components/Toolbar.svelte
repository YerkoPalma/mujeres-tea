<script>
  import Icon from './Icon.svelte'
  import Popover, { init } from './Popover.svelte'
  import { onMount } from 'svelte'

  let trigger
  let isDarkThemed = false
  export let isOpen = false
  export let iconColor
  let showThemePane = false
  let isReading = false
  let firstRead = true
  let toggleRead = () => {}
  onMount(() => {
    init(trigger)

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
  ul.toolbar {
    position: fixed;
    width: 100%;
    bottom: 0;
    right: 0;
    z-index: 50;
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

  ul.toolbar li {
    width: 50px;
    float: right;
    display: flex;
  }

  ul.toolbar li a {
    border: none;
  }
</style>
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