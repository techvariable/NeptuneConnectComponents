import { newE2EPage } from '@stencil/core/testing';

describe('navigators-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<navigators-component></navigators-component>');

    const element = await page.find('navigators-component');
    expect(element).toHaveClass('hydrated');
  });
});
