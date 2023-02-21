import { newE2EPage } from '@stencil/core/testing';

describe('editor-json-response-viewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<editor-json-response-viewer></editor-json-response-viewer>');

    const element = await page.find('editor-json-response-viewer');
    expect(element).toHaveClass('hydrated');
  });
});
