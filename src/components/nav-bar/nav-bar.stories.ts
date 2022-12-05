export default {
  title: 'Components/NavBar',
  argTypes: {},
};

const Template = args => `<nav-bar >${args.slot}</nav-bar>`;

export const NavBar = Template.bind({});

NavBar.args = {
  slot: ['Item1', 'Item2', 'Item3'],
};
