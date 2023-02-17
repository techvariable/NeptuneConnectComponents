import { newE2EPage } from '@stencil/core/testing';

describe('loader-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<loader-component></loader-component>');

    const element = await page.find('loader-component');
    expect(element).toHaveClass('hydrated');
  });
});
