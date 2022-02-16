import { Component, h, Element, State, Prop } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import { java } from '@codemirror/lang-java';
import { json } from '@codemirror/lang-json';
// import { oneDarkTheme } from '@codemirror/theme-one-dark';

@Component({
  tag: 'code-editor',
  scoped: true,
})
export class CodeEditor {
  @Prop() isEditable: 'true' | 'false' = 'true';
  @Prop() language: 'java' | 'json' = 'java';
  @Element() element: HTMLElement;
  @State() view: EditorView;
  @State() state: EditorState;

  componentWillLoad() {
    this.state = EditorState.create({
      doc: 'console.log("hi")\n\n\n\n',
      extensions: [basicSetup, EditorView.editable.of(this.parseToBoolean(this.isEditable)), this.language === 'java' ? java() : json()],
    });

    this.view = new EditorView({ state: this.state, parent: this.element });
  }

  disconnectedCallback() {
    this.view.destroy();
  }

  parseToBoolean(str) {
    if (str === 'true') return true;
    return false;
  }

  render() {
    return <div></div>;
  }
}
