# TODO

- [x] Separate Toolbar component from Nav component
- [ ] Make global config as store
- [ ] Make talk function an action
- [ ] Define layer system

## Misc

Config object should have

```js
{
  theme: 'light',
  navOpen: false,
  land: 'ES-cl',
  nav: {
    links: ['Home', 'About'],
    current: 'Home'
  },
  toolbar: {
    icons: ['speak', 'themeSwitch']
  }
}
```