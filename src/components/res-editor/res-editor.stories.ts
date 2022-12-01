export default {
  title: 'Components/ResEditor',
  argTypes: {
    doc: { control: 'text' },
    responseLabel: {
      options: ['result', 'error'],
      control: { type: 'radio' },
    },
  },
};

const Template = args => `<res-editor doc="${args.doc}" responseLabel="${args.responseLabel}"></res-editor>`;

export const ResEditor = Template.bind({});

ResEditor.args = {
  doc: 'segss',
  responseLabel: 'result',
};
