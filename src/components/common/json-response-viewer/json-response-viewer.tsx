import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import { json } from '@codemirror/lang-json';

@Component({
  tag: 'json-response-viewer',
  scoped: true,
})
export class JsonResponseViewer {
  @Element() element: HTMLElement;
  @State() view: EditorView;
  @State() state: EditorState;
  @Prop() doc: any;
  @Prop() responseLabel: 'result' | 'error';

  labelTitle = {
    result: {
      tag: 'Success 200',
      class: 'text-green-700 text-sm font-semibold pb-2',
    },
    error: {
      tag: 'Error',
      class: 'text-red-700 text-sm font-semibold pb-2',
    },
  };

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
        <div class="bg-gray-100">
        <p class={this.labelTitle[this.responseLabel].class}>{this.labelTitle[this.responseLabel].tag}</p>
        </div>
        <div style={{overflowY:"auto", display:"inline-block",height:"450px", width:"100%"}}  id="res-editor"></div>
      </Host>
    );
  }
}
