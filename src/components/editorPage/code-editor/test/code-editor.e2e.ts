import { newE2EPage } from '@stencil/core/testing';

describe('code-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<code-editor></code-editor>');

    const element = await page.find('code-editor');
    expect(element).toHaveClass('hydrated');
  });
});
