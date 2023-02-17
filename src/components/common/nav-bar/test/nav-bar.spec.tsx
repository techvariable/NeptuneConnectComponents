import { newSpecPage } from '@stencil/core/testing';
import { NavBar } from '../nav-bar';

describe('nav-bar', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NavBar],
      html: `<nav-bar></nav-bar>`,
    });
    expect(page.root).toEqualHtml(`
      <nav-bar>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </nav-bar>
    `);
  });
});
