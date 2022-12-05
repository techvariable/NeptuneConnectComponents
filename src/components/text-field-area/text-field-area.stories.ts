export default {
  title: 'Components/TextFieldArea',
  argTypes: {
    width: {
      options: ['full', 'auto'],
      control: { type: 'select' },
    },
    addClass: { control: 'text' },
  },
};

const Template = args => `<text-field-area width="${args.name}" addClass="${args.addClass}">${args.slot}</text-field-area>`;

export const TextFieldArea = Template.bind({});

TextFieldArea.args = {
  width: 'full',
  addClass: '',
  slot: '',
};
