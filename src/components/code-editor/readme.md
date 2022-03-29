# editor-container



<!-- Auto Generated Below -->


## Properties

| Property | Attribute | Description | Type     | Default     |
| -------- | --------- | ----------- | -------- | ----------- |
| `doc`    | `doc`     |             | `any`    | `'\n\n\n'`  |
| `url`    | `url`     |             | `string` | `undefined` |


## Dependencies

### Depends on

- [loader-component](../loader-component)
- [tab-component](../tab-component)

### Graph
```mermaid
graph TD;
  code-editor --> loader-component
  code-editor --> tab-component
  tab-component --> res-editor
  tab-component --> data-table
  style code-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
