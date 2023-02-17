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
  code-editor --> tabs-component
  code-editor --> loader-component
  tab-component --> editor-res
  tab-component --> editor-json-response-viewer
  editor-res --> chips-list
  editor-res --> query-result-table
  query-result-table --> table-search-modal
  query-result-table --> plain-button
  table-search-modal --> radio-button-multiple
  style editor-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*