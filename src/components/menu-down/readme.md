# menu-down



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type       | Default              |
| -------- | --------- | ----------- | ---------- | -------------------- |
| `email`  | `email`   |             | `string`   | `undefined`          |
| `option` | --        |             | `string[]` | `['Delete', 'Edit']` |
| `url`    | `url`     |             | `string`   | `undefined`          |
| `userId` | `user-id` |             | `number`   | `0`                  |


## Dependencies

### Used by

 - [users-component](../users-component)

### Depends on

- [edit-user](../edit-user)

### Graph
```mermaid
graph TD;
  menu-down --> edit-user
  users-component --> menu-down
  style menu-down fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
