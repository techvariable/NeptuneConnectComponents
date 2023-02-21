import { newSpecPage } from '@stencil/core/testing';
import { DialogComponent } from '../dialog-component';

describe('dialog-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [DialogComponent],
      html: `<dialog-component></dialog-component>`,
    });
    expect(page.root).toEqualHtml(`
      <dialog-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </dialog-component>
    `);
  });
});
