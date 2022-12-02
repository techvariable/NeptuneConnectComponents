export default {
  title: 'Components/MainComponent',
};

const Template = () => `<main-component></main-component>`;

export const MainComponent = Template.bind({});

MainComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
