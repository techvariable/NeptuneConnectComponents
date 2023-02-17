import { newSpecPage } from '@stencil/core/testing';
import { PermissionEditor } from '../permission-editor';

describe('permission-editor', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [PermissionEditor],
      html: `<permission-editor></permission-editor>`,
    });
    expect(page.root).toEqualHtml(`
      <permission-editor>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </permission-editor>
    `);
  });
});
