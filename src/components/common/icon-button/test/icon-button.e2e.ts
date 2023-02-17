import { newE2EPage } from '@stencil/core/testing';

describe('icon-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<icon-button></icon-button>');

    const element = await page.find('icon-button');
    expect(element).toHaveClass('hydrated');
  });
});
