export default {
  title: 'Components/RadioButton',
  argTypes: {
    align: {
      options: ['vertical', 'horizontal'],
      control: { type: 'radio' },
    },
  },
};

const Template = args => `<radio-button name="${args.name}" align="${args.align}"></radio-button>`;

export const RadioButton = Template.bind({});

RadioButton.args = {
  name: 'Durga',
  align: 'horizontal',
};
