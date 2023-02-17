import { newSpecPage } from '@stencil/core/testing';
import { LogTableWrapper } from '../log-table-wrapper';

describe('log-table-wrapper', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LogTableWrapper],
      html: `<log-table-wrapper></log-table-wrapper>`,
    });
    expect(page.root).toEqualHtml(`
      <log-table-wrapper>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </log-table-wrapper>
    `);
  });
});
