import { newSpecPage } from '@stencil/core/testing';
import { UserDropDown } from '../user-drop-down';

describe('user-drop-down', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UserDropDown],
      html: `<user-drop-down></user-drop-down>`,
    });
    expect(page.root).toEqualHtml(`
      <user-drop-down>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </user-drop-down>
    `);
  });
});
