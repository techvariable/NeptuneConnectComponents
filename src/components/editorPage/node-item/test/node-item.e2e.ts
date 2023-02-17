import { newE2EPage } from '@stencil/core/testing';

describe('node-item', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<node-item></node-item>');

    const element = await page.find('node-item');
    expect(element).toHaveClass('hydrated');
  });
});
