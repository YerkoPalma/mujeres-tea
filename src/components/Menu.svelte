<script>
  import { magneticCursor } from './Cursor.svelte'
  let isOpen = false
  let handler = toggle
  let noop = () => {}

  function close () {
    isOpen = false
    handler = noop
  }

  function toggle () {
    if (isOpen) {
      isOpen = false
    } else {
      isOpen = true
      handler = close
    }
  }
</script>
<nav class="bt-menu" class:bt-menu-open="{isOpen}">
  <a href on:click|preventDefault|stopPropagation ="{toggle}" use:magneticCursor class="bt-menu-trigger"><span>Menu</span></a>
  <slot></slot>
  <div on:click="{handler}" class="bt-overlay"></div>
</nav>
<style>
  .bt-menu {
    position: fixed;
    top: 0;
    left: 0;
    width: calc(100% - 180px);
    height: 0;
    border-width: 0px;
    border-style: solid;
    border-color: #333;
    background-color: rgba(0,0,0,0);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: border-width 0.3s, background-color 0.3s, height 0s 0.3s;
    transition: border-width 0.3s, background-color 0.3s, height 0s 0.3s;
  }

  .bt-menu.bt-menu-open {
    height: calc(100vh - 80px);
    border-width: 30px 30px 50px 150px;
    background-color: rgba(0,0,0,0.3);
    -webkit-transition: border-width 0.3s, background-color 0.3s;
    transition: border-width 0.3s, background-color 0.3s;
  }

  .bt-overlay {
    position: absolute;
    width: 100%;
  }

  .bt-menu-open .bt-overlay {
    height: 100%;
  }

  .bt-menu-trigger {
    position: fixed;
    top: 10px;
    left: 20px;
    z-index: 100;
    display: block;
    width: 50px;
    height: 50px;
  }

  .bt-menu-trigger span {
    position: absolute;
    top: 50%;
    left: 0;
    display: block;
    width: 100%;
    height: 8%;
    background-color: #fff;
    font-size: 0px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-transition: background-color 0.3s;
    transition: background-color 0.3s;
  }

  .bt-menu-trigger span:before,
  .bt-menu-trigger span:after {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    background: #fff;
    content: '';
    -webkit-transition: -webkit-transform 0.3s;
    transition: transform 0.3s;
  }

  .bt-menu-trigger span:before {
    -webkit-transform: translateY(-250%);
    transform: translateY(-250%);
  }

  .bt-menu-trigger span:after {
    -webkit-transform: translateY(250%);
    transform: translateY(250%);
  }

  .bt-menu-open .bt-menu-trigger span:before {
    -webkit-transform: translateY(-300%);
    transform: translateY(-300%);
  }

  .bt-menu-open .bt-menu-trigger span:after {
    -webkit-transform: translateY(300%);
    transform: translateY(300%);
  }

  
</style>