import { newE2EPage } from '@stencil/core/testing';

describe('download-result-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<download-result-modal></download-result-modal>');

    const element = await page.find('download-result-modal');
    expect(element).toHaveClass('hydrated');
  });
});
