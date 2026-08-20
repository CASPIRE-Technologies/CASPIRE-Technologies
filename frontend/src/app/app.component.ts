import { AfterViewInit, Component, NgZone, OnDestroy, PLATFORM_ID, inject } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieBannerComponent],
  template: `
    <app-header></app-header>
    <main id="main-content" role="main">
      <router-outlet (activate)="queueReveal()"></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-cookie-banner></app-cookie-banner>
  `,
  styles: [`
    #main-content {
      min-height: calc(100vh - 72px - 350px);
    }
  `]
})
export class AppComponent implements AfterViewInit, OnDestroy {
  private doc = inject(DOCUMENT);
  private platformId = inject(PLATFORM_ID);
  private zone = inject(NgZone);
  private observer?: IntersectionObserver;
  private mutationObserver?: MutationObserver;
  private revealTimer?: ReturnType<typeof setTimeout>;

  ngAfterViewInit() {
    if (!isPlatformBrowser(this.platformId)) return;

    this.zone.runOutsideAngular(() => {
      this.observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              this.observer?.unobserve(entry.target);
            }
          }
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
      );

      this.mutationObserver = new MutationObserver(() => this.queueReveal());
      const main = this.doc.getElementById('main-content');
      if (main) {
        this.mutationObserver.observe(main, { childList: true, subtree: true });
      }

      this.queueReveal();
    });
  }

  queueReveal() {
    if (!isPlatformBrowser(this.platformId)) return;

    clearTimeout(this.revealTimer);
    this.revealTimer = setTimeout(() => this.prepareRevealElements(), 60);
  }

  ngOnDestroy() {
    clearTimeout(this.revealTimer);
    this.observer?.disconnect();
    this.mutationObserver?.disconnect();
  }

  private prepareRevealElements() {
    const selectors = [
      '.page-header .container',
      '.hero-content',
      '.trust-pill',
      '.section-header',
      '.card',
      '.problem-card',
      '.process-step',
      '.managed-content',
      '.managed-card',
      '.cta-section .container',
      '.footer-col',
    ].join(',');

    const elements = Array.from(this.doc.querySelectorAll<HTMLElement>(selectors));
    elements.forEach((element, index) => {
      if (element.classList.contains('scroll-reveal')) return;

      element.classList.add('scroll-reveal');
      element.style.setProperty('--reveal-delay', `${Math.min(index % 6, 5) * 55}ms`);
      this.observer?.observe(element);
    });
  }
}
