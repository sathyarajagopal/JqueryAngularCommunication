import { NgpubsubPage } from './app.po';

describe('ngpubsub App', () => {
  let page: NgpubsubPage;

  beforeEach(() => {
    page = new NgpubsubPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
