import { newE2EPage } from '@stencil/core/testing';

describe('query-logs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<query-logs></query-logs>');

    const element = await page.find('query-logs');
    expect(element).toHaveClass('hydrated');
  });
});
