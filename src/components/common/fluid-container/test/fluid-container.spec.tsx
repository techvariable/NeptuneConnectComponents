import { newSpecPage } from '@stencil/core/testing';
import { FluidContainer } from '../fluid-container';

describe('fluid-container', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [FluidContainer],
      html: `<fluid-container></fluid-container>`,
    });
    expect(page.root).toEqualHtml(`
      <fluid-container>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </fluid-container>
    `);
  });
});
