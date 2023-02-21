import { newSpecPage } from '@stencil/core/testing';
import { TextFieldArea } from '../text-field-area';

describe('text-field-area', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TextFieldArea],
      html: `<text-field-area></text-field-area>`,
    });
    expect(page.root).toEqualHtml(`
      <text-field-area>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </text-field-area>
    `);
  });
});
