import { newE2EPage } from '@stencil/core/testing';

describe('data-table-updated', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<data-table-updated></data-table-updated>');

    const element = await page.find('data-table-updated');
    expect(element).toHaveClass('hydrated');
  });
});
