import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { HomeView } from '../home-view';

describe('<home-view> element', () => {
  let homeView: HomeView | null;

  beforeEach(() => {
    document.body.innerHTML = '';
    homeView = new HomeView();
    document.body.appendChild(homeView);
  });

  afterEach(() => {
    if (homeView) {
      homeView.remove();
      homeView = null;
    }
  });

  it('renders', async () => {
    expect(homeView).toBeDefined();
  });

  // TODO: More tests...
});
