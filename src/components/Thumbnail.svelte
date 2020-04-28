<script>
  export let source
  export let description
  export let link
</script>

<style>
  .thumbnail {
    width: 250px;
    height: 250px;
    display: inline-block;
    margin: 1rem .5rem;
  }
  .thumbnail a {
    position: relative;
    display: block;
    cursor: pointer;
    overflow: hidden;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.14), 0 3px 1px -2px rgba(0,0,0,0.12), 0 1px 5px 0 rgba(0,0,0,0.2);
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
</style>

<div class="thumbnail">
  <a href="{link}">
    <img src="{source}" alt="{description}">
  </a>
</div>