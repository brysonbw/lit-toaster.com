import { expect, it, beforeEach, afterEach, describe } from 'vitest';
import { FooterComponent } from '../footer/footer';
import { APP_TITLE, REPO_SITE_URL } from '../../utils/constants';

describe('<footer> component element', () => {
  let footerComponentElement: FooterComponent | null;

  beforeEach(() => {
    document.body.innerHTML = '';
    footerComponentElement = new FooterComponent();
    document.body.appendChild(footerComponentElement);
  });

  afterEach(() => {
    if (footerComponentElement) {
      footerComponentElement.remove();
      footerComponentElement = null;
    }
  });

  it('renders', async () => {
    expect(footerComponentElement).toBeDefined();
  });

  it('renders footer content', async () => {
    expect(footerComponentElement).toBeDefined();

    if (footerComponentElement && 'updateComplete' in footerComponentElement) {
      await footerComponentElement.updateComplete;
    } else {
      throw new Error('footer not found');
    }

    const shadow = footerComponentElement.shadowRoot;
    const footer = shadow?.querySelector('footer');
    expect(footer).toBeTruthy();

    const litLink = shadow?.querySelector('a.lit-link') as HTMLAnchorElement;
    expect(litLink).toBeTruthy();
    expect(litLink?.href).toContain('https://lit.dev/');
    expect(litLink?.textContent).toBe('Lit');

    const siteLink = shadow?.querySelector('a.title') as HTMLAnchorElement;
    expect(siteLink).toBeTruthy();
    expect(siteLink?.href).toContain(`${REPO_SITE_URL}`);
    expect(siteLink?.textContent).toBe(`${APP_TITLE}`);

    // Current year is rendered inside a <p> tag
    const paragraphElements = shadow?.querySelectorAll('p') ?? null;
    expect(paragraphElements).not.toBeNull();
    expect(paragraphElements?.length).toBeGreaterThan(0);
    expect(paragraphElements?.length).toEqual(1);

    const yearParagraph = paragraphElements?.item(0);
    expect(yearParagraph).toBeTruthy();
    expect(yearParagraph?.textContent).toContain(
      `© ${new Date().getFullYear()}`
    );
  });
});
