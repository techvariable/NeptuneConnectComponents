export default {
  title: 'Components/PlainButton',
  argTypes: {
    buttonName: { control: 'text' },
    addClass: { control: 'text' },
    type: {
      options: ['contained', 'outlined', 'text'],
      control: { type: 'radio' },
    },
    width: {
      options: ['full', 'auto'],
      control: { type: 'radio' },
    },
    color: {
      options: ['black', 'slate-900', 'orange-700'],
      control: { type: 'radio' },
    },
    hoverColor: {
      options: ['stone-500', 'red-300', 'orange-200'],
      control: { type: 'radio' },
    },
    disabledHandler: { control: 'boolean' },
  },
};

const Template = args =>
  `<plain-button addClass="${args.addClass}" type="${args.type}" width="${args.width}" color='${args.color}' hoverColor='${args.hoverColor}' disabledHandler="${args.disabledHandler}">${args.buttonName}</plain-button>`;

export const PlainButton = Template.bind({});

PlainButton.args = {
  buttonName: 'Plain Button',
  addClass: '',
  type: 'outlined',
  width: 'auto',
  color: 'red-300',
  hoverColor: 'red-400',
  disabledHandler: 'false',
};
