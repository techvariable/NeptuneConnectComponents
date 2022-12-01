export default {
  title: 'Components/IconButton',
  argTypes: {
    type: {
      options: ['outlined', 'contained'],
      control: { type: 'radio' },
    },
    iconPosition: {
      options: ['right', 'left'],
      control: { type: 'radio' },
    },
    btnLabel: { control: 'text' },
    addClass: { control: 'text' },
  },
};

const Template = args => `<icon-button type="${args.type}" iconPosition="${args.iconPosition}" btnLabel="${args.btnLabel}" addClass="${args.addClass}">${args.slot}</icon-button>`;

export const IconButton = Template.bind({});

IconButton.args = {
  type: 'outlined',
  iconPosition: 'right',
  btnLabel: 'Icons Button',
  addClass: '',
  slot: 'IconBtn',
};
