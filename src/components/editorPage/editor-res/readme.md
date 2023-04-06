# editor-res



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [tab-component](../tab-component)

### Depends on

- [edit-table-modal](../edit-table-modal)
- [chips-list](../chips-list)
- [table-search-modal-form](../table-search-modal-form)
- [data-table](../../common/items/data-table)

### Graph
```mermaid
graph TD;
  editor-res --> edit-table-modal
  editor-res --> chips-list
  editor-res --> table-search-modal-form
  editor-res --> data-table
  edit-table-modal --> tabs-component
  table-search-modal-form --> radio-button-multiple
  table-search-modal-form --> icon-label-submit-button
  data-table --> plain-button
  tab-component --> editor-res
  style editor-res fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
