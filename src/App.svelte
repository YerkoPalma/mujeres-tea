<script>
  import Cursor from './components/Cursor.svelte'
</script>
<main class="page">
  <div class="page__inner">
    <!-- The cursor elements --> 
    <Cursor />
  </div>
</main>
<style>
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
    display: flex;
    justify-content: center;
    width: 100%;
  }
</style>