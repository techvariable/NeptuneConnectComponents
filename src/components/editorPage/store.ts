import axios from 'axios';
import { formatQuery } from 'gremlint';
import { createStore } from '@stencil/store';

import { formatJSON } from '../../utils/utils';

const { state, onChange, reset } = createStore({
  // flags
  queryMode: 'read',
  isCustomQuery: false,
  isFetchedData: false,

  hostUrl: '',
  availableNodes: [],

  selectedNodeName: null,
  limit: 10,
  page: 1,
  order: {},
  filter: {},
  total: 0,

  query: '\n\n\n\n\n\n\n\n\n',
  queryParameter: '{\n  \n}\n\n\n\n\n\n',
  nodes: [],
  columnHeaders: [],
  isLoading: false,
  isError: false,
  errorMessage: null,

  // editor state
  syncVal: '',
  viewQuery: null,
  stateQuery: null,
  viewParameter: null,
  stateParameter: null,
  timeTaken: null,
  refresh: null,

  refreshData: async () => {
    await fetchData(state.selectedNodeName);
  },
});

onChange('refresh', () => {
  if (state.refresh !== null) fetchData(state.selectedNodeName);
  state.refresh = null;
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
      title: k,
      type: dataType,
    };
  });
});

onChange('query', value => {
  if (state.viewQuery) {
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
    state.isCustomQuery = false;
    state.timeTaken = null;
    state.isError = false;
    state.errorMessage = null;
    state.isLoading = true;
    state.selectedNodeName = nodeName;

    try {
      const res = await axios.post(`${state.hostUrl}/query/builder/${nodeName}/${state.queryMode}`, {
        read: {
          showMeta: false,
          limit: state.limit,
          offset: state.limit * state.page - state.limit,
          order: state.order,
          filter: state.filter,
        },
      });

      state.nodes = res.data.nodes;
      state.total = res.data.count;
      state.query = formatQuery(res.data.query);
      state.queryParameter = formatJSON(res.data.queryParameters);
      let transactionToAddQuery = state.viewQuery.state.update({
        changes: { from: 0, to: state.viewQuery.state.doc.toString().length, insert: state.query },
      });
      state.viewQuery.dispatch(transactionToAddQuery);

      let transactionToAddParameter = state.viewParameter.state.update({
        changes: { from: 0, to: state.viewParameter.state.doc.toString().length, insert: state.queryParameter },
      });
      state.viewParameter.dispatch(transactionToAddParameter);
      state.timeTaken = res.data.timeTaken;
      state.isFetchedData = true;
    } catch (error) {
      state.isError = true;
      state.errorMessage = 'Failed to fetch data from db';
    }
    state.isLoading = false;
  }
};

export default state;
export { fetchData, reset };
