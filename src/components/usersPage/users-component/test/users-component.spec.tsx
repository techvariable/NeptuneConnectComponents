import { newSpecPage } from '@stencil/core/testing';
import { UsersComponent } from '../users-component';

describe('users-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [UsersComponent],
      html: `<users-component></users-component>`,
    });
    expect(page.root).toEqualHtml(`
      <users-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </users-component>
    `);
  });
});
