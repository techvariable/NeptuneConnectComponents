export default {
  title: 'Components/LoaderComponent',
};

const Template = () => `<loader-component ></loader-component>`;

export const LoaderComponent = Template.bind({});

LoaderComponent.parameters = {
  controls: { hideNoControlsWarning: true },
};
