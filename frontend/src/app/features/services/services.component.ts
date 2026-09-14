import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <p class="eyebrow">Primary services</p>
        <h1>Software engineering & services catalog</h1>
        <p class="header-lead">
          Comprehensive digital capability spanning custom application development, quality engineering, backend APIs, SEO, and organic social media marketing.
        </p>
      </div>
    </section>

    <!-- Services Index -->
    <section class="section services-index">
      <div class="container">
        <div class="index-meta reveal">
          <span>{{ services().length }} services</span>
        </div>

        <div
          *ngFor="let s of services(); let i = index"
          class="service-row reveal"
          [class.reverse]="i % 2 === 1"
        >
          <div class="service-row-media" *ngIf="s.image">
            <img [src]="s.image" [alt]="s.title" loading="lazy" />
          </div>
          <div class="service-row-media service-row-media--empty" *ngIf="!s.image">
            <span nz-icon [nzType]="getServiceIcon(s.icon)" nzTheme="outline"></span>
          </div>

          <div class="service-row-content">
            <span class="row-index">{{ i + 1 < 10 ? '0' + (i + 1) : (i + 1) }}</span>
            <h2>{{ s.title }}</h2>
            <p class="short-desc">{{ s.shortDesc }}</p>

            <div class="problem-preview">
              <strong>Target challenge</strong>
              <p>{{ s.customerProblem }}</p>
            </div>

            <a [routerLink]="['/services', s.slug]" class="service-link">
              <span>Explore service details</span>
              <span class="link-arrow">→</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Banner -->
    <section class="section section-alt text-center">
      <div class="container reveal">
        <p class="eyebrow eyebrow--center">Not sure where to start?</p>
        <h2>Unsure which service matches your exact requirement?</h2>
        <p class="section-lead">Schedule a discovery call with our technical architect to assess your project requirements.</p>
        <a routerLink="/contact" class="btn btn-primary mt-4">Request a free technical assessment →</a>
      </div>
    </section>
  `,
  styles: [`
    /* ===== Page header ===== */
    .page-header {
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
      color: #ffffff;
      padding: 4.5rem 0;
      position: relative;
      overflow: hidden;

      h1 {
        color: #ffffff;
        margin-bottom: 0.75rem;
        max-width: 20ch;
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 100ms both;
      }
      .header-lead {
        color: #cbd5e1;
        font-size: 1.25rem;
        max-width: 640px;
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 220ms both;
      }
    }

    .eyebrow {
      color: var(--color-teal-accent);
      font-weight: 600;
      font-size: 0.95rem;
      margin: 0 0 0.85rem;
      animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .eyebrow--center { text-align: center; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* ===== Services index (alternating rows) ===== */
    .services-index {
      padding-top: 1rem;
    }

    .index-meta {
      display: flex;
      justify-content: flex-end;
      color: var(--color-charcoal-muted);
      font-size: 0.85rem;
      padding-bottom: 1.25rem;
      border-bottom: 1px solid rgba(15, 23, 42, 0.08);
      margin-bottom: 0.5rem;
    }

    .service-row {
      display: grid;
      grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
      gap: 3.5rem;
      align-items: center;
      padding: 3.75rem 0;
      border-bottom: 1px solid rgba(15, 23, 42, 0.08);
    }
    .service-row.reverse {
      grid-template-columns: minmax(0, 7fr) minmax(0, 5fr);
    }
    .service-row.reverse .service-row-media { order: 2; }
    .service-row.reverse .service-row-content { order: 1; }

    /* ===== Scroll reveal: media slides in from its side ===== */
    .service-row-media {
      position: relative;
      aspect-ratio: 4 / 3;
      overflow: hidden;
      border-radius: var(--radius-md);
      background: var(--color-bg-surface-elevated, #f1f5f9);
      opacity: 0;
      transform: translateX(-40px) scale(0.97);
      transition: opacity 0.8s cubic-bezier(0.16, 1, 0.3, 1), transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .service-row.reverse .service-row-media {
      transform: translateX(40px) scale(0.97);
    }
    .service-row.revealed .service-row-media {
      opacity: 1;
      transform: none;
    }

    .service-row-media img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
      transform: scale(1);
      transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .service-row:hover .service-row-media img {
      transform: scale(1.05);
    }
    .service-row-media--empty {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 3rem;
      color: var(--color-navy-dark);
    }

    /* ===== Scroll reveal: content cascades in, one piece at a time ===== */
    .service-row-content > * {
      opacity: 0;
      transform: translateY(16px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .service-row.revealed .service-row-content > * {
      opacity: 1;
      transform: none;
    }
    .service-row-content > *:nth-child(1) { transition-delay: 0.05s; }
    .service-row-content > *:nth-child(2) { transition-delay: 0.13s; }
    .service-row-content > *:nth-child(3) { transition-delay: 0.21s; }
    .service-row-content > *:nth-child(4) { transition-delay: 0.29s; }
    .service-row-content > *:nth-child(5) { transition-delay: 0.37s; }

    .row-index {
      display: block;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-teal-accent);
      margin-bottom: 0.75rem;
    }

    .service-row-content h2 {
      font-size: 1.9rem;
      color: var(--color-navy-dark);
      margin-bottom: 0.85rem;
    }

    .short-desc {
      color: var(--color-charcoal-muted);
      max-width: 46ch;
      margin-bottom: 1.5rem;
    }

    .problem-preview {
      border-left: 2px solid var(--color-teal-dark);
      padding-left: 1rem;
      max-width: 46ch;
      margin-bottom: 1.75rem;

      strong {
        display: block;
        font-size: 0.8rem;
        color: var(--color-navy-dark);
        margin-bottom: 0.25rem;
      }
      p {
        margin: 0;
        font-size: 0.925rem;
        color: var(--color-charcoal);
      }
    }

    .service-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-weight: 700;
      color: var(--color-navy-dark);
      position: relative;
    }
    .service-link::after {
      content: '';
      position: absolute;
      left: 0;
      right: 0;
      bottom: -4px;
      height: 1px;
      background: var(--color-teal-dark);
      transform: scaleX(0);
      transform-origin: left;
      transition: transform 0.35s ease;
    }
    .service-link:hover::after {
      transform: scaleX(1);
    }
    .link-arrow {
      transition: transform 0.3s ease;
    }
    .service-link:hover .link-arrow {
      transform: translateX(4px);
    }

    /* ===== Shared utility ===== */
    .text-center { text-align: center; }
    .mt-4 { margin-top: 1rem; }

    /* Generic scroll reveal (header meta row, banner) */
    .index-meta.reveal,
    .section-alt .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .index-meta.revealed,
    .section-alt .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }

    @media (prefers-reduced-motion: reduce) {
      .page-header h1, .page-header .header-lead, .eyebrow { animation: none; }
      .service-row-media,
      .service-row-content > *,
      .index-meta.reveal,
      .section-alt .reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
      .service-row-media img { transition: none; }
    }

    /* ===== Responsive ===== */
    @media (max-width: 900px) {
      .service-row,
      .service-row.reverse {
        grid-template-columns: 1fr;
        gap: 1.5rem;
        padding: 2.5rem 0;
      }
      .service-row.reverse .service-row-media,
      .service-row.reverse .service-row-content {
        order: initial;
      }
      .service-row-media,
      .service-row.reverse .service-row-media {
        transform: translateY(24px);
      }
      .service-row.revealed .service-row-media {
        transform: none;
      }
      .service-row-media { aspect-ratio: 16 / 10; }
      .service-row-content h2 { font-size: 1.5rem; }
    }

    @media (max-width: 767px) {
      .page-header { padding: 3rem 0; }
    }
  `]
})
export class ServicesComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private api = inject(ApiService);
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  services = signal<any[]>([]);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'IT & Software Engineering Services',
      description: 'Explore custom web applications, SME digitization, backend APIs, QA testing, DevOps, SEO, and organic social media marketing.',
    });

    this.api.get<any[]>('services').subscribe({
      next: (data) => {
        this.services.set(this.withMarketingServices(data));
        setTimeout(() => this.observeReveal());
      },
      error: () => {
        this.services.set(this.getFallbackServices());
        setTimeout(() => this.observeReveal());
      },
    });
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

  getServiceIcon(icon: string): string {
    const map: Record<string, string> = {
      code: 'code',
      cpu: 'thunderbolt',
      server: 'cluster',
      'shield-check': 'security-scan',
      cloud: 'cloud',
      search: 'search',
      social: 'share-alt',
    };
    return map[icon] || 'rocket';
  }

  private withMarketingServices(services: any[]) {
    const visibleServices = services.filter((service) => service.slug !== 'dedicated-engineering-teams');
    const slugs = new Set(visibleServices.map((service) => service.slug));
    return [
      ...visibleServices,
      ...this.marketingServices().filter((service) => !slugs.has(service.slug)),
    ].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
  }

  private marketingServices() {
    return [
      { slug: 'seo', title: 'SEO', icon: 'search', shortDesc: 'Technical, on-page, and local SEO improvements that help customers find your business through organic search.', customerProblem: 'A polished website still loses leads when it is not structured, written, and indexed for search visibility.', displayOrder: 6, image: '../../../assets/services/seo.png' },
      { slug: 'social-media-marketing', title: 'Social Media Marketing', icon: 'social', shortDesc: 'Organic social media planning, content calendars, creative posts, and profile management without paid boosting.', customerProblem: 'Inconsistent posting and unclear messaging make it difficult to build trust and stay visible online.', displayOrder: 7, image: '../../../assets/services/social-media.png' },
    ];
  }

  private getFallbackServices() {
    return [
      { slug: 'custom-web-applications', title: 'Custom Web Applications', icon: 'code', shortDesc: 'Tailor-made web applications designed for high performance, enterprise security, and long-term scalability.', customerProblem: 'Off-the-shelf software forces businesses into rigid workflows.', image: '../../../assets/services/custom-web-application.jpeg' },
      { slug: 'sme-digital-transformation', title: 'SME Workflow Digitization', icon: 'cpu', shortDesc: 'Automate manual paper processes, eliminate spreadsheet errors, and digitize core business operations.', customerProblem: 'Fragmented spreadsheets cause data errors and lost records.', image: '../../../assets/services/sme.png' },
      { slug: 'backend-api-development', title: 'Backend & API Development', icon: 'server', shortDesc: 'Robust RESTful and GraphQL APIs, microservices architecture, and secure enterprise integration layers.', customerProblem: 'Legacy APIs crash under peak concurrency.', image: '../../../assets/services/backend-services.png' },
      { slug: 'qa-and-test-automation', title: 'QA & Test Automation', icon: 'shield-check', shortDesc: 'Independent quality engineering, automated regression testing, performance profiling, and security testing.', customerProblem: 'Releasing unverified software damages brand trust.', image: '../../../assets/services/qa.png' },
      { slug: 'cloud-deployment-devops', title: 'Cloud Deployment & DevOps', icon: 'cloud', shortDesc: 'Automated CI/CD pipelines, Docker containerization, cloud infrastructure management, and monitoring.', customerProblem: 'Manual server deployments are error-prone.', image: '../../../assets/services/devops.png' },
      ...this.marketingServices(),
    ];
  }
}