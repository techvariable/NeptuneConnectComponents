import { newE2EPage } from '@stencil/core/testing';

describe('multi-select-custom', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<multi-select-custom></multi-select-custom>');

    const element = await page.find('multi-select-custom');
    expect(element).toHaveClass('hydrated');
  });
});
