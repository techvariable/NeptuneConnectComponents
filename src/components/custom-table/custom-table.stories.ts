export default {
  title: 'Components/CustomTable',
  argTypes: {
    currentPage: { control: { type: 'number', min: 1, max: 30, step: 1 } },
    dataLength: { control: 'text' },
    limit: { control: { type: 'number', min: 1, max: 90, step: 1 } },
    isLoading: { control: 'boolean' },
    isLoadingError: { control: 'boolean' },
  },
};

const Template = args =>
  `<custom-table tableHeader="${args.tableHeader}" tableBody="${args.tableBody}" currentPage="${args.currentPage}" dataLength='${args.dataLength}' next='${args.next}' prev="${args.prev}" limit='${args.limit}' rows='${args.rows}' rowsHandler='${args.rowsHandler}' isLoading='${args.isLoading}' isLoadingError='${args.isLoadingError}'></custom-table>`;

export const CustomTable = Template.bind({});

CustomTable.args = {
  tableHeader: [
    { a: 1, b: 2 },
    { c: 3, d: 4 },
  ],
  tableBody: [
    { p: 1, q: 2 },
    { r: 6, s: 7 },
  ],
  currentPage: '1',
  dataLength: '20',
  next: '',
  prev: '',
  limit: '30',
  rows: [1, 2, 3, 4],
  rowsHandler: '',
  isLoading: 'false',
  isLoadingError: 'false',
};
