# users-component



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute       | Description | Type         | Default     |
| ------------------- | --------------- | ----------- | ------------ | ----------- |
| `allPermissions`    | --              |             | `{}[]`       | `undefined` |
| `parsedPermissions` | --              |             | `[]`         | `undefined` |
| `refresh`           | --              |             | `() => void` | `undefined` |
| `updatedUsers`      | `updated-users` |             | `any`        | `undefined` |
| `url`               | `url`           |             | `string`     | `undefined` |


## Dependencies

### Used by

 - [all-users](../all-users)

### Depends on

- [user-drop-down](../user-drop-down)

### Graph
```mermaid
graph TD;
  users-component --> user-drop-down
  user-drop-down --> backdrop-filter
  user-drop-down --> edit-user
  all-users --> users-component
  style users-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
