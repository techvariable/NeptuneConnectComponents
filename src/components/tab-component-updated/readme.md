# tab-component-updated



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [editor-page](../editor-page)

### Depends on

- [editor-res-updated](../editor-res-updated)
- [res-editor](../res-editor)

### Graph
```mermaid
graph TD;
  tab-component-updated --> editor-res-updated
  tab-component-updated --> res-editor
  editor-res-updated --> chips-list
  editor-res-updated --> custom-table
  custom-table --> table-search-modal
  custom-table --> loader-component
  custom-table --> plain-button
  table-search-modal --> radio-button-multiple
  editor-page --> tab-component-updated
  style tab-component-updated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
