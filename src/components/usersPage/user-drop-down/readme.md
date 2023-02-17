# user-drop-down



<!-- Auto Generated Below -->


## Properties

| Property    | Attribute   | Description | Type       | Default              |
| ----------- | ----------- | ----------- | ---------- | -------------------- |
| `email`     | `email`     |             | `string`   | `undefined`          |
| `option`    | --          |             | `string[]` | `['Delete', 'Edit']` |
| `submiturl` | `submiturl` |             | `string`   | `undefined`          |
| `url`       | `url`       |             | `string`   | `undefined`          |
| `userId`    | `user-id`   |             | `number`   | `0`                  |


## Dependencies

### Used by

 - [users-component](../users-component)

### Depends on

- [edit-user](../edit-user)

### Graph
```mermaid
graph TD;
  user-drop-down --> edit-user
  users-component --> user-drop-down
  style user-drop-down fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*