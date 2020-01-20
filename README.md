# Trello.mini

### About

This is limited analogue of Trello. You can try create carts, columns and moving there. Also u can navigation and edit with keybord

#### Get started | [Demo](https://alexpach63.github.io/trello/build/index.html)

```sh
$ git clone git@github.com:alexpach63/trello.git
$ yarn i
$ yarn start
```

**Stack**
- react
- [mobx](https://github.com/mobxjs/mobx), [mobx-react](https://github.com/mobxjs/mobx-react)
- [sortableJs](https://github.com/SortableJS/Sortable)
- eject react-scripts for build

**Actions**
- create/edit cart
- create/edit column
- dnd for sort columns
- dnd for cards to sort between and inside columns

**Plan**
- [ ] add custom scroll on windows
- [ ] scroll to last created cart if is't visible
- [ ] create full height column dropzone for carts
- [ ] scroll to invisible carts on tab
- [ ] arrow navigation
- [ ] research model, add weight for carts and columns for sorting from api
- [ ] create HOC react-sortable
- [ ] add types for all