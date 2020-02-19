<script>
  import { Router, link, Route } from 'svelte-routing'
  import Home from './pages/Home.svelte'
  import About from './pages/About.svelte'
  import Menu from './components/Menu.svelte'
  import Cursor, { plainCursor } from './components/Cursor.svelte'
  import { route } from './store.js'

  export let url = ''

  function go (event) {
    route.update(r => event.target.pathname)
  }
</script>
<main class="page">
  <div class="page__inner">
    <Router {url}>
      <Menu>
        <ul>
          <li><a href="/" on:click|preventDefault={go} use:plainCursor>Home</a></li>
          <li><a href="/about" on:click|preventDefault={go} use:plainCursor>About</a></li>
          <li><a href>Clients</a></li>
          <li><a href>Blog</a></li>
          <li><a href>Contact</a></li>
        </ul>
        <ul>
          <li><a href="http://www.twitter.com/codrops" class="bt-icon icon-twitter">Twitter</a></li>
          <li><a href="http://www.facebook.com/pages/Codrops/159107397912" class="bt-icon icon-facebook">Facebook</a></li>
        </ul>
      </Menu>
      <Route path="about" component="{About}" pathname="/about"/>
      <Route path="/" ><Home pathname="/"/></Route>
      <Route><h1>Not Found</h1></Route>
    </Router>
    <Cursor />
  </div>
</main>
<style>
  ul {
    position: fixed;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  ul:first-of-type {
    top: 75px;
    left: 0;
  }

  ul:nth-of-type(2) {
    right: 0;
    bottom: 0;
  }

  .bt-menu ul li,
  .bt-menu ul li a {
    display: block;
  }

  .bt-menu ul:nth-of-type(2) li {
    float: left;
    font-size: 0px;
  }

  .bt-menu ul li {
    visibility: hidden;
    opacity: 0;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.2s, visibility 0s 0.3s;
    transition: transform 0.3s, opacity 0.2s, visibility 0s 0.3s;
  }

  .bt-menu.bt-menu-open ul:first-of-type li,
  .bt-menu.bt-menu-open ul:nth-of-type(2) li {
    visibility: visible;
    opacity: 1;
    -webkit-transition: -webkit-transform 0.3s, opacity 0.3s 0.1s;
    transition: transform 0.3s, opacity 0.3s;
  }

  /* First menu */
  .bt-menu ul:first-of-type li {
    width: 150px;
    height: 50px;
    line-height: 50px;
    -webkit-transform: translate3d(-100%,50%,0);
    transform: translate3d(-100%,50%,0);
  }

  .bt-menu.bt-menu-open ul:first-of-type li {
    -webkit-transform: translate3d(0,0,0);
    transform: translate3d(0,0,0);
  }

  /* Second menu */
  .bt-menu ul:nth-of-type(2) li {
    width: 60px;
    height: 50px;
    line-height: 50px;
    -webkit-transform: scale(0);
    transform: scale(0);
  }

  .bt-menu.bt-menu-open ul:nth-of-type(2) li:first-child { 
    -webkit-transition-delay: 0.1s;
    transition-delay: 0.1s;
  }

  .bt-menu.bt-menu-open ul:nth-of-type(2) li:nth-child(2) { 
    -webkit-transition-delay: 0.2s;
    transition-delay: 0.2s;
  }

  .bt-menu.bt-menu-open ul:nth-of-type(2) li:nth-child(3) { 
    -webkit-transition-delay: 0.3s;
    transition-delay: 0.3s;
  }

  .bt-menu.bt-menu-open ul:nth-of-type(2) li:nth-child(4) {
    -webkit-transition-delay: 0.4s;
    transition-delay: 0.4s;
  }

  .bt-menu.bt-menu-open ul:nth-of-type(2) li {
    -webkit-transform: scale(1);
    transform: scale(1);
  }

  .bt-menu ul li a {
    display: block;
    outline: none;
    text-decoration: none;
  }

  .bt-menu ul:first-of-type li a {
    padding: 0 20px;
    box-shadow: inset 0 1px rgba(0,0,0,0.2);
    color: #fff;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 1em;
    -webkit-transition: color 0.2s;
    transition: color 0.2s;
  }

  .bt-menu ul:first-of-type li:last-child a {
    box-shadow: inset 0 1px rgba(0,0,0,0.2), inset 0 -1px rgba(0,0,0,0.2);
  }

  .bt-menu ul:nth-of-type(2) li a {
    color: transparent;
    text-align: center;
    font-size: 0px;
  }

  .bt-menu ul li a:before {
    color: #fff;
    font-size: 24px;
    -webkit-transition: color 0.2s;
    transition: color 0.2s;
  }

  .bt-menu ul:first-of-type li a:hover,
  .bt-menu ul:first-of-type li a:focus,
  .bt-menu ul li a:hover:before,
  .bt-menu ul li a:focus:before {
    color: #1abc9c;
  }
  .page, .page a {
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