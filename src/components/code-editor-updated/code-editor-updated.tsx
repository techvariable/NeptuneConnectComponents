import { Component, h, Element, State, Prop, Host } from '@stencil/core';
import { EditorState, basicSetup } from '@codemirror/basic-setup';
import { EditorView, keymap } from '@codemirror/view';
// import { defaultKeymap } from '@codemirror/commands';
import { java } from '@codemirror/lang-java';
import axios from 'axios';
@Component({
  tag: 'code-editor-updated',
  scoped: true,
})
export class CodeEditorUpdated {
  @Prop() url: string;
  @Prop() doc: any = '\n\n\n';
  @State() response: any = [
      {
        organizationid: '1',
        physicianid: '364046',
        npi_id: '1912312547',
        chronicconditionid: 'null',
        physicianname: 'Summer  ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Jordan',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364053',
        npi_id: '1164423687',
        chronicconditionid: 'null',
        physicianname: 'Albert ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Mcconnell',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364048',
        npi_id: '1457716268',
        chronicconditionid: 'null',
        physicianname: 'Lana  ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Boyer',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364059',
        npi_id: '1326035510',
        chronicconditionid: 'null',
        physicianname: 'Frank ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Barrera',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364062',
        npi_id: '1851380257',
        chronicconditionid: 'null',
        physicianname: 'Addyson  ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Pennington',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364052',
        npi_id: '1962966192',
        chronicconditionid: 'null',
        physicianname: 'Thomas',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Declan',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364047',
        npi_id: '1871907683',
        chronicconditionid: 'null',
        physicianname: 'Jude  ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Ingram',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364058',
        npi_id: '1659365245',
        chronicconditionid: 'null',
        physicianname: 'Blake  ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Scott',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364055',
        npi_id: '1891788139',
        chronicconditionid: 'null',
        physicianname: 'Abby  ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'Burke',
        physicianidentifier: 'null'
      },
      {
        organizationid: '1',
        physicianid: '364060',
        npi_id: '1760986194',
        chronicconditionid: 'null',
        physicianname: 'Charlotte ',
        contactid: 'null',
        tenantid: '1',
        physicianlastname: 'May',
        physicianidentifier: 'null'
      }
    ];
  @State() responseLabel: any = [ 'result' ];
  @State() view: EditorView;
  @State() state: EditorState;
  @State() isLoading = false;
  @Element() element: HTMLElement;


  componentDidLoad() {
    this.state = EditorState.create({
      doc: this.doc,
      extensions: [
        basicSetup,
        java(),
        // keymap.of(defaultKeymap),
        this.dummyKeymap(),
      ],
    });

    this.view = new EditorView({
      state: this.state,
      parent: this.element.querySelector('#editor'),
    });
  }

  clickHandler() {
    this.isLoading = true;
    let transaction = this.view.state.update();
    const query = transaction.state.doc.toString().trim();
    this.view.dispatch(transaction);

    //axios call
    axios
      .post(this.url, {
        query,
        apiKey: 'ETW5KJQ-PDT48MP-H0WVAC4-WQWHEK3',
      })
      .then((res: any) => {
        this.response = Object.values(res.data)[1];
        this.responseLabel = Object.keys(res.data)[1];
        this.isLoading = false;
      })
      .catch(err => console.log(err));
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
        <div class="border border-gray-300 shadow-gray-300   p-3 space-y-2">
          <div id="editor" class="border border-gray-300"></div>
          <button
            title="Ctrl+Shift+Enter to run"
            onClick={() => this.clickHandler()}
            class="flex text-sm gap-2 items-center justify-center text-gray-600 border border-gray-300 px-3 py-2 hover:bg-gray-200 hover:text-gray-800"
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
        {this.response && !this.isLoading && <tab-component responseLabel={this.responseLabel} doc={this.response}></tab-component>}
       </Host>
    );
  }
}
