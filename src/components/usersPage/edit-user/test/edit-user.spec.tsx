import { newSpecPage } from '@stencil/core/testing';
import { EditUser } from '../edit-user';

describe('edit-user', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [EditUser],
      html: `<edit-user></edit-user>`,
    });
    expect(page.root).toEqualHtml(`
      <edit-user>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </edit-user>
    `);
  });
});
