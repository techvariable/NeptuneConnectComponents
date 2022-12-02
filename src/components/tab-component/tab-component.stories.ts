export default {
  title: 'Components/TabComponent',
  argTypes: {},
};

const Template = args => `<tab-component doc="${args.doc}" responseLabel="${args.slot}">${args.buttonName}</tab-component>`;

export const TabComponent = Template.bind({});

TabComponent.args = {
  doc: '',
  responseLabel: '',
  slot: '\n\n\n',
};
