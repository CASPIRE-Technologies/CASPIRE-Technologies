import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <div class="badge badge-teal mb-2">
          <span class="pulse-dot"></span> Selected Live Work
        </div>
        <h1>Projects & Industry Expertise</h1>
        <p class="header-lead">
          A selection of live websites designed and built for hospitality, e-commerce, and entertainment brands.
        </p>
      </div>
    </section>

    <!-- Live project examples -->
    <section class="section">
      <div class="container">
        <div class="section-intro">
          <span class="eyebrow">Live work</span>
          <h2>Websites we've built</h2>
          <p>Explore selected live experiences crafted by the CASPIRE team.</p>
        </div>

        <!-- Projects Grid -->
        <div class="portfolio-grid mt-4">
          <article *ngFor="let proj of projects(); let i = index" class="portfolio-card reveal" [style.transition-delay.ms]="i * 70">
            <div class="project-image-wrap">
              <img [src]="proj.image" [alt]="proj.title + ' website preview'" class="project-image" />
              <div class="project-overlay">
                <a class="preview-btn" [href]="proj.previewUrl" target="_blank" rel="noopener noreferrer">
                  Preview site <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
            <div class="project-content">
              <span class="project-type">{{ proj.type }}</span>
              <h2>{{ proj.title }}</h2>
              <p>{{ proj.summary }}</p>
              <a class="text-link" [href]="proj.previewUrl" target="_blank" rel="noopener noreferrer">Visit live site <span aria-hidden="true">→</span></a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section-dark text-center">
      <div class="container reveal">
        <h2>Don't see your industry listed?</h2>
        <p class="cta-lead">We build custom platforms for sectors beyond these case studies. Tell us about your business and we'll scope a solution.</p>
        <a routerLink="/contact" class="btn btn-primary mt-4">Discuss Your Project →</a>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
      color: #ffffff;
      padding: 4rem 0;
      overflow-wrap: break-word;
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.25rem; max-width: 700px; }
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: var(--color-teal-accent);
      border-radius: 50%;
      display: inline-block;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.55; transform: scale(1.35); }
    }

    .section-intro { max-width: 620px; margin-bottom: 2rem; }
    .section-intro h2 { margin: 0.35rem 0 0.5rem; }
    .section-intro p { margin: 0; color: var(--color-charcoal-muted); font-size: 1.05rem; }
    .eyebrow, .project-type {
      color: var(--color-teal-dark);
      font-size: 0.75rem;
      font-weight: 800;
      letter-spacing: 0.12em;
      text-transform: uppercase;
    }

    /* Projects Grid — minmax with a hard fallback so long content never
       forces a track wider than the viewport, at any screen size */
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }
    .portfolio-card {
      position: relative;
      overflow: hidden;
      background: #ffffff;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      min-width: 0;
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }
    .portfolio-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
    }
    .project-image-wrap { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #111827; }
    .project-image { width: 100%; height: 100%; display: block; object-fit: contain; object-position: center; transition: transform 0.5s ease; }
    .portfolio-card:hover .project-image, .portfolio-card:focus-within .project-image { transform: scale(1.04); }
    .project-overlay {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      background: rgba(4, 14, 25, 0.58);
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .portfolio-card:hover .project-overlay, .portfolio-card:focus-within .project-overlay { opacity: 1; }
    .preview-btn {
      color: #111827;
      background: #ffffff;
      padding: 0.75rem 1rem;
      border-radius: var(--radius-full);
      font-weight: 800;
      text-decoration: none;
      box-shadow: 0 8px 20px rgba(0,0,0,0.18);
    }
    .preview-btn:hover { background: var(--color-teal-accent); color: #ffffff; }
    .project-content { padding: 1.35rem 1.5rem 1.5rem; }
    .project-content h2 { margin: 0.45rem 0 0.5rem; font-size: 1.45rem; }
    .project-content p { margin: 0 0 1rem; color: var(--color-charcoal-muted); }
    .text-link { color: var(--color-teal-dark); font-weight: 800; text-decoration: none; }
    .text-link:hover { color: var(--color-navy-dark); }
    .text-link span { display: inline-block; transition: transform 0.2s ease; }
    .text-link:hover span { transform: translateX(4px); }
    .portfolio-card:focus-within { outline: 3px solid rgba(13, 148, 136, 0.28); outline-offset: 3px; }

    .cta-lead { font-size: 1.25rem; max-width: 650px; margin: 0.5rem auto 0 auto; color: #cbd5e1; }
    .text-center { text-align: center; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-4 { margin-top: 1rem; }

    /* Scroll reveal */
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
      .pulse-dot { animation: none; }
    }

    /* ===== Responsive ===== */
    @media (max-width: 1024px) {
      .portfolio-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    }

    @media (max-width: 767px) {
      .page-header { padding: 2.75rem 0; }
      .card.portfolio-card { padding: 1.25rem; }
      .project-content { padding: 1.15rem; }
    }

    @media (max-width: 480px) {
      .portfolio-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  projects = signal([
    {
      title: "Daddy's Guest House",
      type: 'Tourism & hospitality',
      summary: 'A warm, conversion-focused guest house experience for stays in Nallathanniya.',
      image: '/assets/projects/daddys-guest-house.png',
      previewUrl: 'https://daddy-s-gust-house-ap5c.vercel.app',
    },
    {
      title: 'MiniVerse Prints',
      type: '3D printing & e-commerce',
      summary: 'A bold product-led storefront for custom 3D-printed miniatures and collectibles.',
      image: '/assets/projects/miniverse-prints.png',
      previewUrl: 'https://www.miniverseprints.com/',
    },
    {
      title: 'Cristina Casado Official Site',
      type: 'Music & entertainment',
      summary: 'An atmospheric artist website for showcasing music, videos, events, and new releases.',
      image: '/assets/projects/Screenshot 2026-10-20 at 11.00.18.png',
      previewUrl: 'https://musicsite-kappa.vercel.app',
    },
  ]);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Projects & Live Websites | CASPIRE',
      description: 'Explore live websites designed and built by CASPIRE for hospitality, e-commerce, and entertainment brands.',
    });

    setTimeout(() => this.observeReveal());
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            this.observer?.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    this.observeReveal();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private observeReveal() {
    const elements = this.el.nativeElement.querySelectorAll('.reveal:not(.revealed)');
    elements.forEach((elToObserve: Element) => this.observer?.observe(elToObserve));
  }

}
