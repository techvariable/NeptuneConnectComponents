import { Component, h, Element, State, Prop, Host, Watch } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
import { java } from '@codemirror/lang-java';
import { json } from '@codemirror/lang-json';
import axios from 'axios';

import {formatJSON, isValidParameterJson } from '../../utils/utils';
@Component({
  tag: 'code-editor-updated',
  scoped: true,
})
export class CodeEditorUpdated {
  @Prop() url: string;
  @Prop() doc: any;
  @Prop() docParameter:any;
  // @Prop() nodeData:{}[];
  @Prop() response: any;
  @State() responseLabel: any = ['result'];
  @State() viewQuery: EditorView;
  @State() stateQuery: EditorState;

  @State() viewParameter: EditorView;
  @State() stateParameter: EditorState;

  @State() isLoading = false;
  @Prop() headerList: {}[] = [];
  @Element() element: HTMLElement;
  @State() tabslist : {name:string,className:string}[] =[{name:"Query", className: 'editor'},{name:"Parameter",className:'parameter'}];
  @State() activeIndex: number = 0;
  @State() errorMessage: string = '';

  @Watch('doc')
  validateDateDoc(newValue, oldValue) {
      if(newValue !== oldValue) {
        let transactionToAdd = this.viewQuery.state.update({
          changes: { from: 0, to: this.viewQuery.state.doc.toString().length, insert: `${formatJSON(newValue)}` },
        });
        this.viewQuery.dispatch(transactionToAdd);
          // throw new Error('username is required');
      }
  }

  @Watch('docParameter')
  validateDateDocParameter(newValue, oldValue) {
      if(newValue !== oldValue) {
        let transactionToAdd = this.viewParameter.state.update({
          changes: { from: 0, to: this.viewParameter.state.doc.toString().length, insert: `${formatJSON(newValue)}` },
        });
        this.viewParameter.dispatch(transactionToAdd);
          // throw new Error('username is required');
      }
  }

  tabClickHandler=(index)=>{
    this.activeIndex = index;
  }

  componentDidLoad() {
    this.stateQuery = EditorState.create({
      doc: this.doc,
      extensions: [
        basicSetup,
        java(),
        // keymap.of(defaultKeymap),
        this.dummyKeymap(),
      ],
    });

    this.viewQuery = new EditorView({
      state: this.stateQuery,
      parent: this.element.querySelector('#editor'),
    });

    this.stateParameter = EditorState.create({
      doc: this.docParameter,
      extensions: [ 
        basicSetup,
        json(),
        // keymap.of(defaultKeymap),
        this.dummyKeymap(),
      ],
    });

    this.viewParameter = new EditorView({
      state: this.stateParameter,
      parent: this.element.querySelector('#parameter'),
    });
    // console.log('this is response label', this.responseLabel);
    // console.log('This sis response', this.response);

  //   let allKeys = [];
  //   this.response.map(obj => {
  //     let keys = Object.keys(obj);
  //     allKeys = [...new Set([...allKeys, ...keys])];
  //   });

  //   allKeys.map(key=>{
  //     let obj = {};
  //     obj['title'] = key;
  //     obj["filter"] = {
  //         searchable: true,
  //         sortable: true,
  //     };
  //     obj["alias"] = key;
  //     obj["click"] = {
  //         clickable: false,
  //     };
  //     this.headerList.push(obj);
  // })
  // console.log("HEader list",this.headerList);
  }

  clickHandler() {
    let transaction = this.viewQuery.state.update();
    const query = transaction.state.doc.toString().trim();
    this.viewQuery.dispatch(transaction);

    let transactionParameter = this.viewParameter.state.update();
    this.viewParameter.dispatch(transactionParameter);
    const {isValid , error} = isValidParameterJson(String(transactionParameter.state.doc));

    if(isValid){
      this.isLoading = true;
      this.errorMessage = '';
      this.doc = transactionParameter.state.doc;
      const parameters = this.docParameter.text.join('');
      console.log("Parameters",parameters);
      //axios call
    axios
    .post(this.url, {
      query,
      apiKey: 'ETW5KJQ-PDT48MP-H0WVAC4-WQWHEK3',
      parameters,
    })
    .then((res: any) => {
      console.log("RESSSS",res)
      this.response = Object.values(res.data)[1];
      this.responseLabel = Object.keys(res.data)[1];
      this.isLoading = false;
    })
    .catch(err => console.log(err));
    }else{
      this.errorMessage = error;
    }
    
  }

  dummyKeymap() {
    let self = this;
    return keymap.of([
      {
        key: 'Ctrl-Shift-Enter',
        run() {
          self.clickHandler();
          return true;
        },
      },
    ]);
  }

  render() {
    return (
      <Host>
        <tabs-component activeIndex={this.activeIndex}  tabslist={this.tabslist} tabClickHandler={this.tabClickHandler}></tabs-component>
        <div class="border border-gray-300 shadow-gray-300   p-3">
         {this.tabslist.map(item=>(
            item.className==='editor' ? <div id={item.className} class="border border-gray-300" style={{display: this.activeIndex === 1 ? "none" : "block"}}></div> :
            <div id={item.className} class="border border-gray-300" style={{display: this.activeIndex === 0 ? "none" : "block"}}></div>
          ))}
          {this.errorMessage != '' ? <p class="px-3 py-2 bg-red-200 text-red-800 border-l-4 border-red-600 w-full mt-4 mb-6">{this.errorMessage}</p> : null}
          <button
            title="Ctrl+Shift+Enter to run"
            onClick={() => this.clickHandler()}
            class="flex text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 mt-2 py-2 hover:bg-gray-200 hover:text-gray-800"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
            </svg>
            Run
          </button>
        </div>

        {this.isLoading && (
          <div>
            <p class="text-gray-400 pt-8 pb-12">Output :</p>
            <loader-component></loader-component>
          </div>
        )}
        {/* {this.response && !this.isLoading && <tab-component-updated responseLabel={this.responseLabel} doc={this.response}></tab-component-updated>} */}
        {/* <div style={{overflow:"scroll"}}> */}
        {this.response && !this.isLoading && <editor-res-updated result={this.response} headerList={this.headerList}></editor-res-updated>}
        {/* </div> */}
      </Host>
    );
  }
}
