export default {
  title: 'Components/SideBar',
};

const Template = () => `<side-bar ></side-bar>`;

export const SideBar = Template.bind({});

SideBar.parameters = {
  controls: { hideNoControlsWarning: true },
};
