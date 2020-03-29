<script>
  import Icon from './Icon.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let src
  export let poster

  let video
  let progress
  let playing = false
  let muted = false
  let max = 10
  let progressValue = tweened(0, {
    duration: 400,
    easing: cubicOut
  })

  const loadedmetadata = () => {
    max = video.duration
  }
  const timeupdate = () => {
    progressValue.set(Math.floor((video.currentTime / video.duration) * 100))
  }
  const handlePlaypause = () => {
    if (playing) {
      video.pause()
    } else {
      video.play()
    }
    playing = !playing
  }
  const handleMuted = () => {
    muted = !muted
  }
  const updateDuration = (e) => {
    const pos = (e.offsetX) / progress.offsetWidth
    video.currentTime = pos * video.duration
    timeupdate()
  }
</script>

<style>
  figure {
    position: relative;
  }
  .progress {
    -webkit-appearance: none;
    appearance: none;
    width: 100%;
    height: 4.5px;
    margin-bottom: 5px;
    margin-top: 5px;
    background-color: #555;
    position: relative;
  }
  .progress-bar {
    background-color: #A463F2;
    height: 100%;
    display: block;
  }
  .progress-value {
    width: 10px;
    height: 10px;
    position: absolute;
    top: -3px;
    display: inline-block;
    border-radius: 99px;
    background-color: #ddd;
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
    muted="{muted}"
    bind:this={video}
    on:loadedmetadata={loadedmetadata}
    on:timeupdate={timeupdate}
  ></video>
  <div class="controls">
    <div class="progress" bind:this={progress} on:click={updateDuration}>
      <span class="progress-bar" style="width: {$progressValue}%"></span>
      <span class="progress-value" style="margin-left: {$progressValue}%"></span>
    </div>
    <!-- <progress bind:this={progress} value="{$progressValue}" min="0" max={max}></progress> -->
    <div class="buttons">
      <button on:click|preventDefault={handlePlaypause} class="playpause"><Icon name="{playing ? 'pause' : 'play'}" solid="true"></Icon></button>
      <button on:click|preventDefault={handleMuted} class="muteToggle"><Icon color="#ddd" name="{muted ? 'mute' : 'volume'}" solid="true"></Icon></button>
    </div>
  </div>
</figure>
