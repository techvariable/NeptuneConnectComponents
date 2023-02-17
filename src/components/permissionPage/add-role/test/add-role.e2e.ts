import { newE2EPage } from '@stencil/core/testing';

describe('add-role', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<add-role></add-role>');

    const element = await page.find('add-role');
    expect(element).toHaveClass('hydrated');
  });
});
