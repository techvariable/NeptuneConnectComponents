import { newE2EPage } from '@stencil/core/testing';

describe('text-field', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<text-field></text-field>');

    const element = await page.find('text-field');
    expect(element).toHaveClass('hydrated');
  });
});
