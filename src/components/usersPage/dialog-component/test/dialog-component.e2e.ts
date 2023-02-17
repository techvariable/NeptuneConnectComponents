import { newE2EPage } from '@stencil/core/testing';

describe('dialog-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<dialog-component></dialog-component>');

    const element = await page.find('dialog-component');
    expect(element).toHaveClass('hydrated');
  });
});
