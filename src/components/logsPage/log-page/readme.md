# log-page



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type     | Default     |
| ------------- | ------------- | ----------- | -------- | ----------- |
| `navigators`  | `navigators`  |             | `string` | `undefined` |
| `permissions` | `permissions` |             | `string` | `undefined` |


## Dependencies

### Depends on

- [navigators-component](../../common/navigators-component)
- [query-logs](../query-logs)

### Graph
```mermaid
graph TD;
  log-page --> navigators-component
  log-page --> query-logs
  query-logs --> log-table-wrapper
  log-table-wrapper --> logs-table
  logs-table --> drop-down
  logs-table --> loader-component
  logs-table --> plain-button
  style log-page fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
