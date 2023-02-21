import { newE2EPage } from '@stencil/core/testing';

describe('editor-res', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<editor-res></editor-res>');

    const element = await page.find('editor-res');
    expect(element).toHaveClass('hydrated');
  });
});
