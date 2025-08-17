import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { NotFoundView } from '../not-found-view';

describe('<home-view> element', () => {
  let notFoundView: NotFoundView | null;

  beforeEach(() => {
    document.body.innerHTML = '';
    notFoundView = new NotFoundView();
    document.body.appendChild(notFoundView);
  });

  afterEach(() => {
    if (notFoundView) {
      notFoundView.remove();
      notFoundView = null;
    }
  });

  it('renders', async () => {
    expect(notFoundView).toBeDefined();
  });

  // TODO: More tests...
});
