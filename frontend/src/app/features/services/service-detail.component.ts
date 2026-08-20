import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-service-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="service()" class="service-detail-page">
      <!-- Breadcrumb & Header -->
      <section class="page-header">
        <div class="container">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a routerLink="/">Home</a> / <a routerLink="/services">Services</a> / <span>{{ service()?.title }}</span>
          </nav>
          <h1 class="mt-2">{{ service()?.title }}</h1>
          <p class="header-lead">{{ service()?.shortDesc }}</p>
        </div>
      </section>

      <!-- Problem vs Solution Breakdown -->
      <section class="section section-alt">
        <div class="container">
          <div class="grid-2">
            <div class="card card-problem">
              <div class="card-tag">The Business Problem</div>
              <h3>Customer Challenge</h3>
              <p>{{ service()?.customerProblem }}</p>
            </div>
            <div class="card card-solution">
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
            <div>
              <h2>Main Technical Capabilities</h2>
              <ul class="detail-list">
                <li *ngFor="let cap of parseList(service()?.mainCapabilities)">
                  <span class="check-icon">✓</span> {{ cap }}
                </li>
              </ul>
            </div>
            <div>
              <h2>Typical Deliverables</h2>
              <ul class="detail-list">
                <li *ngFor="let del of parseList(service()?.typicalDeliverables)">
                  <span class="check-icon">📦</span> {{ del }}
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
            <div class="card">
              <h3>Delivery Methodology</h3>
              <p>{{ service()?.deliveryApproach }}</p>
            </div>
            <div class="card">
              <h3>Suitable Industries</h3>
              <div class="pills-flex">
                <span *ngFor="let ind of parseList(service()?.suitableIndustries)" class="badge badge-navy">
                  {{ ind }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- CTA -->
      <section class="section section-dark text-center">
        <div class="container">
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
      a { color: var(--color-teal-accent); }
      span { color: #ffffff; }
    }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    
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
    .check-icon { font-weight: 800; color: var(--color-teal-dark); }
    .pills-flex { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 1rem; }

    .cta-lead { font-size: 1.25rem; max-width: 650px; margin: 0.5rem auto 0 auto; color: #cbd5e1; }
    .text-center { text-align: center; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-4 { margin-top: 1rem; }

    @media (max-width: 768px) {
      .grid-2 { grid-template-columns: 1fr; }
    }
  `]
})
export class ServiceDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private seo = inject(SeoService);

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
      },
      error: () => {
        this.loading.set(false);
        this.service.set(this.getFallbackService(slug));
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
