# query-logs



<!-- Auto Generated Below -->


## Dependencies

### Used by

 - [log-page](../log-page)

### Depends on

- [log-table-wrapper](../log-table-wrapper)

### Graph
```mermaid
graph TD;
  query-logs --> log-table-wrapper
  log-table-wrapper --> logs-table
  logs-table --> drop-down
  logs-table --> loader-component
  logs-table --> plain-button
  log-page --> query-logs
  style query-logs fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
