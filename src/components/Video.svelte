<script>
  import Icon from './Icon.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let src
  export let poster

  let video
  let progress
  let playing = false
  let max = 10
  let progressValue = tweened(0, {
    duration: 400,
    easing: cubicOut
  })

  const loadedmetadata = () => {
    max = video.duration
  }
  const timeupdate = () => {
    progressValue.set(video.currentTime)
  }
  const handlePlaypause = () => {
    if (playing) {
      video.pause()
    } else {
      video.play()
    }
    playing = !playing
  }
</script>

<style>
  figure {
    position: relative;
  }
  progress {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 1.5vh;
    margin-bottom: 5px;
    margin-top: 5px;
  }
  .controls {
    position: absolute;
    bottom: .3rem;
    display: flex;
    width: 100%;
    background-color: #111;
    padding: .25rem .75rem;
    flex-direction: column;
  }
  .buttons {
    display: flex;
    flex-direction: row;
  }
  .buttons button {
    border: none;
    background-color: transparent;
    color: #ddd;
    cursor: pointer;
    outline: none;
  }
</style>

<figure>
  <video
    src='{src}'
    poster='{poster}'
    type='video/mp4'
    width="100%"
    preload="metadata"
    bind:this={video}
    on:loadedmetadata={loadedmetadata}
    on:timeupdate={timeupdate}
  ></video>
  <div class="controls">
    <progress bind:this={progress} value="{$progressValue}" min="0" max={max}></progress>
    <div class="buttons">
      <button on:click|preventDefault={handlePlaypause} class="playpause"><Icon name="{playing ? 'pause' : 'play'}" solid="true"></Icon></button>
    </div>
  </div>
</figure>
