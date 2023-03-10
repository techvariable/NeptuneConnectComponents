import { newE2EPage } from '@stencil/core/testing';

describe('toggle-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<toggle-button></toggle-button>');

    const element = await page.find('toggle-button');
    expect(element).toHaveClass('hydrated');
  });
});
