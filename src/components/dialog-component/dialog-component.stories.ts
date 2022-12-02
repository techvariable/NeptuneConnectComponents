export default {
  title: 'Components/DialogComponent',
};

const Template = () => `<dialog-component ></dialog-component>`;

export const DialogComponent = Template.bind({});

DialogComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
