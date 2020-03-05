<script context="module">
  import { createPopper } from '@popperjs/core'

  export let el
  let instance = null
  let trigger
  export function init(triggerNode) {
    trigger = triggerNode
  }
  function create () {
    instance = createPopper(trigger, el, {
      modifiers: [
        {
          name: 'offset',
          options: {
            offset: [0, 8]
          }
        }
      ]
    })
  }
  function destroy () {
    if (instance) {
      instance.destroy()
      instance = null
    }
  }
</script>
<script>
  export let visible = false

  $: if (el && visible) {
    el.setAttribute('data-show', '')
    create()
  } else if (el) {
    el.removeAttribute('data-show')
    destroy()
  }
</script>
<style>
  .tooltip {
    background: #333;
    color: white;
    font-weight: bold;
    padding: 4px 8px;
    font-size: 13px;
    border-radius: 4px;
    display: none;
  }
  :global(.tooltip[data-show]) {
    display: block;
  }
  .arrow,
  .arrow::before {
    position: absolute;
    width: 8px;
    height: 8px;
    z-index: -1;
  }

  .arrow::before {
    content: '';
    transform: rotate(45deg);
    background: #333;
  }
</style>
<div bind:this={el} class="tooltip" role="tooltip">
  <slot></slot>
  <div class="arrow" data-popper-arrow></div>
</div>
