import { newSpecPage } from '@stencil/core/testing';
import { LogsTable } from '../logs-table';

describe('logs-table', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LogsTable],
      html: `<logs-table></logs-table>`,
    });
    expect(page.root).toEqualHtml(`
      <logs-table>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </logs-table>
    `);
  });
});
