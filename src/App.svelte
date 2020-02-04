<script>
  import { Router, link, Route } from 'svelte-routing'
  import Home from './pages/Home.svelte'
  import About from './pages/About.svelte'
  import Cursor, { handleMouseEnter, handleMouseLeave } from './components/Cursor.svelte'
  import { route } from './store.js'

  export let url = ''

  function go (event) {
    route.update(r => event.target.pathname)
    console.log(`going to ${event.target.pathname}`)
  }
</script>
<main class="page">
  <div class="page__inner">
    <Router {url}>
      <nav>
        <a href="/" on:click|preventDefault={go} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>Home</a>
        <a href="/about" on:click|preventDefault={go} on:mouseenter={handleMouseEnter} on:mouseleave={handleMouseLeave}>About</a>
      </nav>
      <Route path="about" component="{About}" pathname="/about"/>
      <Route path="/" ><Home pathname="/"/></Route>
      <Route><h1>Not Found</h1></Route>
    </Router>
    <Cursor />
  </div>
</main>
<style>
  nav {
    display: flex;
    width: 100%;
    height: 10%;
    clear: both;
    padding: 1rem 0;
  }
  a {
    text-decoration: none;
    padding: 1rem;
    letter-spacing: .1rem;
    font-weight: 500;
    color: #fff;
  }
  a:hover,
  a:visited {
    text-decoration: none;
    cursor: none;
  }
  a:first-child {
    margin-left: 1rem;
  }
  .page {
    cursor: none;
  }
  .page {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .page__inner {
    justify-content: center;
    width: 100%;
    position: relative;
    height: 100vh;
  }
</style>