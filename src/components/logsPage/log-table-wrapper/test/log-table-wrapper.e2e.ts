import { newE2EPage } from '@stencil/core/testing';

describe('log-table-wrapper', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<log-table-wrapper></log-table-wrapper>');

    const element = await page.find('log-table-wrapper');
    expect(element).toHaveClass('hydrated');
  });
});
