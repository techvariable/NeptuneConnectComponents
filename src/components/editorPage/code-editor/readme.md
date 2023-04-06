# code-editor



<!-- Auto Generated Below -->


## Properties

| Property          | Attribute | Description | Type       | Default     |
| ----------------- | --------- | ----------- | ---------- | ----------- |
| `fetchNavigators` | --        |             | `Function` | `undefined` |
| `formatter`       | --        |             | `Function` | `undefined` |
| `onClickRun`      | --        |             | `Function` | `undefined` |


## Dependencies

### Used by

 - [editor-page](../editor-page)

### Depends on

- [tabs-component](../tabs-component)
- [insert-node-modal](../insert-node-modal)
- [icon-label-submit-button](../../common/buttons/icon-label-submit-button)
- [loader-component](../../common/loader-component)

### Graph
```mermaid
graph TD;
  code-editor --> tabs-component
  code-editor --> insert-node-modal
  code-editor --> icon-label-submit-button
  code-editor --> loader-component
  insert-node-modal --> custom-drop-down
  insert-node-modal --> basic-dropdown
  editor-page --> code-editor
  style code-editor fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
