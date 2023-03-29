# editor-page



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `url`    | `url`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [node-item](../node-item)
- [code-editor](../code-editor)
- [tab-component](../tab-component)

### Graph
```mermaid
graph TD;
  editor-page --> node-item
  editor-page --> code-editor
  editor-page --> tab-component
  node-item --> menu-drop-down
  menu-drop-down --> backdrop-filter
  code-editor --> tabs-component
  code-editor --> loader-component
  tab-component --> download-result-modal
  tab-component --> editor-res
  tab-component --> editor-json-response-viewer
  download-result-modal --> radio-button-multiple
  editor-res --> chips-list
  editor-res --> table-search-modal-form
  editor-res --> data-table
  table-search-modal-form --> radio-button-multiple
  data-table --> plain-button
  style editor-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
