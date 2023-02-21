import { newSpecPage } from '@stencil/core/testing';
import { NodeItem } from '../node-item';

describe('node-item', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NodeItem],
      html: `<node-item></node-item>`,
    });
    expect(page.root).toEqualHtml(`
      <node-item>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </node-item>
    `);
  });
});
