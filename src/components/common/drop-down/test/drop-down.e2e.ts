import { newE2EPage } from '@stencil/core/testing';

describe('drop-down', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<drop-down></drop-down>');

    const element = await page.find('drop-down');
    expect(element).toHaveClass('hydrated');
  });
});
