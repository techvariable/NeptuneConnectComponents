import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'code-editor',
  scoped: true,
})
export class CodeEditor {
  @Prop() headerText: string;
  @Prop() url: string;
  render() {
    return (
      <fluid-container>
        <req-editor header={this.headerText} url={this.url}></req-editor>
      </fluid-container>
    );
  }
}
