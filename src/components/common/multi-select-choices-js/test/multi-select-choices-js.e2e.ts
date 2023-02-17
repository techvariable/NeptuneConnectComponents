import { newE2EPage } from '@stencil/core/testing';

describe('multi-select-choices-js', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<multi-select-choices-js></multi-select-choices-js>');

    const element = await page.find('multi-select-choices-js');
    expect(element).toHaveClass('hydrated');
  });
});
