# editor-res-updated



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type  | Default     |
| ------------ | ------------- | ----------- | ----- | ----------- |
| `headerList` | `header-list` |             | `any` | `undefined` |
| `result`     | `result`      |             | `any` | `undefined` |


## Dependencies

### Depends on

- [table-wrapper-updated](../table-wrapper-updated)

### Graph
```mermaid
graph TD;
  editor-res-updated --> table-wrapper-updated
  table-wrapper-updated --> chips-list
  table-wrapper-updated --> custom-table
  custom-table --> table-search-modal
  custom-table --> loader-component
  custom-table --> plain-button
  table-search-modal --> radio-button-multiple
  style editor-res-updated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
