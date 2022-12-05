export default {
  title: 'Components/DropDown',
  argTypes: {
    alias: { control: 'text' },
  },
};

const Template = args => `<drop-down alias="${args.alias}">${args.slot}</drop-down>`;

export const DropDown = Template.bind({});

DropDown.args = {
  alias: '',
  slot: '',
};
