import axios from 'axios';
import { formatQuery } from 'gremlint';
import { createStore } from '@stencil/store';

import { formatJSON } from '../utils/utils';

const { state, onChange, reset } = createStore({
  url: "http://localhost:3000/api/editor",
  nodeList: [],

  selectedNodeName: null,
  limit: 10,
  offset: 0,
  page: 1,
  order: {},
  filter: {},

  query: '',
  queryParameter: "",
  nodes: [],
  columnHeaders: [],
  isLoading: false,
  isError: false,
  errorMessage: null,

  // editor state
  viewQuery: null,
  stateQuery: null,
  viewParameter: null,
  stateParameter: null,

});

onChange('selectedNodeName', value => {
  fetchData(value);
});

onChange('order', () => {
  fetchData(state.selectedNodeName);
});

onChange('filter', () => {
  fetchData(state.selectedNodeName);
});

onChange('nodes', value => {
  const keys = new Set();

  value.forEach(row => {
    Object.keys(row).forEach(k => {
      keys.add(k);
    });
  });

  state.columnHeaders = [...keys].map((k: string) => {
    let dataType = 'string';

    value.slice(0, 5).forEach(row => {
      dataType = typeof row[k];
    });

    return {
      alias: k,
      click: { clickable: false },
      filter: {
        searchable: state.selectedNodeName ? true : false,
        sortable: state.selectedNodeName ? true : false,
      },
      title: k,
      type: dataType,
    };
  });
  console.log("columnHeaders===========>",state.columnHeaders)
});

onChange('query', value => {
  if (state.viewQuery) {
    console.log("Updating the query state")
    let transactionToAdd = state.viewQuery.state.update({
      changes: { from: 0, to: state.viewQuery.state.doc.toString().length, insert: `${value}` },
    });
    state.viewQuery.dispatch(transactionToAdd);
  }
});

onChange('queryParameter', value => {
  if (state.viewParameter) {
    let transactionToAdd = state.viewParameter.state.update({
      changes: { from: 0, to: state.viewParameter.state.doc.toString().length, insert: `${value}` },
    });
    state.viewParameter.dispatch(transactionToAdd);
  }
});

const fetchData = async (nodeName: string) => {
  if (state.selectedNodeName) {
    console.log("fetchData");

    state.isLoading = true;
    state.selectedNodeName = nodeName;
    try {
      const res = await axios.post(`${state.url}/query/builder/${nodeName}`, {
        limit: state.limit,
        offset: state.offset,
        order: state.order,
        filter: state.filter,
      });

      state.nodes = res.data.nodes;
      state.query = formatQuery(res.data.query);
      state.queryParameter = formatJSON(res.data.queryParameters);
    } catch (error) {
      state.isError = true;
      state.errorMessage = 'Failed to fetch data from db';
    }
    state.isLoading = false;
  }
};

export default state;
export { fetchData, reset }