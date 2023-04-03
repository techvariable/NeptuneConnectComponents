# all-users



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute       | Description | Type     | Default     |
| --------------- | --------------- | ----------- | -------- | ----------- |
| `count`         | `count`         |             | `number` | `undefined` |
| `limitbackend`  | `limitbackend`  |             | `number` | `1`         |
| `offsetbackend` | `offsetbackend` |             | `number` | `0`         |
| `permissions`   | `permissions`   |             | `string` | `undefined` |
| `url`           | `url`           |             | `string` | `undefined` |
| `users`         | `users`         |             | `string` | `undefined` |


## Dependencies

### Depends on

- [users-component](../users-component)
- [pagination-component](../../common/pagination-component)

### Graph
```mermaid
graph TD;
  all-users --> users-component
  all-users --> pagination-component
  users-component --> user-drop-down
  user-drop-down --> backdrop-filter
  user-drop-down --> edit-user
  style all-users fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
