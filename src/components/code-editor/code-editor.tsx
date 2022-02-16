import { Component, h, Element, State, Prop } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import { java } from '@codemirror/lang-java';
// import { oneDarkTheme } from '@codemirror/theme-one-dark';

@Component({
  tag: 'code-editor',
  scoped: true,
})
export class CodeEditor {
  @Prop() isEditable: 'true' | 'false' = 'true';
  @Element() element: HTMLElement;
  @State() view: EditorView;
  @State() state: EditorState;

  componentWillLoad() {
    this.state = EditorState.create({
      doc: 'console.log("hi")\n\t\n',
      extensions: [basicSetup, EditorView.editable.of(this.parseToBoolean(this.isEditable)), java()],
    });

    this.view = new EditorView({ state: this.state, parent: this.element });
  }

  componentDidLoad() {
    console.log('editable', typeof this.isEditable);
  }

  disconnectedCallback() {
    this.view.destroy();
  }

  parseToBoolean(str) {
    if (str === 'true') {
      return true;
    }
    return false;
  }

  render() {
    return <div></div>;
  }
}
