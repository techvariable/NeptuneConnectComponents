import { Component, h, Element, State } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import { javascript } from '@codemirror/lang-javascript';

@Component({
  tag: 'code-editor',
  scoped: true,
})
export class CodeEditor {
  @Element() element: HTMLElement;
  @State() view: EditorView;
  @State() state: EditorState;

  componentWillLoad() {
    this.state = EditorState.create({
      doc: 'console.log("hello world")',
      extensions: [basicSetup, javascript()],
    });

    this.view = new EditorView({ state: this.state, parent: this.element });
  }

  disconnectedCallback() {
    this.view.destroy();
  }

  render() {
    return <div></div>;
  }
}
