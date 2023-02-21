import { newSpecPage } from '@stencil/core/testing';
import { PlainButton } from '../plain-button';

describe('plain-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PlainButton],
      html: `<plain-button></plain-button>`,
    });
    expect(page.root).toEqualHtml(`
      <plain-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </plain-button>
    `);
  });
});
