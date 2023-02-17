import { newE2EPage } from '@stencil/core/testing';

describe('permission-editor', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<permission-editor></permission-editor>');

    const element = await page.find('permission-editor');
    expect(element).toHaveClass('hydrated');
  });
});
