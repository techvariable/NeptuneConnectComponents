import axios from 'axios';
import { Component, h, Prop, State } from '@stencil/core';

import { isValidParameterJson } from '../../../utils/utils';
import state from '../store';
import { formatQuery } from 'gremlint';
import { formatJSON } from '../../../utils/utils';

@Component({
  tag: 'editor-page',
  scoped: true,
})
export class EditorPage {
  @Prop() url: string;
  @Prop() permissions: string;
  @Prop() mode: string;

  @State() selectedNodeName: string;
  @State() nodeList: string[] = [];
  @State() queryDocument: string = '\n\n\n\n';
  @State() parameterDocument: string = '\n\n\n\n';
  @State() nodeData: Array<{}> = [];
  @State() nodeDataColumns: {}[] = [];
  @State() errorMessage: string | null = null;
  @State() isLoading: boolean = false;
  @State() loadingNodes: boolean = false;
  @State() nodeError: string | null = null;

  componentWillLoad() {
    state.hostUrl = this.url;
    this.fetchNavigators();
  }

  fetchNavigators = () => {
    this.loadingNodes = true;
    this.errorMessage = null;
    this.nodeError = null;
    axios
      .get(`${this.url}/nodes`)
      .then((res: any) => {
        state.availableNodes = res.data.nodes;
        this.loadingNodes = false;
      })
      .catch(err => {
        this.loadingNodes = false;
        this.nodeError = err;
      });
  };

  btnClassType = {
    true: `mr-4 animate-spin`,
    false: `mr-4`,
  };

  formatter = () => {
    let transactionQuery = state.viewQuery.state.update();
    const query = transactionQuery.state.doc.toString().trim();

    let transactionToFormatQuery = state.viewQuery.state.update({
      changes: { from: 0, to: state.viewQuery.state.doc.toString().length, insert: `${formatQuery(query)}` },
    });
    state.viewQuery.dispatch(transactionToFormatQuery);

    let transactionParameter = state.viewParameter.state.update();
    const parameter = transactionParameter.state.doc.toString().trim();

    let transactionToFormatParameter = state.viewParameter.state.update({
      changes: { from: 0, to: state.viewParameter.state.doc.toString().length, insert: `${formatJSON(JSON.parse(parameter))}` },
    });
    state.viewParameter.dispatch(transactionToFormatParameter);
  };

  checkIfValidDemoQuery(value: string) {
    const demoConstraints = ["drop", "addv", "addvertex", "addedge", "adde", "property", "addlabel"]
    demoConstraints.forEach(constraint => {
      if (value.toLowerCase().includes(constraint)) {
        throw Error(`You can perform this operation in Demo mode !`)
      }
    })
  }
  onClickRun = async () => {
    if (state.editorTextFlag) {
      state.selectedNodeName = null;
      state.filter = {};
      state.order = {};
      state.isError = false;
      state.errorMessage = null;
      state.isLoading = true;
      state.isCustomQuery = true;

      try {
        let transactionQuery = state.viewQuery.state.update();
        const query = transactionQuery.state.doc.toString().trim();
        state.viewQuery.dispatch(transactionQuery);

        let transactionParameter = state.viewParameter.state.update();
        const parameters = transactionParameter.state.doc.toString().trim();
        state.viewParameter.dispatch(transactionParameter);

        const { isValid, error } = isValidParameterJson(query, parameters);

        if (isValid) {
          state.timeTaken = null;

          if (this.mode === "demo") this.checkIfValidDemoQuery(query)

          const res = await axios.post(`${state.hostUrl}/query/`, {
            query,
            parameters: JSON.parse(parameters),
          });
          state.query = query;
          state.queryParameter = parameters;
          state.nodes = res.data.result;
          state.timeTaken = res.data.timeTaken;
          state.isFetchedData = true;
          this.formatter();
        } else {
          state.isError = true;
          state.errorMessage = error;
        }
      } catch (error) {
        state.isError = true;
        state.errorMessage = error?.response?.data?.error ? error.response.data.error : error.message ?? 'Failed to fetch data from db server.';
      }
      state.isLoading = false;
    }
  };

  render() {
    return (
      <div class="mx-4">
        <div class="w-full lg:flex justify-center gap-4 mt-4">
          <div>
            <aside class="w-full lg:w-80" aria-label="Sidebar">
              <div class="w-full flex justify-between ">
                <h2 class="font-mono text-lg font-bold leading-7 text-gray-600">Labels</h2>
                <icon-button-basic
                  color="secondary"
                  size="md"
                  title="Refresh Nodes"
                  clickHandler={() => this.fetchNavigators()}
                  loading={this.loadingNodes}
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-7 h-7">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                      />
                    </svg>
                  }
                />
              </div>
              <div class="custom-scrollbar " style={{ maxHeight: '43.5rem', overflowX: 'visible', overflowY: 'auto', minHeight: '20rem' }}>
                <node-item nodeError={this.nodeError}></node-item>
              </div>
            </aside>
          </div>
          <div class="w-full md:w-3/4">
            <h2 class="pb-3 font-mono text-lg font-bold leading-7 text-gray-600">Write your Gremlin Query Here</h2>
            <code-editor formatter={() => this.formatter()} onClickRun={this.onClickRun} fetchNavigators={this.fetchNavigators} permissions={this.permissions}></code-editor>
            {state.isFetchedData && state.nodes.length === 0 && !state.isLoading && !state.isError && (
              <div class="flex items-center bg-gray-500 text-white text-sm font-bold px-4 py-3" role="alert">
                <p>Nothing returned from the database.</p>
              </div>
            )}
            {state.nodes.length > 0 && !state.isLoading && !state.isError && <tab-component permissions={this.permissions}></tab-component>}
          </div>
        </div>
      </div>
    );
  }
}
