import { KhkpOnlinePage } from './app.po';

describe('khkp-online App', function() {
  let page: KhkpOnlinePage;

  beforeEach(() => {
    page = new KhkpOnlinePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
