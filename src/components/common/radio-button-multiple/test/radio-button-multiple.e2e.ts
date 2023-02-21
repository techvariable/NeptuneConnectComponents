import { newE2EPage } from '@stencil/core/testing';

describe('radio-button-multiple', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<radio-button-multiple></radio-button-multiple>');

    const element = await page.find('radio-button-multiple');
    expect(element).toHaveClass('hydrated');
  });
});
