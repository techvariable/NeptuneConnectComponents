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
  download-result-modal --> icon-label-submit-button
  editor-res --> edit-table-modal
  editor-res --> chips-list
  editor-res --> table-search-modal-form
  editor-res --> data-table
  edit-table-modal --> tabs-component
  table-search-modal-form --> radio-button-multiple
  table-search-modal-form --> icon-label-submit-button
  data-table --> plain-button
  editor-page --> tab-component
  style tab-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
