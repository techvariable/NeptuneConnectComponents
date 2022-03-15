import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView } from '@codemirror/view';
import { json } from '@codemirror/lang-json';

@Component({
  tag: 'res-editor',
  scoped: true,
})
export class ResEditor {
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
        <p class="text-gray-400 pt-4 pb-2">Output :</p>
        <div id="res-editor"></div>;
      </Host>
    );
  }
}
