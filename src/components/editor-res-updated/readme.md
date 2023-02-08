# editor-res-updated



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute            | Description | Type       | Default     |
| ------------------ | -------------------- | ----------- | ---------- | ----------- |
| `autocompute`      | `autocompute`        |             | `boolean`  | `undefined` |
| `errorMessage`     | `error-message`      |             | `string`   | `undefined` |
| `headerList`       | --                   |             | `object[]` | `undefined` |
| `isLoading`        | `is-loading`         |             | `boolean`  | `undefined` |
| `nodeData`         | --                   |             | `object[]` | `undefined` |
| `onTableOperation` | `on-table-operation` |             | `any`      | `undefined` |
| `rowPerPage`       | --                   |             | `number[]` | `undefined` |


## Dependencies

### Used by

 - [editor-page](../editor-page)

### Depends on

- [chips-list](../chips-list)
- [custom-table](../custom-table)

### Graph
```mermaid
graph TD;
  editor-res-updated --> chips-list
  editor-res-updated --> custom-table
  custom-table --> table-search-modal
  custom-table --> loader-component
  custom-table --> plain-button
  table-search-modal --> radio-button-multiple
  editor-page --> editor-res-updated
  style editor-res-updated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
