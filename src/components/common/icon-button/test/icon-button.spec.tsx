import { newSpecPage } from '@stencil/core/testing';
import { IconButton } from '../icon-button';

describe('icon-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [IconButton],
      html: `<icon-button></icon-button>`,
    });
    expect(page.root).toEqualHtml(`
      <icon-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </icon-button>
    `);
  });
});
