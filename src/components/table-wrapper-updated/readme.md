# table-wrapper-updated



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type       | Default     |
| ------------- | ------------- | ----------- | ---------- | ----------- |
| `api`         | `api`         |             | `any`      | `undefined` |
| `autocompute` | `autocompute` |             | `boolean`  | `undefined` |
| `data`        | --            |             | `object[]` | `undefined` |
| `headerList`  | --            |             | `object[]` | `undefined` |
| `rowPerPage`  | --            |             | `number[]` | `undefined` |


## Dependencies

### Used by

 - [editor-res](../editor-res)
 - [editor-res-updated](../editor-res-updated)

### Depends on

- [chips-list](../chips-list)
- [custom-table](../custom-table)

### Graph
```mermaid
graph TD;
  table-wrapper-updated --> chips-list
  table-wrapper-updated --> custom-table
  custom-table --> table-search-modal
  custom-table --> loader-component
  custom-table --> plain-button
  table-search-modal --> radio-button-multiple
  editor-res --> table-wrapper-updated
  editor-res-updated --> table-wrapper-updated
  style table-wrapper-updated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
