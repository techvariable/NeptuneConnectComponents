# editor-page



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `url`    | `url`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [node-item](../node-item)
- [code-editor-updated](../code-editor-updated)
- [tab-component-updated](../tab-component-updated)

### Graph
```mermaid
graph TD;
  editor-page --> node-item
  editor-page --> code-editor-updated
  editor-page --> tab-component-updated
  node-item --> menu-drop-down
  code-editor-updated --> tabs-component
  code-editor-updated --> loader-component
  tab-component-updated --> editor-res-updated
  tab-component-updated --> res-editor
  editor-res-updated --> chips-list
  editor-res-updated --> custom-table
  custom-table --> table-search-modal
  custom-table --> loader-component
  custom-table --> plain-button
  table-search-modal --> radio-button-multiple
  style editor-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
