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
        <div class="badge badge-teal mb-3">
          <span class="pulse-dot"></span> Primary Services
        </div>
        <h1>Software Engineering & Services Catalog</h1>
        <p class="header-lead">
          Comprehensive digital capability spanning custom application development, quality engineering, backend APIs, SEO, and organic social media marketing.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section">
      <div class="container">
        <div class="services-list-grid">
          <div
            *ngFor="let s of services(); let i = index"
            class="card service-card-detailed reveal"
            [style.transition-delay.ms]="i * 80"
          >
            <div class="card-icon-box">
              <span nz-icon [nzType]="getServiceIcon(s.icon)" nzTheme="outline"></span>
            </div>
            <div class="card-body">
              <h2>{{ s.title }}</h2>
              <p class="short-desc">{{ s.shortDesc }}</p>

              <div class="problem-preview">
                <span nz-icon nzType="alert" nzTheme="outline" class="problem-icon"></span>
                <div>
                  <strong>Target Challenge</strong>
                  <p>{{ s.customerProblem }}</p>
                </div>
              </div>

              <div class="card-actions mt-4">
                <a [routerLink]="['/services', s.slug]" class="service-link">
                  Explore Service Details →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Banner -->
    <section class="section section-alt text-center">
      <div class="container reveal">
        <span class="badge badge-navy mb-2">Not Sure Where to Start?</span>
        <h2>Unsure which service matches your exact requirement?</h2>
        <p class="section-lead">Schedule a discovery call with our technical architect to assess your project requirements.</p>
        <a routerLink="/contact" class="btn btn-primary mt-4">Request a Free Technical Assessment →</a>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
      color: #ffffff;
      padding: 4.5rem 0;
      position: relative;
      overflow: hidden;

      h1 {
        color: #ffffff;
        margin-bottom: 0.75rem;
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 100ms both;
      }
      .header-lead {
        color: #cbd5e1;
        font-size: 1.25rem;
        max-width: 700px;
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) 220ms both;
      }
      .badge {
        animation: fadeInUp 0.7s cubic-bezier(0.16, 1, 0.3, 1) both;
      }
    }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(20px); }
      to { opacity: 1; transform: translateY(0); }
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

    .services-list-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }

    .service-card-detailed {
      display: flex;
      flex-direction: column;
      height: 100%;
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .service-card-detailed:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
      border-color: var(--color-teal-accent);
    }

    .card-icon-box {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      background: var(--color-bg-surface-elevated, #f8fafc);
      color: var(--color-navy-dark);
      font-size: 1.625rem;
      margin-bottom: 1.25rem;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, color 0.35s ease;
    }
    .service-card-detailed:hover .card-icon-box {
      transform: scale(1.1) rotate(4deg);
      background: var(--color-navy-dark);
      color: #ffffff;
    }

    .short-desc { color: var(--color-charcoal-muted); margin-bottom: 1.25rem; }

    .problem-preview {
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
      background-color: var(--color-bg-surface-elevated);
      padding: 0.875rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      color: var(--color-charcoal);
      border-left: 3px solid var(--color-teal-dark);
      margin-top: auto;

      strong { display: block; margin-bottom: 0.15rem; }
      p { margin: 0; }
    }
    .problem-icon {
      color: var(--color-teal-dark);
      font-size: 1rem;
      margin-top: 0.15rem;
      flex-shrink: 0;
    }

    .service-link {
      display: inline-block;
      margin-top: 1.25rem;
      font-weight: 700;
      color: var(--color-teal-dark);
    }

    .text-center { text-align: center; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-3 { margin-bottom: 1rem; }
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
      .page-header h1, .page-header .header-lead, .page-header .badge, .pulse-dot { animation: none; }
    }

    /* ===== Responsive ===== */
    @media (max-width: 1024px) {
      .services-list-grid { grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
    }

    @media (max-width: 767px) {
      .page-header { padding: 3rem 0; }
    }

    @media (max-width: 480px) {
      .services-list-grid { grid-template-columns: 1fr; }
      .card-icon-box { width: 48px; height: 48px; font-size: 1.375rem; }
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
      { slug: 'seo', title: 'SEO', icon: 'search', shortDesc: 'Technical, on-page, and local SEO improvements that help customers find your business through organic search.', customerProblem: 'A polished website still loses leads when it is not structured, written, and indexed for search visibility.', displayOrder: 6 },
      { slug: 'social-media-marketing', title: 'Social Media Marketing', icon: 'social', shortDesc: 'Organic social media planning, content calendars, creative posts, and profile management without paid boosting.', customerProblem: 'Inconsistent posting and unclear messaging make it difficult to build trust and stay visible online.', displayOrder: 7 },
    ];
  }

  private getFallbackServices() {
    return [
      { slug: 'custom-web-applications', title: 'Custom Web Applications', icon: 'code', shortDesc: 'Tailor-made web applications designed for high performance, enterprise security, and long-term scalability.', customerProblem: 'Off-the-shelf software forces businesses into rigid workflows.' },
      { slug: 'sme-digital-transformation', title: 'SME Workflow Digitization', icon: 'cpu', shortDesc: 'Automate manual paper processes, eliminate spreadsheet errors, and digitize core business operations.', customerProblem: 'Fragmented spreadsheets cause data errors and lost records.' },
      { slug: 'backend-api-development', title: 'Backend & API Development', icon: 'server', shortDesc: 'Robust RESTful and GraphQL APIs, microservices architecture, and secure enterprise integration layers.', customerProblem: 'Legacy APIs crash under peak concurrency.' },
      { slug: 'qa-and-test-automation', title: 'QA & Test Automation', icon: 'shield-check', shortDesc: 'Independent quality engineering, automated regression testing, performance profiling, and security testing.', customerProblem: 'Releasing unverified software damages brand trust.' },
      { slug: 'cloud-deployment-devops', title: 'Cloud Deployment & DevOps', icon: 'cloud', shortDesc: 'Automated CI/CD pipelines, Docker containerization, cloud infrastructure management, and monitoring.', customerProblem: 'Manual server deployments are error-prone.' },
      ...this.marketingServices(),
    ];
  }
}