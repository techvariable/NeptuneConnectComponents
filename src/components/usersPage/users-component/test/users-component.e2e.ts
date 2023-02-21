import { newE2EPage } from '@stencil/core/testing';

describe('users-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<users-component></users-component>');

    const element = await page.find('users-component');
    expect(element).toHaveClass('hydrated');
  });
});
