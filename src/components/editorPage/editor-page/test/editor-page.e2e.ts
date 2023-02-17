import { newE2EPage } from '@stencil/core/testing';

describe('editor-page', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<editor-page></editor-page>');

    const element = await page.find('editor-page');
    expect(element).toHaveClass('hydrated');
  });
});
