import { P3Page } from './app.po';

describe('p3 App', () => {
  let page: P3Page;

  beforeEach(() => {
    page = new P3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
