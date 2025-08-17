import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement } from 'lit/decorators.js';
import { currentYear } from '../../utils/dateFunctions';
import { APP_TITLE, REPO_SITE_URL } from '../../utils/constants';

@customElement('app-footer')
export class FooterComponent extends LitElement {
  render(): TemplateResult {
    return html`<footer>
      <div class="footer-container">
        <div class="footer-text">
          Powered by
          <a class="lit-link" href="https://lit.dev/" target="_blank">Lit</a>
          •
          <p>© ${currentYear()}</p>
          •
          <a href="${REPO_SITE_URL}" class="title" target="_blank"
            >${APP_TITLE}</a
          >
        </div>
      </div>
    </footer>`;
  }

  static styles = css`
    .footer-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 10vh;
      flex-wrap: wrap;
    }

    .footer-text {
      display: flex;
      gap: 10px;
      align-items: center;
      color: rgb(172, 172, 172);
    }

    .lit-link {
      color: #54f7fdff;
    }

    a {
      text-decoration: none;
    }

    a:hover {
      text-decoration: underline;
    }

    .title {
      color: #db5e29ff;
    }

    @media only screen and (max-width: 640px) {
      .footer-text {
        font-size: 0.7rem;
      }
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'app-footer': FooterComponent;
  }
}
