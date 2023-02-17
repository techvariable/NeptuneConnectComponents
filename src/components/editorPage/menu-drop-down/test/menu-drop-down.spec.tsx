import { newSpecPage } from '@stencil/core/testing';
import { MenuDropDown } from '../menu-drop-down';

describe('menu-drop-down', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MenuDropDown],
      html: `<menu-drop-down></menu-drop-down>`,
    });
    expect(page.root).toEqualHtml(`
      <menu-drop-down>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </menu-drop-down>
    `);
  });
});
