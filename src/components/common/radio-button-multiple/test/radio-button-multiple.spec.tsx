import { newSpecPage } from '@stencil/core/testing';
import { RadioButtonMultiple } from '../radio-button-multiple';

describe('radio-button-multiple', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [RadioButtonMultiple],
      html: `<radio-button-multiple></radio-button-multiple>`,
    });
    expect(page.root).toEqualHtml(`
      <radio-button-multiple>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </radio-button-multiple>
    `);
  });
});
