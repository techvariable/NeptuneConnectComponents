import { newSpecPage } from '@stencil/core/testing';
import { DataTableUpdated } from '../data-table-updated';

describe('data-table-updated', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DataTableUpdated],
      html: `<data-table-updated></data-table-updated>`,
    });
    expect(page.root).toEqualHtml(`
      <data-table-updated>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </data-table-updated>
    `);
  });
});
