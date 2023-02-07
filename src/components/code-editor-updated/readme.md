# code-editor-updated



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type     | Default      |
| -------------- | --------------- | ----------- | -------- | ------------ |
| `doc`          | `doc`           |             | `any`    | `'\n\n\n\n'` |
| `docParameter` | `doc-parameter` |             | `any`    | `'\n\n\n\n'` |
| `url`          | `url`           |             | `string` | `undefined`  |


## Dependencies

### Depends on

- [tabs-component](../tabs-component)
- [loader-component](../loader-component)
- [editor-res](../editor-res)

### Graph
```mermaid
graph TD;
  code-editor-updated --> tabs-component
  code-editor-updated --> loader-component
  code-editor-updated --> editor-res
  editor-res --> table-wrapper-updated
  table-wrapper-updated --> chips-list
  table-wrapper-updated --> custom-table
  custom-table --> table-search-modal
  custom-table --> loader-component
  custom-table --> plain-button
  table-search-modal --> radio-button-multiple
  style code-editor-updated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
