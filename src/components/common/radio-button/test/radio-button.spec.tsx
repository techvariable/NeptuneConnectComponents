import { newSpecPage } from '@stencil/core/testing';
import { RadioButton } from '../radio-button';

describe('radio-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RadioButton],
      html: `<radio-button></radio-button>`,
    });
    expect(page.root).toEqualHtml(`
      <radio-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </radio-button>
    `);
  });
});
