import { JadenByUPage } from './app.po';

describe('jaden-by-u App', () => {
  let page: JadenByUPage;

  beforeEach(() => {
    page = new JadenByUPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
