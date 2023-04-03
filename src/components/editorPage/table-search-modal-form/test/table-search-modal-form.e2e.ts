import { newE2EPage } from '@stencil/core/testing';

describe('table-search-modal-form', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<table-search-modal-form></table-search-modal-form>');

    const element = await page.find('table-search-modal-form');
    expect(element).toHaveClass('hydrated');
  });
});
