import { newE2EPage } from '@stencil/core/testing';

describe('check-box', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<check-box></check-box>');

    const element = await page.find('check-box');
    expect(element).toHaveClass('hydrated');
  });
});
