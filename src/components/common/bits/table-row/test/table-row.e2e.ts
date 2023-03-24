import { newE2EPage } from '@stencil/core/testing';

describe('table-row', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<table-row></table-row>');

    const element = await page.find('table-row');
    expect(element).toHaveClass('hydrated');
  });
});
