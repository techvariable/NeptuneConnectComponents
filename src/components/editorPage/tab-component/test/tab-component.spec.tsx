import { newSpecPage } from '@stencil/core/testing';
import { TabComponent } from '../tab-component';

describe('tab-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TabComponent],
      html: `<tab-component></tab-component>`,
    });
    expect(page.root).toEqualHtml(`
      <tab-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tab-component>
    `);
  });
});
