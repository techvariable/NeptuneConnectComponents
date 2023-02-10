import axios from 'axios';
import { Component, h, Prop, State } from '@stencil/core';

import { formatJSON, isValidParameterJson } from '../../utils/utils';
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

  componentWillLoad() {
    this.fetchNavigators();
  }

  fetchNavigators = () => {
    this.errorMessage = null;
    axios
      .get(`${this.url}/nodes`)
      .then((res: any) => {
        state.nodeList = res.data.nodes;
      })
      .catch(err => {
        console.log(err);
      });
  };

  fetchData = async (nodeName: string, limit: number = 10, offset: number = 0, order?: { [index: string]: 'asc' | 'desc' }, filter?: any) => {
    this.isLoading = true;
    this.selectedNodeName = nodeName;
    try {
      const res = await axios.post(`${this.url}/query/builder/${nodeName}`, {
        limit,
        offset,
        order: order ? order : {},
        filter: filter ? filter : {},
      });

      this.nodeData = res.data.nodes;
      this.queryDocument = res.data.query;
      this.parameterDocument = formatJSON(res.data.queryParameters);

      const keys = new Set();

      this.nodeData.forEach(row => {
        Object.keys(row).forEach(k => {
          keys.add(k);
        });
      });

      this.nodeDataColumns = [...keys].map((k: string) => {
        let dataType = 'string';

        this.nodeData.slice(0, 5).forEach(row => {
          dataType = typeof row[k];
        });

        return {
          alias: k,
          click: { clickable: false },
          filter: {
            searchable: true,
            sortable: true,
          },
          title: k,
          type: dataType,
        };
      });
    } catch (error) {
      console.log({ error });
    }
    this.isLoading = false;
  };


  onClickRun = async () => {
    state.selectedNodeName = null;
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
        const res = await axios.post(`${state.url}/query/`, {
          query,
          parameters: JSON.parse(parameters),
        });

        state.query = query;
        state.queryParameter = parameters;
        state.nodes = res.data.result;
      } else {
        state.isError = true;
        state.errorMessage = error;
      }
    } catch (error) {
      state.isError = true;
      state.errorMessage = error;
    }
    state.isLoading = false;
  };

  render() {
    console.log(state);
    return (
      <div>
        <div class="w-auto flex justify-center gap-4 mt-4">
          <aside class="w-80" aria-label="Sidebar">
            <h2 class="pb-6 font-mono text-lg font-bold leading-7 text-gray-600">Nodes</h2>
            <node-item></node-item>
          </aside>
          <div class="w-96" style={{ width: '72.5rem' }}>
            <h2 class="pb-3 font-mono text-lg font-bold leading-7 text-gray-600">Write your Gremlin Query Here</h2>
            <code-editor-updated onClickRun={this.onClickRun}></code-editor-updated>

            {state.nodes.length > 0 && !state.isLoading && (
              <editor-res-updated></editor-res-updated>
            )}
          </div>
        </div>
      </div>
    );
  }
}
