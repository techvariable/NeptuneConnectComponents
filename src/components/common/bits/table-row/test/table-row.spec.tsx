import { newSpecPage } from '@stencil/core/testing';
import { TableRow } from '../table-row';

describe('table-row', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TableRow],
      html: `<table-row></table-row>`,
    });
    expect(page.root).toEqualHtml(`
      <table-row>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </table-row>
    `);
  });
});
