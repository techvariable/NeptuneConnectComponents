import { newE2EPage } from '@stencil/core/testing';

describe('json-response-viewer', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<json-response-viewer></json-response-viewer>');

    const element = await page.find('json-response-viewer');
    expect(element).toHaveClass('hydrated');
  });
});
