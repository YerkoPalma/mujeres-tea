<script>
  import Icon from './Icon.svelte'
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  export let src
  export let poster

  let loading = true
  let container
  let video
  let progress
  let volumeControl
  let playing = false
  let muted = false
  let fullscreen = false
  let max = 0
  let currentTime = 0
  let progressValue = tweened(0, {
    duration: 400,
    easing: cubicOut
  })
  const pipEnabled = 'pictureInPictureEnabled' in document && document.pictureInPictureEnabled

  const loadedmetadata = () => {
    max = video.duration
  }
  const timeupdate = () => {
    progressValue.set(Math.floor((video.currentTime / video.duration) * 100))
    currentTime = video.currentTime >> 0
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
  const togglePip = async () => {
    try {
      if (video !== document.pictureInPictureElement) {
        await video.requestPictureInPicture()
      } else {
        await document.exitPictureInPicture()
      }
    } catch(error) {
      alert(error)
    }
  }
  const toggleFullscreen = () => {
    if (!fullscreen) {
      container.requestFullscreen()
    } else {
      document.exitFullscreen()
    }
    fullscreen = !fullscreen
  }
  const canplaythrough = () => {
    loading = false
  }
  const updateDuration = (e) => {
    const pos = (e.offsetX) / progress.offsetWidth
    video.currentTime = pos * video.duration
    timeupdate()
  }
  const setVolume = () => {
    video.volume = volumeControl.value
  }
</script>

<style>
  figure {
    position: relative;
  }
  video.loading {
    display: none;
  }
  .loading-container {
    margin: 0 auto;
    position: relative;
    display: block;
    text-align: center;
    background-color: #111;
    color: #ddd;
    min-height: 250px;
  }
  input[type=range] {
    -webkit-appearance: none;
    margin-bottom: 7.5px;
    width: 10%;
    background-color: transparent;

    --track-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    --track-bg: #ddd;
    --track-border: 0.2px solid #010101;
    --track-height: 4px;
    --track-br: 1.3px;
    --track-focus-bg: #eee;

    --thumb-color: #ffffff;
    --thumb-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    --thumb-height: 10px;
    --thumb-width: 10px;
    --thumb-border: 1px solid #000000;
    --thumb-br: 99px;
  }
  input[type=range]:focus {
    outline: none;
  }
  input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    animate: 0.2s;
    box-shadow: var(--track-shadow);
    background: var(--track-bg);
    border-radius: var(--track-br);
    border: var(--track-border);
  }
  input[type=range]::-webkit-slider-thumb {
    box-shadow: var(--thumb-shadow);
    border: var(--thumb-border);
    height: var(--thumb-height);
    width: var(--thumb-width);
    border-radius: var(--thumb-br);
    background: var(--thumb-color);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -3px;
  }
  input[type=range]:focus::-webkit-slider-runnable-track {
    background: var(--track-focus-bg);
  }
  input[type=range]::-moz-range-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    animate: 0.2s;
    box-shadow: var(--track-shadow);
    background: var(--track-bg);
    border-radius: var(--track-br);
    border: var(--track-border);
  }
  input[type=range]::-moz-range-thumb {
    box-shadow: var(--thumb-shadow);
    border: var(--thumb-border);
    height: var(--thumb-height);
    width: var(--thumb-width);
    border-radius: var(--thumb-br);
    background: var(--thumb-color);
    cursor: pointer;
  }
  input[type=range]::-ms-track {
    width: 100%;
    height: var(--track-height);
    cursor: pointer;
    animate: 0.2s;
    background: transparent;
    border-color: transparent;
    border-width: 16px 0;
    color: transparent;
  }
  input[type=range]::-ms-fill-lower {
    box-shadow: var(--track-shadow);
    background: var(--track-bg);
    border-radius: var(--track-br);
    border: var(--track-border);
  }
  input[type=range]::-ms-fill-upper {
    box-shadow: var(--track-shadow);
    background: var(--track-bg);
    border-radius: var(--track-br);
    border: var(--track-border);
  }
  input[type=range]::-ms-thumb {
    box-shadow: var(--thumb-shadow);
    border: var(--thumb-border);
    height: var(--thumb-height);
    width: var(--thumb-width);
    border-radius: var(--thumb-br);
    background: var(--thumb-color);
    cursor: pointer;
  }
  input[type=range]:focus::-ms-fill-lower {
    background: var(--track-focus-bg);
  }
  input[type=range]:focus::-ms-fill-upper {
    background: var(--track-focus-bg);
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
    bottom: 0;
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
  .buttons span {
    color: #ddd;
    font-size: .9rem;
    padding-top: .15rem;
    margin-left: .25rem;
  }
  .rigth-buttons {
    width: 100%;
    display: flex;
    flex-direction: row-reverse;
  }
</style>

<figure bind:this={container}>
  {#if loading}
    <div class="loading-container">
      <Icon name="loading" color="#ddd"></Icon>
    </div>
  {/if}
  <video
    src='{src}'
    class:loading
    poster='{poster}'
    type='video/mp4'
    width="100%"
    preload="metadata"
    muted="{muted}"
    bind:this={video}
    on:loadedmetadata={loadedmetadata}
    on:timeupdate={timeupdate}
    on:canplaythrough={canplaythrough}
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
      <input on:change={setVolume} bind:this={volumeControl} type="range" min="0" value="1" max="1" step="0.01">
      <span class="currentTime">{`${(currentTime / 60) >> 0}:${((currentTime % 60) >> 0).toString().padStart(2, '0')}`}</span>
      <span class="separator">/</span>
      <span class="duration">{`${(max / 60) >> 0}:${((max % 60) >> 0).toString().padStart(2, '0')}`}</span>
      <div class="rigth-buttons">
        <button on:click|preventDefault={toggleFullscreen} class="toggleFullscreen"><Icon color="#ddd" name="{fullscreen ? 'minimize' : 'maximize'}"></Icon></button>
        {#if pipEnabled}
          <button on:click|preventDefault={togglePip} class="pip"><Icon color="#ddd" name="floating-panel"></Icon></button>
        {/if}
      </div>
    </div>
  </div>
</figure>
