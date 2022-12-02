export default {
  title: 'Components/SideBar',
};

const Template = args => `<side-bar >${args.slot}</side-bar>`;

export const SideBar = Template.bind({});

SideBar.args = {
  slot: '',
};
