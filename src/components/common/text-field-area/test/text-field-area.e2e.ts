import { newE2EPage } from '@stencil/core/testing';

describe('text-field-area', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field-area></text-field-area>');

    const element = await page.find('text-field-area');
    expect(element).toHaveClass('hydrated');
  });
});
