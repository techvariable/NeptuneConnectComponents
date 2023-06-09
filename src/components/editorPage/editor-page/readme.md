# editor-page



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default     |
| ------------- | ------------- | ----------- | -------- | ----------- |
| `permissions` | `permissions` |             | `string` | `undefined` |
| `url`         | `url`         |             | `string` | `undefined` |


## Dependencies

### Depends on

- [icon-button-basic](../../common/buttons/icon-button-basic)
- [node-item](../node-item)
- [code-editor](../code-editor)
- [tab-component](../tab-component)

### Graph
```mermaid
graph TD;
  editor-page --> icon-button-basic
  editor-page --> node-item
  editor-page --> code-editor
  editor-page --> tab-component
  node-item --> menu-drop-down
  menu-drop-down --> backdrop-filter
  code-editor --> tabs-component
  code-editor --> save-query-modal
  code-editor --> insert-node-modal
  code-editor --> icon-button-basic
  code-editor --> icon-label-submit-button
  code-editor --> text-field
  code-editor --> loader-component
  save-query-modal --> icon-button-basic
  save-query-modal --> data-table
  save-query-modal --> icon-label-submit-button
  data-table --> plain-button
  insert-node-modal --> icon-button-basic
  insert-node-modal --> custom-drop-down
  insert-node-modal --> basic-dropdown
  tab-component --> toggle-button
  tab-component --> download-result-modal
  tab-component --> editor-res
  tab-component --> editor-json-response-viewer
  download-result-modal --> icon-button-basic
  download-result-modal --> radio-button-multiple
  download-result-modal --> icon-label-submit-button
  editor-res --> edit-table-modal
  editor-res --> chips-list
  editor-res --> table-search-modal-form
  editor-res --> data-table
  edit-table-modal --> tabs-component
  edit-table-modal --> icon-label-submit-button
  table-search-modal-form --> radio-button-multiple
  table-search-modal-form --> icon-label-submit-button
  style editor-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
