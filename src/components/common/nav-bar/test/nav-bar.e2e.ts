import { newE2EPage } from '@stencil/core/testing';

describe('nav-bar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<nav-bar></nav-bar>');

    const element = await page.find('nav-bar');
    expect(element).toHaveClass('hydrated');
  });
});
