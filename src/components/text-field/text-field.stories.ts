export default {
  title: 'Components/TextField',
  argTypes: {
    name: { control: 'text' },
    addClass: { control: 'text' },
    type: {
      options: ['email', 'password', 'text', 'search'],
      control: { type: 'select' },
    },
    placeholder: { control: 'text' },
    eye: { control: 'boolean' },
  },
};

const Template = args => `<text-field name="${args.name}" addClass="${args.addClass}" type="${args.type}" placeholder="${args.placeholder}" eye='${args.eye}'></text-field>`;

export const TextField = Template.bind({});

TextField.args = {
  name: 'Description',
  addClass: '',
  type: 'email',
  placeholder: 'Example Text',
  eye: 'true',
};
