# editor-res



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [tab-component](../tab-component)

### Depends on

- [chips-list](../chips-list)
- [query-result-table](../query-result-table)

### Graph
```mermaid
graph TD;
  editor-res --> chips-list
  editor-res --> query-result-table
  query-result-table --> table-search-modal
  query-result-table --> table-data-rows
  query-result-table --> plain-button
  table-search-modal --> radio-button-multiple
  table-data-rows --> table-data
  tab-component --> editor-res
  style editor-res fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
