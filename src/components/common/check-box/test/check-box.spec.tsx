import { newSpecPage } from '@stencil/core/testing';
import { CheckBox } from '../check-box';

describe('check-box', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CheckBox],
      html: `<check-box></check-box>`,
    });
    expect(page.root).toEqualHtml(`
      <check-box>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </check-box>
    `);
  });
});
