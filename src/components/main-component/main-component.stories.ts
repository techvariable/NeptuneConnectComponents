export default {
  title: 'Components/MainComponent',
};

const Template = args => `<main-component>${args.slot}</main-component>`;

export const MainComponent = Template.bind({});

MainComponent.args = {
  slot: '',
};
