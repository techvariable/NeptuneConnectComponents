import { newE2EPage } from '@stencil/core/testing';

describe('logs-table', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<logs-table></logs-table>');

    const element = await page.find('logs-table');
    expect(element).toHaveClass('hydrated');
  });
});
