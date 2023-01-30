# tab-component



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type  | Default     |
| --------------- | ---------------- | ----------- | ----- | ----------- |
| `doc`           | `doc`            |             | `any` | `undefined` |
| `responseLabel` | `response-label` |             | `any` | `undefined` |


## Dependencies

### Used by

 - [code-editor](../code-editor)
 - [code-editor-updated](../code-editor-updated)

### Depends on

- [res-editor](../res-editor)
- [data-table](../data-table)

### Graph
```mermaid
graph TD;
  tab-component --> res-editor
  tab-component --> data-table
  data-table --> plain-button
  code-editor --> tab-component
  code-editor-updated --> tab-component
  style tab-component fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
