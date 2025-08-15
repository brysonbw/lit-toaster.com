import { LitElement, css, html, nothing, type TemplateResult } from 'lit';
import { Task } from '@lit/task';
import { classMap } from 'lit/directives/class-map.js';
import { customElement, state } from 'lit/decorators.js';
import logo from '../assets/img/logo-alt-icon-transparent.png';
import { responsiveImageStyles } from '../shared/styles/responsiveImageStyles';
import { codeBlockStyles } from '../shared/styles/codeBlockStyles';
import {
  toast,
  ToasterElement,
  type ToastKind,
  type ToastPosition,
} from 'lit-toaster';
import { isURLValid } from '../utils/helperFunctions';
import {
  APP_TITLE,
  GITHUB_API_BASE_URL,
  REPO_OWNER,
  REPO_URL,
} from '../utils/constants';

// Constants
const DEFAULT_TOASTS_LIMIT: number = 7;
const TOAST_TYPES: readonly {
  type: ToastKind;
  icon: string;
  message: string;
}[] = [
  { type: 'success', icon: '✓', message: 'Operation completed successfully!' },
  {
    type: 'error',
    icon: '✗',
    message: 'An error occurred, please try again.',
  },
  { type: 'info', icon: 'i', message: 'New updates are available.' },
  { type: 'warning', icon: '!', message: 'Warning: Verify your selections.' },
];

@customElement('home-view')
export class HomeView extends LitElement {
  @state()
  private _selectedType: ToastKind = 'success';
  @state()
  private _position: ToastPosition = 'top-right';
  @state()
  private _toastsLimit: number | null = DEFAULT_TOASTS_LIMIT;

  connectedCallback(): void {
    super.connectedCallback();
    this._githubReleasesTask.run();
  }

