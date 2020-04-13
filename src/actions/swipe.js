/* global CustomEvent */

/**
 * Add an event to an eventtarget
 * @param {EventTarget} node
 * @param {string} event
 * @param {EventListener} handler
 * @returns {Function}
 */
function add (node, event, handler) {
  node.addEventListener(event, handler)
  return () => node.removeEventListener(event, handler)
}

/**
 * Dispatch customEvent 'swipe'
 * @param {EventTarget} node The target node
 * @param {string} direction The swipe direction
 * @param {number} distance The distance of the movement
 */
function dispatchSwipe (node, direction, distance) {
  node.dispatchEvent(new CustomEvent('swipe', {
    detail: { direction, distance }
  }))
}

/**
 * Dispatch customEvent 'swipestart'
 * @param {EventTarget} node The target node
 */
function dispatchSwipeStart (node) {
  node.dispatchEvent(new CustomEvent('swipestart'))
}

/**
 * Dispatch customEvent 'swipeend'
 * @param {EventTarget} node The target node
 */
function dispatchSwipeEnd (node) {
  node.dispatchEvent(new CustomEvent('swipeend'))
}

const TRESHOLD = 0

/**
 * Dispatch swipe events
 * @param {EventTarget} node The node target
 */
function swipePointer (node) {
  function handlePointerDown (event) {
    if (node.disabled) return
    dispatchSwipeStart(node)
    const removePointerUpHandler = add(node, 'pointerup', event => {
      dispatchSwipeEnd(node)
      removePointerUpHandler()
    })
    const removePointerMoveHandler = add(node, 'pointermove', event => {
      if (Math.abs(event.movementX) > TRESHOLD) {
        dispatchSwipe(node, event.movementX > 0 ? 'right' : 'left', event.movementX)
      } else if (Math.abs(event.movementY) > TRESHOLD) {
        dispatchSwipe(node, event.movementY > 0 ? 'down' : 'up', event.movementY)
      }
      removePointerMoveHandler()
    })
    setTimeout(removePointerMoveHandler, 300)
  }

  const removePointerDownHandler = add(node, 'pointerdown', handlePointerDown)
  return {
    destroy () {
      removePointerDownHandler()
    }
  }
}

function swipeLegacy (node) {
  function handleMouseDown (event) {
    dispatchSwipeStart(node)
    const removeMouseUpHandler = add(node, 'mouseup', (event) => {
      dispatchSwipeEnd(node)
      removeMouseUpHandler()
    })

    const removeMouseMoveHandler = add(node, 'mousemove', (event) => {
      if (Math.abs(event.movementX) > TRESHOLD) {
        dispatchSwipe(node, event.movementX > 0 ? 'right' : 'left', event.movementX)
      } else if (Math.abs(event.movementY) > TRESHOLD) {
        dispatchSwipe(node, event.movementY > 0 ? 'down' : 'up', event.movementY)
      }
      removeMouseMoveHandler()
    })
    setTimeout(removeMouseMoveHandler, 300)
  }

  function handleTouchStart (event) {
    if (event.changedTouches.length !== 1) return
    if (node.disabled) return

    event.preventDefault()
    dispatchSwipeStart(node)

    const touch = event.changedTouches[0]
    const { identifier, clientX, clientY } = touch

    const removeTouchEndHandler = add(node, 'touchend', (event) => {
      event.preventDefault()
      dispatchSwipeEnd(node)
      removeTouchEndHandler()
    })

    const removeTouchMoveHandler = add(node, 'touchmove', (event) => {
      const touch = Array.from(event.changedTouches).find(t => t.identifier === identifier)
      if (!touch) return

      if (Math.abs(touch.clientX - clientX) > TRESHOLD) {
        dispatchSwipe(node, touch.clientX - clientX > 0 ? 'right' : 'left', touch.clientX - clientX)
      } else if (Math.abs(touch.clientY - clientY) > TRESHOLD) {
        dispatchSwipe(node, touch.clientY - clientY > 0 ? 'down' : 'up', touch.clientY - clientY)
      }
      event.preventDefault()
      removeTouchMoveHandler()
    })
    setTimeout(removeTouchMoveHandler, 300)
  }

  const removeMouseDownHandler = add(node, 'mousedown', handleMouseDown)
  const removeTouchStartHandler = add(node, 'touchstart', handleTouchStart)

  return {
    destroy () {
      removeMouseDownHandler()
      removeTouchStartHandler()
    }
  }
}

export const swipe = typeof PointerEvent === 'function'
  ? swipePointer
  : swipeLegacy
