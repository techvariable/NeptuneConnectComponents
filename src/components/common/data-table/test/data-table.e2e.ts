import { newE2EPage } from '@stencil/core/testing';

describe('data-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<data-table></data-table>');

    const element = await page.find('data-table');
    expect(element).toHaveClass('hydrated');
  });
});