  private _githubReleasesTask = new Task(this, {
    task: async (
      _args,
      { signal }
    ): Promise<{ tag_name: string; html_url: string }> => {
      return await fetch(
        `${GITHUB_API_BASE_URL}repos/${REPO_OWNER}/${APP_TITLE}/releases/latest`,
        { signal }
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data) {
            throw Error();
          }
          const { tag_name, html_url } = data;
          const url = isURLValid(html_url) ? html_url : `${REPO_URL}releases`;
          return { tag_name, html_url: url };
        });
    },
  });

  /**
   * Gets `<app-toaster></app-toaster> element
   */
  private get appToasterElement(): ToasterElement | null {
    return document.querySelector('app-toaster');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  updated(changedProperties: Map<string, any>): void {
    if (changedProperties.has('_toastsLimit')) {
      const oldValue = changedProperties.get('_toastsLimit');
      const newValue = this._toastsLimit;

      if (
        newValue !== undefined &&
        newValue !== null &&
        newValue !== oldValue
      ) {
        if (this.appToasterElement) {
          this.appToasterElement.queueLimit = newValue;
        }
      }
    }
  }

  render(): TemplateResult {
    return html`<div class="container">
      <!-- Hero -->
      ${this.heroSectionTemplate()}
      <!-- Call to action -->
      ${this.callToActionSectionTemplate()}
      <!-- Additional Information -->
      ${this.additionalInformationSectionTemplate()}
      <!-- Feature -->
      ${this.featuresSectionTemplate()}
      <!-- Steps -->
      ${this.stepsSectionTemplate()}
      <!-- Example Usage -->
      ${this.examplesSectionTemplate()}
    </div>`;
  }

  private heroSectionTemplate(): TemplateResult {
    return html`<section id="hero">
      <img class="logo" src="${logo}" alt="lit-toaster-logo" />
      <h1 class="title">Lit Toaster</h1>
      <h2 class="subtitle">Notifications for Lit Web Components</h2>
    </section>`;
  }

  private callToActionSectionTemplate(): TemplateResult {
    return html`<section id="ctas">
      <button
        @click=${(): void =>
          toast.show('Thanks for visiting - much peace and love.')}
        class="cta-btn create"
      >
        <span class="icon">🛎️</span>
        Create toast
      </button>
      <a href="${REPO_URL}" target="_blank" class="cta-btn github">
        <span class="icon">🐙</span>
        GitHub
      </a>
    </section>`;
  }

  private additionalInformationSectionTemplate(): TemplateResult {
    return html`<section id="additional-info">
      <div>
        <a
          class="api-reference-link"
          href="${REPO_URL}tree/main/docs/api-reference#lit-toaster-api-reference"
          target="_blank"
          >API Reference</a
        >
        ${this._githubReleasesTask.render({
          pending: () => html`loading...`,
          complete: (release) => html`
            <a href="${release.html_url}" target="_blank"
              >(${release.tag_name})</a
            >
          `,
          error: () => nothing,
        })}
      </div>
    </section>`;
  }

  private featuresSectionTemplate(): TemplateResult {
    return html`<section id="features">
      <div class="feature">
        <span class="feature-icon">⚡</span>
        <h3>Simple & Lightweight</h3>
        <p>
          Instant notifications with minimal footprint, built for Lit Web
          Components.
        </p>
      </div>
      <div class="feature">
        <span class="feature-icon">⚙️</span>
        <h3>Easy Integration</h3>
        <p>
          Quickly add Lit Toaster to any project with minimal setup and clear
          documentation.
        </p>
      </div>
      <div class="feature">
        <span class="feature-icon">🔔</span>
        <h3>Multiple Toast Types</h3>
        <p>Choose from info, success, warning, or error to fit the message.</p>
      </div>
    </section>`;
  }

  private stepsSectionTemplate(): TemplateResult {
    return html`<section id="steps">
      <div class="step">
        <span class="step-icon">1️⃣</span>
        <h3>Install</h3>
        <pre class="code-block">${'npm install lit-toaster\n\n'}</pre>
      </div>
      <div class="step">
        <span class="step-icon">2️⃣</span>
        <h3>Add Toaster To Template</h3>
        <pre class="code-block">${'<app-toaster></app-toaster>'}</pre>
      </div>
      <div class="step">
        <span class="step-icon">3️⃣</span>
        <h3>Call In Lit Web Component(s)</h3>
        <pre class="code-block">
${"toast.show('This is a toast notification!');"}</pre
        >
      </div>
    </section>`;
  }

  private examplesSectionTemplate(): TemplateResult {
    return html`<h2>Examples</h2>
      <section id="examples">
        <div class="left-side">
          <!-- Toast type chip/buttons -->
          ${TOAST_TYPES.map(
            (t) => html`
              <button
                class="chip"
                ?selected=${this._selectedType === t.type}
                @click=${(): void => this.onSelectToastType(t.type)}
                aria-pressed=${this._selectedType === t.type}
                type="button"
              >
                <span class=${classMap({ icon: true, [t.type]: true })}
                  >${t.icon}</span
                >
                <span class="label">${t.type}</span>
              </button>
            `
          )}
          <!-- Position select dropdown -->
          <label id="position-select-label" for="position-select">
            Position:
          </label>
          <select
            id="position-select"
            .value=${this._position}
            @change=${(event: Event): void => this.onPositionChange(event)}
          >
            <option value="top-left">Top Left</option>
            <option value="top-center">Top Center</option>
            <option value="top-right">Top Right</option>
            <option value="bottom-left">Bottom Left</option>
            <option value="bottom-center">Bottom Center</option>
            <option value="bottom-right">Bottom Right</option>
          </select>

          <!-- Toasts limit text field -->
          <label id="toasts-limit-label" for="toasts-limit">
            Toasts limit:
          </label>
          <input
            id="toasts-limit"
            type="number"
            .value="${this._toastsLimit}"
            @input=${(event: Event): void => this.onToastsLimitChange(event)}
          />
          ${Number(this._toastsLimit) <= 0
            ? html`<p class="toast-limit-warning">
                Input less than or equal to 0: Toasts limit disabled
              </p>`
            : nothing}
        </div>

        <!-- Code block example -->
        <div class="right-side">
          <pre class="code-block">
toast.show('${this.getToastMessage(this._selectedType)}', 7000, '${this
              ._selectedType}', '${this._position}');
          </pre
          >
        </div>
      </section>`;
  }

  private createExampleToast(): void {
    toast.show(
      `${this.getToastMessage(this._selectedType)}`,
      7000,
      `${this._selectedType}`,
      `${this._position}`
    );
  }

  private onSelectToastType(type: ToastKind): void {
    this._selectedType = type;
    this.createExampleToast();
  }

  private onPositionChange(event: Event): void {
    this._position = (event.target as HTMLSelectElement).value as ToastPosition;
    toast.show(
      `Position changed to ${this._position}.`,
      7000,
      'success',
      `${this._position}`
    );
    setTimeout(() => {
      this.createExampleToast();
    }, 50);
  }

  private onToastsLimitChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value ? Number(target.value) : null;
    this._toastsLimit = value;
  }

  private getToastMessage(type: ToastKind): string {
    const toast = TOAST_TYPES.find((toast) => toast.type === type);
    return toast!.message;
  }

  static styles = [
    responsiveImageStyles,
    codeBlockStyles,
    css`
      :host {
        width: 100%;
        height: 100%;
        display: block;
      }

      .container {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        margin-top: 50px;
      }

      #hero {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
      }

      .logo {
        display: block;
        margin-bottom: -25px;
        width: 30%;
        height: auto;
        max-width: 200px;
        max-height: 200px;
      }

      .title,
      .subtitle,
      #features p,
      #steps p,
      .toast-limit-warning {
        margin: 0;
      }

      .title {
        font-weight: 800;
        font-size: 2rem;
      }

      .subtitle {
        font-weight: 500;
        font-size: 1.5rem;
      }

      #additional-info a {
        text-decoration: none;
        color: #dfdfdfff;
      }

      #additional-info a:hover {
        text-decoration: underline;
      }

      #ctas,
      #additional-info {
        display: flex;
        justify-content: center;
        gap: 1rem;
        margin-top: 1.5rem;
      }

      .cta-btn {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.6rem 1rem;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 1rem;
        background-color: white;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        transition: transform 0.1s ease;
      }

      .cta-btn:hover {
        transform: scale(1.05);
      }

      .icon {
        font-size: 1.2rem;
      }

      .create {
        background-color: #ff9800;
        color: white;
      }

      .github {
        background-color: #24292f;
        color: white;
      }

      a.github {
        text-decoration: none;
      }

      #features,
      #steps {
        display: flex;
        flex-wrap: wrap;
        gap: 2rem;
        padding: 3rem 2rem;
        justify-content: center;
      }

      #features .feature {
        flex: 1 1 250px;
        max-width: 300px;
        background: #666f89;
        padding: 1.5rem;
        border-radius: 8px;
        text-align: center;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease;
      }

      #features .feature:hover {
        transform: translateY(-5px);
      }

      #features .feature-icon {
        font-size: 2rem;
        margin-bottom: 0.5rem;
        display: inline-block;
      }

      #features h3,
      #steps h3 {
        margin: 0.5rem 0;
        font-size: 1.25rem;
      }

      #steps .step {
        flex: 1 1 250px;
        max-width: 300px;
        text-align: center;
      }

      #steps .step-icon {
        font-size: 2.5rem;
        margin-bottom: 0.5rem;
        display: inline-block;
      }

      #examples {
        display: flex;
        gap: 2rem;
        max-width: 900px;
        margin: 2rem auto;
        padding: 1rem;
        min-width: 600px;
        flex-wrap: wrap;
      }

      .left-side {
        flex: 1 1 280px;
        min-width: 280px;
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 1rem;
      }

      .success {
        color: #14b8a6;
      }

      .info {
        color: #3b82f6;
      }

      .warning {
        color: #eab308;
      }

      .error {
        color: #ef4444;
      }

      .chip {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.4rem 0.8rem;
        border-radius: 8px;
        background: #1e1e1e;
        border: 2px solid transparent;
        color: #f8f8f2;
        font-weight: 600;
        cursor: pointer;
        user-select: none;
        transition: all 0.3s ease;
        font-size: 0.9rem;
        min-width: 100px;
        justify-content: center;
      }

      .chip .icon {
        font-size: 1.4rem;
        line-height: 1;
        display: inline-block;
      }

      .chip:hover {
        background-color: #333;
      }

      .chip[selected] {
        border-color: white;
        background-color: transparent;
        color: white;
        box-shadow: 0 0 10px transparent;
      }

      .chip[selected]:hover {
        border-color: white;
        background-color: #333;
        color: white;
        box-shadow: 0 0 10px transparent;
      }

      .right-side {
        flex: 1 1 580px;
        min-width: 300px;
      }

      #position-select-label {
        margin-top: 1rem;
        font-weight: 600;
        display: block;
      }

      #position-select {
        width: 100%;
        padding: 0.4rem;
        border-radius: 6px;
        background: #1e1e1e;
        color: #f8f8f2;
        border: 1px solid #444;
        height: 2.75rem;
      }

      #position-select:hover {
        cursor: pointer;
      }

      #toasts-limit {
        padding: 0.4rem;
        border: 1px solid #444;
        background: #1e1e1e;
        border-radius: 6px;
        width: 88%;
        height: 2rem;
      }

      #toasts-limit-label {
        margin-top: 1rem;
        font-weight: 600;
        display: block;
      }

      .toast-limit-warning {
        font-size: 1rem;
        width: 100%;
        color: #a0a0a0ff;
      }

      /* Responsive styles */
      @media (max-width: 720px) {
        .logo {
          width: 35%;
          height: 40%;
        }

        #examples {
          flex-direction: column;
          min-width: auto;
        }

        .left-side {
          grid-template-columns: 1fr;
          min-width: auto;
        }

        .right-side {
          min-width: auto;
          flex: 1 1 0px;
        }

        #toasts-limit {
          width: 96%;
        }
      }

      @media (max-width: 1019px) {
        #toasts-limit {
          width: 96%;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    'home-view': HomeView;
  }
}
