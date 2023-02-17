import { newSpecPage } from '@stencil/core/testing';
import { MultiSelectCustom } from '../multi-select-custom';

describe('multi-select-custom', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MultiSelectCustom],
      html: `<multi-select-custom></multi-select-custom>`,
    });
    expect(page.root).toEqualHtml(`
      <multi-select-custom>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </multi-select-custom>
    `);
  });
});
