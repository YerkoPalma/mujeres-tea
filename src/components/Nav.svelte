<script>
  import Icon from './Icon.svelte'
  export let segment
</script>

<style>
  nav {
    font-weight: 300;
    padding: 0 1em;
  }

  button {
    background: transparent;
    border: none;
    padding: .5rem;
      cursor: pointer;
  }

  ul {
    margin: 0;
    padding: 0;
    position: fixed;
    width: 20%;
    top: 0;
    left: -20%;
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
  }
</style>

<button>
  <Icon name="menu" size="30"></Icon>
</button>
<nav>
  <ul>
    <li><a aria-current='{segment === undefined ? "page" : undefined}' href='.'>home</a></li>
    <li><a aria-current='{segment === "about" ? "page" : undefined}' href='about'>about</a></li>

    <!-- for the blog link, we're using rel=prefetch so that Sapper prefetches
         the blog data when we hover over the link or tap it on a touchscreen -->
    <li><a rel=prefetch aria-current='{segment === "blog" ? "page" : undefined}' href='blog'>blog</a></li>
  </ul>
</nav>
