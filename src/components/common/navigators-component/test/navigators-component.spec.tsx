import { newSpecPage } from '@stencil/core/testing';
import { NavigatorsComponent } from '../navigators-component';

describe('navigators-component', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [NavigatorsComponent],
      html: `<navigators-component></navigators-component>`,
    });
    expect(page.root).toEqualHtml(`
      <navigators-component>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </navigators-component>
    `);
  });
});
