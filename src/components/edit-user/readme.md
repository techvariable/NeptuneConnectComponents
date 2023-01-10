# edit-user



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type         | Default     |
| ------------- | ------------- | ----------- | ------------ | ----------- |
| `ismodelopen` | `ismodelopen` |             | `boolean`    | `undefined` |
| `toggle`      | --            |             | `() => void` | `undefined` |
| `url`         | `url`         |             | `string`     | `undefined` |
| `value`       | `value`       |             | `string`     | `undefined` |


## Dependencies

### Used by

 - [menu-down](../menu-down)

### Depends on

- [multi-select](../multi-select)

### Graph
```mermaid
graph TD;
  edit-user --> multi-select
  multi-select --> choicesjs-stencil
  menu-down --> edit-user
  style edit-user fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
