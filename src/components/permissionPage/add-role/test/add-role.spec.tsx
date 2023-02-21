import { newSpecPage } from '@stencil/core/testing';
import { AddRole } from '../add-role';

describe('add-role', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [AddRole],
      html: `<add-role></add-role>`,
    });
    expect(page.root).toEqualHtml(`
      <add-role>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </add-role>
    `);
  });
});
