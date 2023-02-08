# editor-page



<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type     | Default     |
| --------- | --------- | ----------- | -------- | ----------- |
| `nodeurl` | `nodeurl` |             | `string` | `undefined` |
| `url`     | `url`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [node-item](../node-item)
- [code-editor-updated](../code-editor-updated)

### Graph
```mermaid
graph TD;
  editor-page --> node-item
  editor-page --> code-editor-updated
  node-item --> menu-drop-down
  code-editor-updated --> tabs-component
  code-editor-updated --> loader-component
  style editor-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
