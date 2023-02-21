import { newE2EPage } from '@stencil/core/testing';

describe('query-result-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<query-result-table></query-result-table>');

    const element = await page.find('query-result-table');
    expect(element).toHaveClass('hydrated');
  });
});
