import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import { json } from '@codemirror/lang-json';

@Component({
  tag: 'editor-json-response-viewer',
  scoped: true,
})
export class EditorJsonResponseViewer {
  @Element() element: HTMLElement;
  @State() view: EditorView;
  @State() state: EditorState;
  @Prop() doc: any;

  componentDidLoad() {
    this.state = EditorState.create({
      doc: this.doc,
      extensions: [basicSetup, EditorView.editable.of(false), json()],
    });

    this.view = new EditorView({
      state: this.state,
      parent: this.element.querySelector('#res-editor'),
    });
  }

  render() {
    return (
      <Host>
        <div style={{overflowY:"auto", display:"inline-block",height:"450px", width:"100%"}}  id="res-editor"></div>
      </Host>
    );
  }
}
