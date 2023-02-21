import { newSpecPage } from '@stencil/core/testing';
import { EditorRes } from '../editor-res';

describe('editor-res', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditorRes],
      html: `<editor-res></editor-res>`,
    });
    expect(page.root).toEqualHtml(`
      <editor-res>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </editor-res>
    `);
  });
});
