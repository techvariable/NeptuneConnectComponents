import { newE2EPage } from '@stencil/core/testing';

describe('tab-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<tab-component></tab-component>');

    const element = await page.find('tab-component');
    expect(element).toHaveClass('hydrated');
  });
});
