<script>
  import { onMount } from 'svelte'
  // set the starting position of the cursor outside of the screen
  let clientX = -100
  let clientY = -100
  let lastX = 0
  let lastY = 0
  let isStuck = false
  let showCursor = false
  let group, stuckX, stuckY, fillOuterCursor

  let innerCursor
  let canvas

  const initCursor = () => {
    // add listener to track the current mouse position
    document.addEventListener('mousemove', e => {
      clientX = e.clientX
      clientY = e.clientY
    })
    
    // transform the innerCursor to the current mouse position
    // use requestAnimationFrame() for smooth performance
    const render = () => {
      innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`
      // if you are already using TweenMax in your project, you might as well
      // use TweenMax.set() instead
      // TweenMax.set(innerCursor, {
      //   x: clientX,
      //   y: clientY
      // })
      
      requestAnimationFrame(render)
    }
    requestAnimationFrame(render)
  }

  const initCanvas = () => {
    const shapeBounds = {
      width: 75,
      height: 75
    }
    paper.setup(canvas)
    const strokeColor = '#D1C4E9'
    const strokeWidth = 1
    const segments = 8
    const radius = 15
    
    // we'll need these later for the noisy circle
    const noiseScale = 150 // speed
    const noiseRange = 4 // range of distortion
    let isNoisy = false // state
    
    // the base shape for the noisy circle
    const polygon = new paper.Path.RegularPolygon(
      new paper.Point(0, 0),
      segments,
      radius
    )
    polygon.strokeColor = strokeColor
    polygon.strokeWidth = strokeWidth
    polygon.smooth()
    group = new paper.Group([polygon])
    group.applyMatrix = false
    
    const noiseObjects = polygon.segments.map(() => new SimplexNoise())
    let bigCoordinates = []
    
    // function for linear interpolation of values
    const lerp = (a, b, n) => {
      return (1 - n) * a + n * b
    }
    
    // function to map a value from one range to another range
    const map = (value, in_min, in_max, out_min, out_max) => {
      return (
        ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
      )
    }
    
    // the draw loop of Paper.js 
    // (60fps with requestAnimationFrame under the hood)
    paper.view.onFrame = event => {
      // using linear interpolation, the circle will move 0.2 (20%)
      // of the distance between its current position and the mouse
      // coordinates per Frame
      lastX = lerp(lastX, clientX, 0.2)
      lastY = lerp(lastY, clientY, 0.2)
      group.position = new paper.Point(lastX, lastY)
    }
  }

  onMount(() => {
    initCursor()
    initCanvas()
  })
</script>

<div bind:this={innerCursor} class='cursor cursor--small'></div>
<canvas bind:this={canvas} class='cursor cursor--canvas' resize></canvas>

<style>
  .cursor {
    position: fixed;
    left: 0;
    top: 0;
    pointer-events: none;
  }
  .cursor--small {
    width: 5px;
    height: 5px;
    left: -2.5px;
    top: -2.5px;
    border-radius: 50%;
    z-index: 11000;
    background: #fff;
  }
  .cursor--canvas {
    width: 100vw;
    height: 100vh;
    z-index: 12000;
  }
</style>