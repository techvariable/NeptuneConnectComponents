import { Component, h } from '@stencil/core';

@Component({
  tag: 'editor-container',
  scoped: true,
})
export class EditorContainer {
  render() {
    return (
      <fluid-container>
        <code-editor header="Write your Gremlin Query Here" language="java" isEditable="true" url="http://localhost:5000/query" runBtn="on"></code-editor>
      </fluid-container>
    );
  }
}
