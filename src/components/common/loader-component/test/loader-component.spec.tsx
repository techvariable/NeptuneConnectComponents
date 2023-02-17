import { newSpecPage } from '@stencil/core/testing';
import { LoaderComponent } from '../loader-component';

describe('loader-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [LoaderComponent],
      html: `<loader-component></loader-component>`,
    });
    expect(page.root).toEqualHtml(`
      <loader-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </loader-component>
    `);
  });
});
