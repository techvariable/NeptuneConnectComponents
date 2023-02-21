import { newE2EPage } from '@stencil/core/testing';

describe('menu-items', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<menu-items></menu-items>');

    const element = await page.find('menu-items');
    expect(element).toHaveClass('hydrated');
  });
});
