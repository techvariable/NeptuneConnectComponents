import { newE2EPage } from '@stencil/core/testing';

describe('edit-user', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<edit-user></edit-user>');

    const element = await page.find('edit-user');
    expect(element).toHaveClass('hydrated');
  });
});
