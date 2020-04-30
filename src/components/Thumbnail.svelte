<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const s = tweened([
    [2, 2, 0],
    [3, 1, -2],
    [1, 5, 0]
  ], {
    duration: 400,
    easing: cubicOut
  })
  const b = tweened(-250, {
    duration: 400,
    easing: cubicOut
  })

  const handleMouseEnter = () => {
    s.set([
      [16, 24, 2],
      [6, 30, 5],
      [8, 10, -7]
    ])
    b.set(0)
  }
  const handleMouseLeave = () => {
    s.set([
      [2, 2, 0],
      [3, 1, -2],
      [1, 5, 0]
    ])
    b.set(-250)
  }
  export let source
  export let description
  export let link
  export let name
</script>

<style>
  span {
    width: 100%;
    position: absolute;
    display: block;
    bottom: -30px;
    background-color: #eee;
  }
  .thumbnail {
    width: 250px;
    display: inline-block;
    margin: 1rem .5rem;
  }
  .thumbnail a {
    position: relative;
    display: block;
    cursor: pointer;
    overflow: hidden;
  }
  .thumbnail a img {
    display: block;
    border-radius: 2px 2px 0 0;
    position: relative;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
  }
  @media (max-width: 768px) {
    .thumbnail {
      width: 100%;
    }
    .thumbnail a {
      position: relative;
      display: flex;
      cursor: pointer;
      overflow: hidden;
      justify-content: space-between;
      flex-direction: row;
      flex-wrap: nowrap;
      box-shadow: none !important;
    }
    .thumbnail a img {
      width: 50%;
    }
    .thumbnail .caption {
      position: unset;
      font-size: 1.3rem;
      padding: 0 1.2rem;
      letter-spacing: .01rem;
      text-align: left;
      /* text-overflow: ellipsis;
      white-space: nowrap; */
      overflow: hidden;
    }
  }
</style>

<div class="thumbnail">
  <a
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
    href="{link}"
    style="box-shadow: 0 {$s[0][0]}px {$s[0][1]}px {$s[0][2]}px rgba(0,0,0,0.14), 0 {$s[1][0]}px {$s[1][1]}px {$s[1][2]}px rgba(0,0,0,0.12), 0 {$s[2][0]}px {$s[2][1]}px {$s[2][2]}px rgba(0,0,0,0.2)">
    <img src="{source}" alt="{description}">
    <span style="bottom: {$b}px" class="caption">{name}</span>
  </a>
</div>