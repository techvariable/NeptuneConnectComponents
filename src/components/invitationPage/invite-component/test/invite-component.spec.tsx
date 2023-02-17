import { newSpecPage } from '@stencil/core/testing';
import { InviteComponent } from '../invite-component';

describe('invite-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [InviteComponent],
      html: `<invite-component></invite-component>`,
    });
    expect(page.root).toEqualHtml(`
      <invite-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </invite-component>
    `);
  });
});
