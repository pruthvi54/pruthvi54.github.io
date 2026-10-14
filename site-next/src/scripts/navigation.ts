class StudyContents extends HTMLElement {
  private observer?: IntersectionObserver;
  connectedCallback() {
    const links = [...this.querySelectorAll<HTMLAnchorElement>('a[href^="#"]')];
    if (!links.length) return;
    const sections = links.map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1)))).filter((item): item is HTMLElement => Boolean(item));
    if (!sections.length) return;
    this.observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a,b) => a.boundingClientRect.top-b.boundingClientRect.top)[0];
      if (!visible) return;
      links.forEach((link) => link.classList.toggle('active', link.hash.slice(1) === visible.target.id));
    }, { rootMargin: '-12% 0px -72% 0px' });
    sections.forEach((section) => this.observer?.observe(section));
  }
  disconnectedCallback() { this.observer?.disconnect(); }
}

if (!customElements.get('study-contents')) customElements.define('study-contents', StudyContents);
