# code-editor-updated



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type     | Default     |
| -------------- | --------------- | ----------- | -------- | ----------- |
| `doc`          | `doc`           |             | `any`    | `undefined` |
| `docParameter` | `doc-parameter` |             | `any`    | `undefined` |
| `headerList`   | --              |             | `{}[]`   | `[]`        |
| `response`     | `response`      |             | `any`    | `undefined` |
| `url`          | `url`           |             | `string` | `undefined` |


## Dependencies

### Used by

 - [editor-page](../editor-page)

### Depends on

- [tabs-component](../tabs-component)
- [loader-component](../loader-component)
- [editor-res-updated](../editor-res-updated)

### Graph
```mermaid
graph TD;
  code-editor-updated --> tabs-component
  code-editor-updated --> loader-component
  code-editor-updated --> editor-res-updated
  editor-res-updated --> table-wrapper-updated
  table-wrapper-updated --> chips-list
  table-wrapper-updated --> custom-table
  custom-table --> table-search-modal
  custom-table --> loader-component
  custom-table --> plain-button
  table-search-modal --> radio-button-multiple
  editor-page --> code-editor-updated
  style code-editor-updated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
