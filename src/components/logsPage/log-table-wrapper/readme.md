# log-table-wrapper



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

 - [query-logs](../query-logs)

### Depends on

- [logs-table](../logs-table)

### Graph
```mermaid
graph TD;
  log-table-wrapper --> logs-table
  logs-table --> drop-down
  logs-table --> loader-component
  logs-table --> plain-button
  query-logs --> log-table-wrapper
  style log-table-wrapper fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
