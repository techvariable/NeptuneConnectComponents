import { newE2EPage } from '@stencil/core/testing';

describe('table-search-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<table-search-modal></table-search-modal>');

    const element = await page.find('table-search-modal');
    expect(element).toHaveClass('hydrated');
  });
});
