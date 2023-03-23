# tab-component



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [editor-page](../editor-page)

### Depends on

- [toggle-button](../../common/toggle-button)
- [download-result-modal](../download-result-modal)
- [editor-res](../editor-res)
- [editor-json-response-viewer](../editor-json-response-viewer)

### Graph
```mermaid
graph TD;
  tab-component --> toggle-button
  tab-component --> download-result-modal
  tab-component --> editor-res
  tab-component --> editor-json-response-viewer
  download-result-modal --> radio-button-multiple
  editor-res --> chips-list
  editor-res --> query-result-table
  query-result-table --> edit-table-modal
  query-result-table --> table-search-modal
  query-result-table --> table-data-rows
  query-result-table --> plain-button
  table-search-modal --> radio-button-multiple
  table-data-rows --> table-data
  editor-page --> tab-component
  style tab-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
