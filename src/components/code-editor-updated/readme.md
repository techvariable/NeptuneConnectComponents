# code-editor-updated



<!-- Auto Generated Below -->


## Properties

| Property            | Attribute            | Description | Type       | Default     |
| ------------------- | -------------------- | ----------- | ---------- | ----------- |
| `errorMessage`      | `error-message`      |             | `string`   | `undefined` |
| `isLoading`         | `is-loading`         |             | `boolean`  | `undefined` |
| `onClickRun`        | --                   |             | `Function` | `undefined` |
| `parameterDocument` | `parameter-document` |             | `string`   | `undefined` |
| `queryDocument`     | `query-document`     |             | `string`   | `undefined` |


## Dependencies

### Used by

 - [editor-page](../editor-page)

### Depends on

- [tabs-component](../tabs-component)
- [loader-component](../loader-component)

### Graph
```mermaid
graph TD;
  code-editor-updated --> tabs-component
  code-editor-updated --> loader-component
  editor-page --> code-editor-updated
  style code-editor-updated fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
