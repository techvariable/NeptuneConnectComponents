# table-wrapper-updated



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type       | Default     |
| ------------- | ------------- | ----------- | ---------- | ----------- |
| `api`         | `api`         |             | `any`      | `undefined` |
| `autocompute` | `autocompute` |             | `boolean`  | `undefined` |
| `headerList`  | --            |             | `object[]` | `undefined` |
| `rowPerPage`  | --            |             | `number[]` | `undefined` |


## Dependencies

### Used by

 - [editor-res](../editor-res)

### Depends on

- [custom-table](../custom-table)

### Graph
```mermaid
graph TD;
  table-wrapper-updated --> custom-table
  custom-table --> drop-down
  custom-table --> loader-component
  custom-table --> plain-button
  editor-res --> table-wrapper-updated
  style table-wrapper-updated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
