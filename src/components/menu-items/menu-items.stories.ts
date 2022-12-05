export default {
  title: 'Components/MenuItems',
  argTypes: {
    slot: { control: 'text' },
  },
};

const Template = args => `<menu-items >${args.slot}</menu-items>`;

export const MenuItems = Template.bind({});

MenuItems.args = {
  slot: '',
};
