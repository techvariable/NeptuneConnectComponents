import { newE2EPage } from '@stencil/core/testing';

describe('user-drop-down', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<user-drop-down></user-drop-down>');

    const element = await page.find('user-drop-down');
    expect(element).toHaveClass('hydrated');
  });
});
