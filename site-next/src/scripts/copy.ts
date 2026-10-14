class CopyText extends HTMLElement {
  private controller?: AbortController;
  private timer?: number;

  connectedCallback() {
    this.controller = new AbortController();
    const button = this.querySelector('button');
    const status = this.querySelector<HTMLElement>('.copy-status');
    const fallback = this.querySelector<HTMLInputElement>('.copy-fallback');
    if (!button || !status || !fallback) return;
    button.hidden = false;
    button.addEventListener('click', async () => {
      const value = this.dataset.copy ?? '';
      if (this.timer) window.clearTimeout(this.timer);
      try {
        if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
        await navigator.clipboard.writeText(value);
        fallback.hidden = true;
        status.textContent = 'Copied';
        this.timer = window.setTimeout(() => { status.textContent = ''; }, 2000);
      } catch {
        fallback.hidden = false;
        fallback.value = value;
        status.textContent = 'Select and copy';
        fallback.focus();
        fallback.select();
      }
    }, { signal: this.controller.signal });
  }

  disconnectedCallback() {
    this.controller?.abort();
    if (this.timer) window.clearTimeout(this.timer);
  }
}

if (!customElements.get('copy-text')) customElements.define('copy-text', CopyText);
