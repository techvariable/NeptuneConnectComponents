export default {
  title: 'Components/FluidContainer',
  argTypes: {
    slot: { control: 'text' },
  },
};

const Template = args => `<fluid-container >${args.slot}</fluid-container>`;

export const FluidContainer = Template.bind({});

FluidContainer.args = {
  slot: '',
};
