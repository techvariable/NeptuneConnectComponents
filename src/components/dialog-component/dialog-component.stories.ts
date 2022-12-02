export default {
  title: 'Components/DialogComponent',
  argTypes: {
    buttonName: { control: 'text' },
  },
};

const Template = () => `<dialog-component ></dialog-component>`;

export const DialogComponent = Template.bind({});

DialogComponent.args = {};
