import { Component, h, Element, State, Prop, Host, Watch } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { java } from '@codemirror/lang-java';
import { json } from '@codemirror/lang-json';
import { isValidParameterJson } from '../../utils/utils';

const TAB_LIST = [{ name: "Query", className: 'editor' }, { name: "Parameter", className: 'parameter' }]

@Component({
  tag: 'code-editor-updated',
  scoped: true,
})
export class CodeEditorUpdated {
  @Prop() queryDocument: string;
  @Prop() parameterDocument: string;
  @Prop() onClickRun: Function;
  @Prop() errorMessage: string | null;
  @Prop() isLoading: boolean;

  @State() viewQuery: EditorView;
  @State() stateQuery: EditorState;

  @State() viewParameter: EditorView;
  @State() stateParameter: EditorState;

  @State() activeIndex: number = 0;
  @State() Error: string | null;

  @Element() element: HTMLElement;

  componentWillLoad(){
    this.Error = this.errorMessage;
  }

  @Watch('queryDocument')
  onQueryDocumentUpdate(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      console.log("new query",newValue)
      let transactionToAdd = this.viewQuery.state.update({
        changes: { from: 0, to: this.viewQuery.state.doc.toString().length, insert: `${newValue}` },
      });
      this.viewQuery.dispatch(transactionToAdd);
    }
  }

  @Watch('errorMessage')
  onErrorMessageUpdate(newValue: string, oldValue: string) {
    console.log(newValue,oldValue)
    if (newValue !== oldValue) {
      this.Error = newValue;
    }
  }

  @Watch('parameterDocument')
  onParameterDocumentUpdate(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      console.log("new parameter",newValue)
      let transactionToAdd = this.viewParameter.state.update({
        changes: { from: 0, to: this.viewParameter.state.doc.toString().length, insert: `${newValue}` },
      });
      this.viewParameter.dispatch(transactionToAdd);
    }
  }

  tabClickHandler = (index) => {
    this.activeIndex = index;
  }

  componentDidLoad() {
    this.stateQuery = EditorState.create({
      doc: this.queryDocument,
      extensions: [
        basicSetup,
        java(),
        this.onCtrlShiftEnter(),
      ],
    });

    this.viewQuery = new EditorView({
      state: this.stateQuery,
      parent: this.element.querySelector('#editor'),
    });

    this.stateParameter = EditorState.create({
      doc: this.parameterDocument,
      extensions: [
        basicSetup,
        json(),
        this.onCtrlShiftEnter(),
      ],
    });

    this.viewParameter = new EditorView({
      state: this.stateParameter,
      parent: this.element.querySelector('#parameter'),
    });
  }

  onCtrlShiftEnter() {
    return keymap.of([
      {
        key: 'Ctrl-Shift-Enter',
        run() {
          this.onClickRun();
          return true;
        },
      },
    ]);
  }

  clickRun(viewQuery,viewParameter){
    this.errorMessage = null;
    let transactionQuery = viewQuery.state.update();
    const query = transactionQuery.state.doc.toString().trim();
    this.viewQuery.dispatch(transactionQuery);

    let transactionParameter = viewParameter.state.update();
    const parameter = transactionParameter.state.doc.toString().trim();
    this.viewParameter.dispatch(transactionParameter);

    console.log("QQQQQQQQQQQQq",query,"PPPPPPPPPP",parameter);
    const validObj = isValidParameterJson(query,parameter);
    console.log(validObj);
    if(validObj.isValid){
      console.log("no error");
      this.onClickRun(query,parameter);
      this.Error = null;
    }else{
      console.log("Error",validObj.error);
      this.errorMessage = validObj.error;
    }
  }

  render() {
    return (
      <Host>
        <tabs-component activeIndex={this.activeIndex} tabslist={TAB_LIST} tabClickHandler={this.tabClickHandler}></tabs-component>
        <div class="border border-gray-300 shadow-gray-300   p-3">
          {TAB_LIST.map(item => (
            item.className === 'editor' ? <div id={item.className} class="border border-gray-300" style={{ display: this.activeIndex === 1 ? "none" : "block" }}></div> :
              <div id={item.className} class="border border-gray-300" style={{ display: this.activeIndex === 0 ? "none" : "block" }}></div>
          ))}
          {this.Error != null ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full mt-4 mb-6">{this.errorMessage}</p> : null}

          <div class="flex justify-between">
            <button
              title="Ctrl+Shift+Enter to run"
              onClick={() => this.clickRun(this.viewQuery,this.viewParameter)}
              class="flex text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 mt-2 py-2 hover:bg-gray-200 hover:text-gray-800"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
              </svg>
              Run
            </button>
            <div>{this.isLoading && <loader-component></loader-component>}</div>
          </div>
        </div>
      </Host>
    );
  }
}
