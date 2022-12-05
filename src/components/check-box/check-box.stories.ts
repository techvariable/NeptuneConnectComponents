export default {
    title: 'Components/CheckBox',
};

const Template = (args) => `<check-box name="${args.name}"></check-box>`;

export const CheckBox = Template.bind({});

CheckBox.args = {
  name: "Abhishek"
};
