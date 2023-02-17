import { newSpecPage } from '@stencil/core/testing';
import { JsonResponseViewer } from '../json-response-viewer';

describe('json-response-viewer', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [JsonResponseViewer],
      html: `<json-response-viewer></json-response-viewer>`,
    });
    expect(page.root).toEqualHtml(`
      <json-response-viewer>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </json-response-viewer>
    `);
  });
});
