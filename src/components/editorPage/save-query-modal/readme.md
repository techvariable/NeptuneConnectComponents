# save-query-modal



<!-- Auto Generated Below -->


## Properties

| Property           | Attribute | Description | Type                         | Default     |
| ------------------ | --------- | ----------- | ---------------------------- | ----------- |
| `deleteQueryData`  | --        |             | `(deleteId: number) => void` | `undefined` |
| `queryDataFetcher` | --        |             | `() => void`                 | `undefined` |


## Dependencies

### Used by

 - [code-editor](../code-editor)

### Depends on

- [icon-button-basic](../../common/buttons/icon-button-basic)
- [icon-label-submit-button](../../common/buttons/icon-label-submit-button)

### Graph
```mermaid
graph TD;
  save-query-modal --> icon-button-basic
  save-query-modal --> icon-label-submit-button
  code-editor --> save-query-modal
  style save-query-modal fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
