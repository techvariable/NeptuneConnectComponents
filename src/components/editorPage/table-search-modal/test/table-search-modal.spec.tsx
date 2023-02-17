import { newSpecPage } from '@stencil/core/testing';
import { TableSearchModal } from '../table-search-modal';

describe('table-search-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TableSearchModal],
      html: `<table-search-modal></table-search-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <table-search-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </table-search-modal>
    `);
  });
});
