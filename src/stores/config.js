import { writable, derived } from 'svelte/store'

const theme = {
  dark: {
    primary: '#fff',
    secondary: '#eee'
  },
  light: {
    primary: '#2f363d',
    secondary: '#ddd'
  }
}
export const isOpen = writable(false)

export const isDarkThemed = writable(false)

export const iconColor = derived([ isOpen, isDarkThemed ], ([$isOpen, $isDarkThemed]) => {
  if ($isOpen) {
    if ($isDarkThemed) {
      return theme.dark.primary
    } else {
      return theme.light.secondary
    }
  } else {
    if ($isDarkThemed) {
      return theme.dark.secondary
    } else {
      return theme.light.primary
    }
  }
})

// export const config = writable({
//   theme: 'light',
//   navOpen: false,
//   land: 'ES-cl',
//   nav: {
//     links: ['Home', 'About'],
//     current: 'Home'
//   },
//   toolbar: {
//     icons: ['speak', 'themeSwitch']
//   }
// })
