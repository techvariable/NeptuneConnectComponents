import { newSpecPage } from '@stencil/core/testing';
import { EditorPage } from '../editor-page';

describe('editor-page', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditorPage],
      html: `<editor-page></editor-page>`,
    });
    expect(page.root).toEqualHtml(`
      <editor-page>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </editor-page>
    `);
  });
});
