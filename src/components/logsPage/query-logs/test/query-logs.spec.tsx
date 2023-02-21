import { newSpecPage } from '@stencil/core/testing';
import { QueryLogs } from '../query-logs';

describe('query-logs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [QueryLogs],
      html: `<query-logs></query-logs>`,
    });
    expect(page.root).toEqualHtml(`
      <query-logs>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </query-logs>
    `);
  });
});
