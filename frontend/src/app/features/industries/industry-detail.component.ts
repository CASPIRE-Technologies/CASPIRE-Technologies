import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-industry-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="industry()" class="industry-detail-page">
      <section class="page-header">
        <div class="container">
          <nav class="breadcrumb">
            <a routerLink="/">Home</a> / <a routerLink="/industries">Industries</a> / <span>{{ industry()?.title }}</span>
          </nav>
          <h1 class="mt-2">{{ industry()?.title }}</h1>
          <p class="header-lead">{{ industry()?.shortDesc }}</p>
        </div>
      </section>

      <section class="section section-alt">
        <div class="container">
          <h2>Realistic Industry Use Cases</h2>
          <p class="mb-4">Practical software solutions designed for real operational challenges.</p>

          <div class="use-case-grid">
            <div *ngFor="let uc of parseUseCases(industry()?.useCases)" class="card use-case-card">
              <div class="card-icon">⚙️</div>
              <h3>{{ uc }}</h3>
              <p>Custom workflow integration tailored to Sri Lankan business regulations and operational field environments.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section text-center">
        <div class="container">
          <h2>Looking for a digital solution in {{ industry()?.title }}?</h2>
          <p class="section-lead">Discuss your operational challenges with our domain engineering leads.</p>
          <a routerLink="/contact" class="btn btn-primary mt-4">Consult with Our Industry Specialist →</a>
        </div>
      </section>
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
    .use-case-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .use-case-card {
      .card-icon { font-size: 2rem; margin-bottom: 0.75rem; }
    }
    .text-center { text-align: center; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
    .mb-4 { margin-bottom: 1.5rem; }
  `]
})
export class IndustryDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private seo = inject(SeoService);

  industry = signal<any | null>(null);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadIndustry(slug);
      }
    });
  }

  private loadIndustry(slug: string) {
    this.api.get<any>(`industries/${slug}`).subscribe({
      next: (data) => {
        this.industry.set(data);
        this.seo.updateMeta({ title: `${data.title} Solutions`, description: data.shortDesc });
      },
      error: () => this.industry.set(this.getFallbackIndustry(slug)),
    });
  }

  parseUseCases(data: any): string[] {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    try {
      const parsed = JSON.parse(data);
      return Array.isArray(parsed) ? parsed : [data];
    } catch {
      return [data];
    }
  }

  private getFallbackIndustry(slug: string) {
    return {
      title: slug.replace(/-/g, ' ').toUpperCase(),
      shortDesc: 'Domain-specific software engineering tailored for operational performance and local compliance.',
      useCases: JSON.stringify([
        'Material Requisition & Purchase Order Approval Workflows',
        'Real-time Field Operations & Mobile Reporting',
        'Customer Billing & Direct Payment Gateway Integration'
      ]),
    };
  }
}
