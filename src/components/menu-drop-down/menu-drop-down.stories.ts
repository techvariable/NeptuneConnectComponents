export default {
  title: 'Components/MenuDropDown',
  argTypes: {
    listTitle: { control: 'text' },
    list: { control: 'object' },
  },
};

const Template = args => `<menu-drop-down listTitle="${args.listTitle}" list="${args.list}"></menu-drop-down>`;

export const MenuDropDown = Template.bind({});

MenuDropDown.args = {
  listTitle: 'Plain',
  list: [1, 2, 3, 4, 5],
};
