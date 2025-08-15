import { LitElement, css, html, type TemplateResult } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('not-found-view')
export class NotFoundView extends LitElement {
  @property()
  name?: string = 'not-found-view';

  render(): TemplateResult {
    return html`<div>
      <div class="title">
        <p>Page Not Found</p>
      </div>
      <div class="message">
        <p>Unfortunately, the requested resource could not be found.</p>
      </div>
      <div class="button-wrapper">
        <a href="/">Return Home</a>
      </div>
    </div>`;
  }

  static styles = css`
    :host {
      width: 100%;
      display: flex;
      justify-content: center;
      text-align: center;
    }

    .title {
      font-weight: 600;
      font-size: 1.875rem;
      line-height: 2.25rem;
    }

    .message {
      font-size: 0.875rem;
      font-weight: 500;
      color: #9ca3af;
      margin-bottom: 20px;
    }

    .button-wrapper {
      display: flex;
      justify-content: center;
      margin-top: 0.5rem;
    }

    a {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 1.5rem;
      background-color: #007bff;
      border-radius: 9999px;
      text-decoration: none;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.2s ease;
      outline-color: none;
      border: none;
      color: var(--white);
    }

    a:hover {
      background-color: #0056b3;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    'not-found-view': NotFoundView;
  }
}
