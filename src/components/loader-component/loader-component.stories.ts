export default {
  title: 'Components/LoaderComponent',
};

const Template = args => `<loader-component >${args.slot}</loader-component>`;

export const LoaderComponent = Template.bind({});

LoaderComponent.args = {
  slot: '',
};
