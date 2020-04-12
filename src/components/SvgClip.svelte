<script>
  export let src
  export let desc
  export let vertical = false
  export let left = 0
</script>

<style>
  img {
    clip-path: url(#clip);
    max-width: 100%;
    max-height: 350px;
    width: 40%;
    display: inline-block;
    position: absolute;
    left: 0;
    top: -4.5rem;
    transform: scale(.7);
    user-select: none;
  }
  @media (max-width: 768px) {
    img {
      width: 80%;
      top: -1.5rem;
      transform: scale(.7);
    }
    path {
      transform: scale(.5);
    }
  }
</style>

<img 
  src={src}
  alt={desc}
  style="transform: scale(.7) {vertical ? 'rotate(90deg)' : ''}; left: {left}px">

<svg height="0" width="0">
<defs>
  <clipPath id="clip">
    <path d="m447.85 109.35c-12.04 0-23.03 4.43-31.47 11.73 0 0 0-0.01-0.01-0.01 0 0-9.27 6.88-16.13-2.39v-109.12h-108.3c-10.41 6.91-3.13 16.7-3.13 16.7s-0.01 0-0.01 0.01c7.32 8.46 11.75 19.48 11.75 31.54 0 26.64-21.6 48.24-48.24 48.24s-48.24-21.6-48.24-48.24c0-11.53 4.05-22.11 10.8-30.41h-0.01c9.01-11.98-2.31-17.66-2.31-17.66l-113.19-0.18v114.31c-2.55 2.69-7.73 5.76-15.74-0.26v-0.03c-8.99-7.77-20.87-12.29-33.82-11.67-24.77 1.18-44.81 21.43-45.75 46.21-1.04 27.44 20.9 50.02 48.11 50.02 11.51 0 22.07-4.04 30.35-10.78v0.01c9.91-7.45 15.5-0.96 17.12 1.47v11.55h0.14v100.04h108.3c10.41-6.91 3.13-16.7 3.13-16.7s0.01 0 0.01-0.01c-7.32-8.46-11.75-19.48-11.75-31.54 0-26.64 21.6-48.24 48.24-48.24s48.24 21.6 48.24 48.24c0 11.53-4.05 22.11-10.8 30.41h0.01c-9.01 11.98 2.31 17.66 2.31 17.66l113.18 0.17v-114.46c1.91-2.65 7.42-8.19 16.86-1.1v-0.01c9.02 7.33 20.73 11.47 33.43 10.68 23.81-1.48 43.17-20.6 44.93-44.39 2.08-28.23-20.21-51.79-48.01-51.79z" fill="#FFFFFF" stroke-width="2" stroke="#8048B7"/>
  </clipPath>
</defs>
</svg>