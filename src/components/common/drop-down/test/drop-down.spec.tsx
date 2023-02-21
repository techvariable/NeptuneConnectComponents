import { newSpecPage } from '@stencil/core/testing';
import { DropDown } from '../drop-down';

describe('drop-down', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DropDown],
      html: `<drop-down></drop-down>`,
    });
    expect(page.root).toEqualHtml(`
      <drop-down>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </drop-down>
    `);
  });
});
