import { Router } from '@vaadin/router';
import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { routes } from './routes.js';

import './components/footer/footer.ts';

@customElement('app-root')
export class AppRoot extends LitElement {
  firstUpdated(): void {
    const router = new Router(this._outlet);
    router.setRoutes(routes);
  }

  /**
   * Get Vaadin Router outlet
   */
  private get _outlet(): HTMLElement | null {
    return this.renderRoot.querySelector('#outlet');
  }

  render(): TemplateResult {
    return html`<main>
      <div id="outlet"></div>
      <app-footer></app-footer>
    </main>`;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    main {
      width: min(95ch, 100% - 4rem);
      margin-inline: auto;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    #outlet {
      flex: 1;
      display: flex;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-root': AppRoot;
  }
}
