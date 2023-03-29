import { newSpecPage } from '@stencil/core/testing';
import { TableSearchModalForm } from '../table-search-modal-form';

describe('table-search-modal-form', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TableSearchModalForm],
      html: `<table-search-modal-form></table-search-modal-form>`,
    });
    expect(page.root).toEqualHtml(`
      <table-search-modal-form>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </table-search-modal-form>
    `);
  });
});
