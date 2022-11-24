export default {
    title: 'Components/CodeEditor',
};

const Template = (args) => `<code-editor url="${args.url}"  doc="${args.doc}"></code-editor>`;

export const CodeEditor = Template.bind({});

CodeEditor.args = {
  url: "https://google.com",
  doc: "\n\n\n"
};
