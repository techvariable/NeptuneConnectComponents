import { newSpecPage } from '@stencil/core/testing';
import { CodeEditor } from '../code-editor';

describe('code-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CodeEditor],
      html: `<code-editor></code-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <code-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </code-editor>
    `);
  });
});
