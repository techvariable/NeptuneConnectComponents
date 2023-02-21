import { newSpecPage } from '@stencil/core/testing';
import { MultiSelectChoicesJs } from '../multi-select-choices-js';

describe('multi-select-choices-js', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [MultiSelectChoicesJs],
      html: `<multi-select-choices-js></multi-select-choices-js>`,
    });
    expect(page.root).toEqualHtml(`
      <multi-select-choices-js>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </multi-select-choices-js>
    `);
  });
});
