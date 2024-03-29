import axios from 'axios';
import { formatQuery } from 'gremlint';
import { createStore } from '@stencil/store';

import { formatJSON } from '../../utils/utils';

type IStore = {
  queryMode: 'read' | 'insert' | 'update' | 'delete';
  isCustomQuery: boolean;
  isFetchedData: boolean;
  showMeta: boolean;
  isLoading: boolean;
  isError: boolean;
  canEdit: boolean;

  hostUrl: string;
  selectedNodeName: string;
  limit: number;
  page: number;
  total: number;
  order: {};
  filter: {};

  updateId: number | string;
  changesMade: {};

  deleteId: number | string;

  insertNodeLabel: string;
  insertProperties: {};

  nodes: Array<any>;
  columnHeaders: Array<any>;
  savedColumnHeaders: Array<any>;
  availableNodes: Array<any>;
  queryHistory: Array<{ id: number, queryTitle: string, queryText: string, queryParameter: string, ownerId: number }>;
  saveTitle: string;
  query: string;
  queryParameter: string;

  errorMessage: string;

  editorTextFlag: boolean;
  viewQuery: any;
  stateQuery: any;
  viewParameter: any;
  stateParameter: any;
  timeTaken: number | null;
  refreshData: () => Promise<void>;
};

const { state, onChange, reset } = createStore<IStore>({
  // flags
  queryMode: 'read',
  isCustomQuery: false,
  isFetchedData: false,
  showMeta: false,
  isLoading: false,
  isError: false,
  canEdit: false,

  hostUrl: '',

  // parameters
  selectedNodeName: null,
  limit: 10,
  page: 1,
  total: 0,
  order: {},
  filter: {},

  // edit parameters
  updateId: null,
  changesMade: {},

  // delete parameters
  deleteId: null,

  // insert parameters
  insertNodeLabel: null,
  insertProperties: {},

  queryHistory: [],
  saveTitle: '',
  // response
  nodes: [],
  columnHeaders: [],
  savedColumnHeaders: [],
  availableNodes: [],
  query: '\n\n\n\n\n\n\n\n\n',
  queryParameter: '{\n  \n}\n\n\n\n\n\n',

  errorMessage: null,

  // editor state
  editorTextFlag: false,
  viewQuery: null,
  stateQuery: null,
  viewParameter: null,
  stateParameter: null,
  timeTaken: null,

  refreshData: async () => {
    fetchData(state.selectedNodeName);
  },
});

onChange('queryMode', value => {
  switch (value) {
    case 'read':
      state.insertNodeLabel = null;
      state.insertProperties = {};
      state.updateId = null;
      state.changesMade = {};
      state.deleteId = null;
    case 'insert':
      state.limit = 10;
      state.page = 1;
      state.order = {};
      state.filter = {};
      state.updateId = null;
      state.changesMade = {};
      state.deleteId = null;
    case 'update':
      state.limit = 10;
      state.page = 1;
      state.order = {};
      state.filter = {};
      state.deleteId = null;
      state.insertNodeLabel = null;
      state.insertProperties = {};
    case 'delete':
      state.limit = 10;
      state.page = 1;
      state.order = {};
      state.filter = {};
      state.updateId = null;
      state.changesMade = {};
      state.insertNodeLabel = null;
      state.insertProperties = {};
  }
});

onChange('queryHistory', value => {
  const keys = new Set();

  value.forEach(row => {
    let values = ['id', 'ownerId'];
    Object.keys(row).filter(item => !values.includes(item)).forEach(k => {
      keys.add(k);
    });
  });
  state.savedColumnHeaders = [...keys].map((k: string) => {
    let dataType = 'string';
    state.queryHistory.every(row => {
      if (row[k] !== undefined) {
        dataType = typeof row[k];
        return false;
      }
      return true;
    });

    return {
      alias: k,
      title: k,
      type: dataType,
    };
  });
})

onChange('nodes', value => {
  const keys = new Set();

  value.forEach(row => {
    Object.keys(row).forEach(k => {
      keys.add(k);
    });
  });

  state.columnHeaders = [...keys].map((k: string) => {
    let dataType = 'string';
    value.every(row => {
      if (row[k] !== undefined) {
        dataType = typeof row[k];
        return false;
      }
      return true;
    });

    return {
      alias: k,
      title: k,
      type: dataType,
    };
  });
});

onChange('queryParameter', value => {
  if (state.viewParameter) {
    let transactionToAdd = state.viewParameter.state.update({
      changes: { from: 0, to: state.viewParameter.state.doc.toString().length, insert: `${value}` },
    });
    state.viewParameter.dispatch(transactionToAdd);
  }
});

const getParamsForBuilder = () => {
  return {
    read: {
      showMeta: state.showMeta,
      limit: state.limit,
      offset: state.limit * state.page - state.limit,
      order: state.order,
      filter: state.filter,
    },
    update: {
      updateId: state.updateId,
      changes: state.changesMade,
    },
    delete: {
      deleteId: state.deleteId,
    },
    insert: {
      label: state.insertNodeLabel,
      properties: state.insertProperties,
    },
  };
};

const getQueryPreview = async () => {
  try {
    const res = await axios.post(`${state.hostUrl}/query/builder/${state.selectedNodeName}/${state.queryMode}/preview`, getParamsForBuilder());
    return res.data;
  } catch (error) {
    state.isError = true;
    state.errorMessage = error.response?.data?.error?.split(':')[0] || 'Failed to fetch data from db';
  }
};

const fetchData = async (nodeName: string) => {
  if (state.selectedNodeName) {
    state.isCustomQuery = false;
    state.timeTaken = null;
    state.isError = false;
    state.errorMessage = null;
    state.isLoading = true;
    state.selectedNodeName = nodeName;

    try {
      const res = await axios.post(`${state.hostUrl}/query/builder/${nodeName}/${state.queryMode}`, getParamsForBuilder());

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
      state.errorMessage = error.response?.data?.error?.split(':')[0] || 'Failed to fetch data from db';
    }
    state.isLoading = false;
  }
};

export default state;
export { fetchData, reset, getQueryPreview };
