# table-wrapper



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type       | Default     |
| ------------- | ------------- | ----------- | ---------- | ----------- |
| `api`         | `api`         |             | `any`      | `undefined` |
| `autocompute` | `autocompute` |             | `boolean`  | `undefined` |
| `headerList`  | --            |             | `object[]` | `undefined` |
| `rowPerPage`  | --            |             | `number[]` | `undefined` |


## Dependencies

### Used by

 - [main-component](../main-component)
 - [query-logs](../query-logs)

### Depends on

- [logs-table](../logs-table)

### Graph
```mermaid
graph TD;
  table-wrapper --> logs-table
  logs-table --> drop-down
  logs-table --> loader-component
  logs-table --> plain-button
  main-component --> table-wrapper
  query-logs --> table-wrapper
  style table-wrapper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
