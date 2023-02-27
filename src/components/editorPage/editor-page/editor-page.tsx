import axios from 'axios';
import { Component, h, Prop, State } from '@stencil/core';

import { isValidParameterJson } from '../../../utils/utils';
import state from '../store';

@Component({
  tag: 'editor-page',
  scoped: true,
})
export class EditorPage {
  @Prop() url: string;

  @State() selectedNodeName: string;
  @State() nodeList: string[] = [];
  @State() queryDocument: string = '\n\n\n\n';
  @State() parameterDocument: string = '\n\n\n\n';
  @State() nodeData: Array<{}> = [];
  @State() nodeDataColumns: {}[] = [];
  @State() errorMessage: string | null = null;
  @State() isLoading: boolean = false;
  @State() loadingNodes: boolean = false;

  componentWillLoad() {
    state.url = this.url;
    this.fetchNavigators();
  }

  fetchNavigators = () => {
    this.loadingNodes = true;
    this.errorMessage = null;
    axios
      .get(`${this.url}/nodes`)
      .then((res: any) => {
        state.nodeList = res.data.nodes;
        this.loadingNodes = false;
      })
      .catch(err => {
        console.log(err);
      });
  };

  // animatingClass = ``

  btnClassType = {
    true: `mr-4 animate-spin`,
    false: `mr-4`,
  };

  onClickRun = async () => {
    if (state.syncVal !== '') {
      state.selectedNodeName = null;
      state.filter = {};
      state.order = {};
      state.isError = false;
      state.errorMessage = null;
      state.isLoading = true;

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
          const res = await axios.post(`${state.url}/query/`, {
            query,
            parameters: JSON.parse(parameters),
          });
          state.query = query;
          state.queryParameter = parameters;
          state.nodes = res.data.result;
          state.timeTaken = res.data.timeTaken;
          state.isFetchedData = true;
        } else {
          state.isError = true;
          state.errorMessage = error;
        }
      } catch (error) {
        state.isError = true;
        state.errorMessage = error?.response?.data?.message ? error.response.data.message : 'Failed to fetch data from db server.';
      }
      state.isLoading = false;
    }
  };

  render() {
    return (
      <div>
        <div class="w-full md:flex  justify-center gap-4 mt-4">
          <div>
            <aside class="w-full md:w-80" aria-label="Sidebar">
              <div class="w-full flex justify-between mb-4">
                <h2 class="font-mono text-lg font-bold leading-7 text-gray-600">Nodes</h2>
                <button class={this.btnClassType[`${this.loadingNodes}`]} title="Refesh Nodes" onClick={() => this.fetchNavigators()}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
                    />
                  </svg>
                </button>
              </div>
              <div style={{ maxHeight: '43.5rem', overflowX: 'visible', overflowY: 'auto', minHeight: '20rem' }}>
                <node-item></node-item>
              </div>
            </aside>
          </div>
          <div class="w-full md:w-3/4">
            <h2 class="pb-3 font-mono text-lg font-bold leading-7 text-gray-600">Write your Gremlin Query Here</h2>
            <code-editor onClickRun={this.onClickRun}></code-editor>
            {state.isFetchedData && state.nodes.length === 0 && !state.isLoading && !state.isError && (
              <div class="flex items-center bg-gray-500 text-white text-sm font-bold px-4 py-3" role="alert">
                <p>No Data Found in Database</p>
              </div>
            )}
            {state.nodes.length > 0 && !state.isLoading && !state.isError && <tab-component></tab-component>}
          </div>
        </div>
      </div>
    );
  }
}
