import { newSpecPage } from '@stencil/core/testing';
import { DataTable } from '../data-table';

describe('data-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DataTable],
      html: `<data-table></data-table>`,
    });
    expect(page.root).toEqualHtml(`
      <data-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </data-table>
    `);
  });
});
