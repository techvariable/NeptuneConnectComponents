export default {
  title: 'Components/DataTable',
  argTypes: {},
};

const Template = args => `<data-table doc="${args.doc}"></data-table>`;

export const DataTable = Template.bind({});

DataTable.args = {
  doc: [{}],
};
