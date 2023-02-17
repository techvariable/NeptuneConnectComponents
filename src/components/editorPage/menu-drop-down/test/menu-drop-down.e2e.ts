import { newE2EPage } from '@stencil/core/testing';

describe('menu-drop-down', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<menu-drop-down></menu-drop-down>');

    const element = await page.find('menu-drop-down');
    expect(element).toHaveClass('hydrated');
  });
});
