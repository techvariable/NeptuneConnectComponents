import { newE2EPage } from '@stencil/core/testing';

describe('chips-list', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<chips-list></chips-list>');

    const element = await page.find('chips-list');
    expect(element).toHaveClass('hydrated');
  });
});
