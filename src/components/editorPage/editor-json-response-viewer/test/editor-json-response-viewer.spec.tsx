import { newSpecPage } from '@stencil/core/testing';
import { EditorJsonResponseViewer } from '../editor-json-response-viewer';

describe('editor-json-response-viewer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditorJsonResponseViewer],
      html: `<editor-json-response-viewer></editor-json-response-viewer>`,
    });
    expect(page.root).toEqualHtml(`
      <editor-json-response-viewer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </editor-json-response-viewer>
    `);
  });
});
