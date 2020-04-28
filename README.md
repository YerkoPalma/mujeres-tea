# TODO

- [x] Separate Toolbar component from Nav component
- [x] Make global config as store
- [ ] Make talk function an action
- [ ] Define layer system
- [ ] Define DB system

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