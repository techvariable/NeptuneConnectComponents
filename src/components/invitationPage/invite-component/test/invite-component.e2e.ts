import { newE2EPage } from '@stencil/core/testing';

describe('invite-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<invite-component></invite-component>');

    const element = await page.find('invite-component');
    expect(element).toHaveClass('hydrated');
  });
});
