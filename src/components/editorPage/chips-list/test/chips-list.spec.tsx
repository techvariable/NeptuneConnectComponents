import { newSpecPage } from '@stencil/core/testing';
import { ChipsList } from '../chips-list';

describe('chips-list', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [ChipsList],
      html: `<chips-list></chips-list>`,
    });
    expect(page.root).toEqualHtml(`
      <chips-list>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </chips-list>
    `);
  });
});
