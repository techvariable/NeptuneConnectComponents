import { newSpecPage } from '@stencil/core/testing';
import { DownloadResultModal } from '../download-result-modal';

describe('download-result-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DownloadResultModal],
      html: `<download-result-modal></download-result-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <download-result-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </download-result-modal>
    `);
  });
});
