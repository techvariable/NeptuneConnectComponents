import { createStore } from "@stencil/store";

const { state, onChange } = createStore({
    selectedNodeName: null,
    query: "",
    queryParameter: {},
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

    activeIndex: 0
});

onChange('nodes', value => {
    state.columnHeaders = value;
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


export default state;