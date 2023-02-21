import { newE2EPage } from '@stencil/core/testing';

describe('tabs-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tabs-component></tabs-component>');

    const element = await page.find('tabs-component');
    expect(element).toHaveClass('hydrated');
  });
});
