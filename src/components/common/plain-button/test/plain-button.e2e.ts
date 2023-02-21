import { newE2EPage } from '@stencil/core/testing';

describe('plain-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<plain-button></plain-button>');

    const element = await page.find('plain-button');
    expect(element).toHaveClass('hydrated');
  });
});
