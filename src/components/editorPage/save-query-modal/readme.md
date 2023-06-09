# save-query-modal



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute | Description | Type                         | Default     |
| ------------------ | --------- | ----------- | ---------------------------- | ----------- |
| `deleteQueryData`  | --        |             | `(deleteId: number) => void` | `undefined` |
| `queryDataFetcher` | --        |             | `() => Promise<void>`        | `undefined` |


## Dependencies

### Used by

 - [code-editor](../code-editor)

### Depends on

- [icon-button-basic](../../common/buttons/icon-button-basic)
- [data-table](../../common/items/data-table)
- [icon-label-submit-button](../../common/buttons/icon-label-submit-button)

### Graph
```mermaid
graph TD;
  save-query-modal --> icon-button-basic
  save-query-modal --> data-table
  save-query-modal --> icon-label-submit-button
  data-table --> plain-button
  code-editor --> save-query-modal
  style save-query-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
