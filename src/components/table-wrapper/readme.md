# table-wrapper



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute | Description | Type       | Default     |
| ------------ | --------- | ----------- | ---------- | ----------- |
| `rowPerPage` | --        |             | `number[]` | `undefined` |
| `url`        | `url`     |             | `string`   | `undefined` |


## Dependencies

### Used by

 - [main-component](../main-component)

### Depends on

- [custom-table](../custom-table)

### Graph
```mermaid
graph TD;
  table-wrapper --> custom-table
  custom-table --> plain-button
  main-component --> table-wrapper
  style table-wrapper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
