import { newSpecPage } from '@stencil/core/testing';
import { TabsComponent } from '../tabs-component';

describe('tabs-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [TabsComponent],
      html: `<tabs-component></tabs-component>`,
    });
    expect(page.root).toEqualHtml(`
      <tabs-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </tabs-component>
    `);
  });
});
