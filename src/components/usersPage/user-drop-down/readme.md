# user-drop-down



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute | Description | Type     | Default     |
| ------------------- | --------- | ----------- | -------- | ----------- |
| `allPermissions`    | --        |             | `{}[]`   | `undefined` |
| `email`             | `email`   |             | `string` | `undefined` |
| `parsedPermissions` | --        |             | `[]`     | `undefined` |
| `refresh`           | `refresh` |             | `any`    | `undefined` |
| `url`               | `url`     |             | `string` | `undefined` |
| `userId`            | `user-id` |             | `number` | `0`         |


## Dependencies

### Used by

 - [users-component](../users-component)

### Depends on

- [backdrop-filter](../../common/backdrop-filter)
- [edit-user](../edit-user)

### Graph
```mermaid
graph TD;
  user-drop-down --> backdrop-filter
  user-drop-down --> edit-user
  edit-user --> icon-label-submit-button
  users-component --> user-drop-down
  style user-drop-down fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
