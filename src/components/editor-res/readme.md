# editor-res



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type  | Default     |
| ------------ | ------------- | ----------- | ----- | ----------- |
| `headerList` | `header-list` |             | `any` | `undefined` |


## Dependencies

### Used by

 - [code-editor-updated](../code-editor-updated)

### Depends on

- [table-wrapper-updated](../table-wrapper-updated)

### Graph
```mermaid
graph TD;
  editor-res --> table-wrapper-updated
  table-wrapper-updated --> chips-list
  table-wrapper-updated --> custom-table
  custom-table --> table-search-modal
  custom-table --> loader-component
  custom-table --> plain-button
  table-search-modal --> radio-button-multiple
  code-editor-updated --> editor-res
  style editor-res fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
