import { D3Page } from './app.po';

describe('d3 App', function() {
  let page: D3Page;

  beforeEach(() => {
    page = new D3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
