import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  template: `
    <div *ngIf="service()" class="service-detail-page">
      <!-- Breadcrumb & Header -->
      <section class="page-header">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a routerLink="/">Home</a>
            <span nz-icon nzType="right" nzTheme="outline" class="crumb-sep"></span>
            <a routerLink="/services">Services</a>
            <span nz-icon nzType="right" nzTheme="outline" class="crumb-sep"></span>
            <span>{{ service()?.title }}</span>
          </nav>
          <div class="badge badge-teal mb-2 mt-3">
            <span class="pulse-dot"></span> Service Details
          </div>
          <h1>{{ service()?.title }}</h1>
          <p class="header-lead">{{ service()?.shortDesc }}</p>
        </div>
      </section>

      <!-- Problem vs Solution Breakdown -->
      <section class="section section-alt">
        <div class="container">
          <div class="grid-2">
            <div class="card card-problem reveal">
              <div class="card-icon-wrap icon-danger">
                <span nz-icon nzType="warning" nzTheme="outline"></span>
              </div>
              <div class="card-tag">The Business Problem</div>
              <h3>Customer Challenge</h3>
              <p>{{ service()?.customerProblem }}</p>
            </div>
            <div class="card card-solution reveal">
              <div class="card-icon-wrap icon-success">
                <span nz-icon nzType="bulb" nzTheme="outline"></span>
              </div>
              <div class="card-tag">Our Engineering Solution</div>
              <h3>Proposed Approach</h3>
              <p>{{ service()?.proposedSolution }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Capabilities & Deliverables -->
      <section class="section">
        <div class="container">
          <div class="grid-2">
            <div class="reveal">
              <span class="badge badge-navy mb-2">What We Build</span>
              <h2>Main Technical Capabilities</h2>
              <ul class="detail-list">
                <li *ngFor="let cap of parseList(service()?.mainCapabilities)">
                  <span nz-icon nzType="check-circle" nzTheme="fill" class="check-icon"></span>
                  {{ cap }}
                </li>
              </ul>
            </div>
            <div class="reveal">
              <span class="badge badge-teal mb-2">What You Receive</span>
              <h2>Typical Deliverables</h2>
              <ul class="detail-list">
                <li *ngFor="let del of parseList(service()?.typicalDeliverables)">
                  <span nz-icon nzType="inbox" nzTheme="outline" class="check-icon deliverable-icon"></span>
                  {{ del }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- Delivery Approach & Industries -->
      <section class="section section-alt">
        <div class="container">
          <div class="grid-2">
            <div class="card reveal">
              <div class="card-icon-wrap icon-navy">
                <span nz-icon nzType="deployment-unit" nzTheme="outline"></span>
              </div>
              <h3>Delivery Methodology</h3>
              <p>{{ service()?.deliveryApproach }}</p>
            </div>
            <div class="card reveal">
              <div class="card-icon-wrap icon-teal">
                <span nz-icon nzType="apartment" nzTheme="outline"></span>
              </div>
              <h3>Suitable Industries</h3>
              <div class="pills-flex">
                <span *ngFor="let ind of parseList(service()?.suitableIndustries)" class="badge badge-navy pill-hover">
                  {{ ind }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section section-dark text-center">
        <div class="container reveal">
          <h2>Ready to get started with {{ service()?.title }}?</h2>
          <p class="cta-lead">Speak with our technical team to discuss project requirements, timelines, and cost estimates.</p>
          <a routerLink="/contact" [queryParams]="{ service: service()?.title }" class="btn btn-primary mt-4">
            Request a Consultation for {{ service()?.title }} →
          </a>
        </div>
      </section>
    </div>

    <div *ngIf="loading()" class="container section text-center">
      <p>Loading service details...</p>
    </div>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
      color: #ffffff;
      padding: 3.5rem 0;
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.25rem; max-width: 750px; }
    }
    .breadcrumb {
      font-size: 0.875rem;
      color: #94a3b8;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.4rem;
      a { color: var(--color-teal-accent); }
      span:not(.crumb-sep) { color: #ffffff; }
    }
    .crumb-sep { font-size: 0.625rem; color: #64748b; }

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

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }

    .card {
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
    }

    .card-icon-wrap {
      width: 48px;
      height: 48px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      font-size: 1.375rem;
      margin-bottom: 1rem;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .card:hover .card-icon-wrap { transform: scale(1.1) rotate(-4deg); }
    .icon-danger { background: rgba(239, 68, 68, 0.1); color: var(--color-danger); }
    .icon-success { background: rgba(16, 185, 129, 0.1); color: var(--color-success); }
    .icon-navy { background: var(--color-bg-surface-elevated, #f8fafc); color: var(--color-navy-dark); }
    .icon-teal { background: var(--color-bg-surface-elevated, #f0fdfa); color: var(--color-teal-dark); }

    .card-problem {
      border-top: 4px solid var(--color-danger);
      .card-tag { font-size: 0.75rem; font-weight: 700; color: var(--color-danger); text-transform: uppercase; margin-bottom: 0.5rem; }
    }
    .card-solution {
      border-top: 4px solid var(--color-success);
      .card-tag { font-size: 0.75rem; font-weight: 700; color: var(--color-success); text-transform: uppercase; margin-bottom: 0.5rem; }
    }

    .detail-list {
      list-style: none;
      margin-top: 1.25rem;
      li {
        margin-bottom: 0.875rem;
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.75rem;
      }
    }
    .check-icon { font-size: 1.125rem; color: var(--color-teal-dark); flex-shrink: 0; }
    .deliverable-icon { color: var(--color-navy-dark); }

    .pills-flex { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }
    .pill-hover { transition: transform 0.25s ease; cursor: default; }
    .pill-hover:hover { transform: translateY(-2px); }

    .cta-lead { font-size: 1.25rem; max-width: 650px; margin: 0.5rem auto 0 auto; color: #cbd5e1; }
    .text-center { text-align: center; }
    .mb-2 { margin-bottom: 0.5rem; }
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
    @media (max-width: 768px) {
      .grid-2 { grid-template-columns: 1fr; gap: 1.5rem; }
    }

    @media (max-width: 767px) {
      .page-header { padding: 2.5rem 0; }
      .card { padding: 1.25rem; }
    }

    @media (max-width: 480px) {
      .card-icon-wrap { width: 40px; height: 40px; font-size: 1.125rem; }
      .pills-flex { gap: 0.375rem; }
    }
  `]
})
export class ServiceDetailComponent implements OnInit, AfterViewInit, OnDestroy {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private seo = inject(SeoService);
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  service = signal<any | null>(null);
  loading = signal(true);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadService(slug);
      }
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
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private observeReveal() {
    const elements = this.el.nativeElement.querySelectorAll('.reveal:not(.revealed)');
    elements.forEach((elToObserve: Element) => this.observer?.observe(elToObserve));
  }

  private loadService(slug: string) {
    this.loading.set(true);
    this.api.get<any>(`services/${slug}`).subscribe({
      next: (data) => {
        this.service.set(data);
        this.loading.set(false);
        this.seo.updateMeta({
          title: data.title,
          description: data.shortDesc,
        });
        setTimeout(() => this.observeReveal());
      },
      error: () => {
        this.loading.set(false);
        this.service.set(this.getFallbackService(slug));
        setTimeout(() => this.observeReveal());
      },
    });
  }

  parseList(data: any): string[] {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [data];
    } catch {
      return data.split(',').map((s: string) => s.trim());
    }
  }

  private getFallbackService(slug: string) {
    const services: Record<string, any> = {
      seo: {
        title: 'SEO',
        shortDesc: 'Technical, on-page, and local SEO improvements that help customers find your business through organic search.',
        customerProblem: 'A polished website still loses qualified leads when search engines cannot understand the site structure, content, local relevance, or technical quality.',
        proposedSolution: 'A practical SEO program covering technical fixes, keyword-led content improvements, local business visibility, metadata, internal linking, and performance hygiene.',
        mainCapabilities: JSON.stringify(['Technical SEO Audits', 'Keyword & Search Intent Mapping', 'On-page Metadata Improvements', 'Local SEO & Google Business Profile Guidance']),
        typicalDeliverables: JSON.stringify(['SEO Audit Report', 'Keyword Plan', 'Optimized Page Titles & Meta Descriptions', 'Monthly Organic Visibility Recommendations']),
        suitableIndustries: JSON.stringify(['SMEs & Corporates', 'Tourism & Hospitality', 'Retail & Distribution', 'Professional Services']),
        deliveryApproach: 'We prioritize search improvements that compound over time, starting with technical health and high-intent pages before expanding content coverage.',
      },
      'social-media-marketing': {
        title: 'Social Media Marketing',
        shortDesc: 'Organic social media planning, content calendars, creative posts, and profile management without paid boosting.',
        customerProblem: 'Many businesses post inconsistently, use unclear messaging, or rely on disconnected visuals that do not build trust with their target audience.',
        proposedSolution: 'Organic social media marketing focused on content planning, brand-aligned messaging, post design, caption writing, scheduling, and profile consistency without paid boosting.',
        mainCapabilities: JSON.stringify(['Organic Content Strategy', 'Monthly Content Calendars', 'Post Copy & Creative Direction', 'Profile Optimization']),
        typicalDeliverables: JSON.stringify(['Social Media Content Plan', 'Designed Post Concepts', 'Captions & Hashtag Sets', 'Monthly Performance Review']),
        suitableIndustries: JSON.stringify(['SMEs & Corporates', 'Tourism & Hospitality', 'Education & Training', 'Retail & Distribution']),
        deliveryApproach: 'We build consistent organic visibility with planned content themes, clear messaging, and review cycles that keep posts aligned with business goals.',
      },
    };

    if (services[slug]) return services[slug];

    return {
      title: slug.replace(/-/g, ' ').toUpperCase(),
      shortDesc: 'End-to-end software engineering service designed for performance, security, and long-term scalability.',
      customerProblem: 'Manual processes and legacy tools create operational bottlenecks, data inconsistencies, and slow response times.',
      proposedSolution: 'Custom-engineered digital platforms matching your operational workflows and security requirements.',
      mainCapabilities: JSON.stringify(['Enterprise Architecture', 'API Integration', 'Role-Based Access Control', 'Automated QA Validation']),
      typicalDeliverables: JSON.stringify(['Production Source Code', 'Architecture Documentation', 'Automated Test Suites', 'Staff Training']),
      suitableIndustries: JSON.stringify(['SMEs & Corporates', 'Retail', 'Logistics', 'Construction']),
      deliveryApproach: 'Agile two-week sprint cycles with continuous integration, independent quality engineering validation, and client review.',
    };
  }
}