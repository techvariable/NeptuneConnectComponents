import { newSpecPage } from '@stencil/core/testing';
import { MenuItems } from '../menu-items';

describe('menu-items', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MenuItems],
      html: `<menu-items></menu-items>`,
    });
    expect(page.root).toEqualHtml(`
      <menu-items>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </menu-items>
    `);
  });
});
