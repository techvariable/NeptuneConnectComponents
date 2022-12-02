export default {
  title: 'Components/TableWrapper',
  argTypes: {
    rowPerPage: { control: 'object' },
    headerList: { control: 'object' },
    autocompute: { control: 'boolean' },
  },
};

const Template = args =>
  `<table-wrapper rowPerPage="${args.rowPerPage}" api="${args.api}" headerList="${args.headerList}" autocompute='${args.autocompute}'>${args.slot}</table-wrapper>`;

export const TableWrapper = Template.bind({});

TableWrapper.args = {
  rowPerPage: [10],
  api: '',
  headerList: [{}],
  autocompute: 'true',
  slot: '',
};
