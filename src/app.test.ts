import { describe, it, expect, afterEach, beforeEach } from 'vitest';
import { AppRoot } from './app';

describe('<app-root> element', () => {
  let appRootElement: AppRoot | null;

  beforeEach(() => {
    document.body.innerHTML = '';
    appRootElement = new AppRoot();
    document.body.appendChild(appRootElement);
  });

  afterEach(() => {
    if (appRootElement) {
      appRootElement.remove();
      appRootElement = null;
    }
  });

  it('renders', async () => {
    expect(appRootElement).toBeDefined();
  });

  // TODO: More tests...
});
