import { newSpecPage } from '@stencil/core/testing';
import { QueryResultTable } from '../query-result-table';

describe('query-result-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QueryResultTable],
      html: `<query-result-table></query-result-table>`,
    });
    expect(page.root).toEqualHtml(`
      <query-result-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </query-result-table>
    `);
  });
});
