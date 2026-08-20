import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Domain Expertise</span>
        <h1>Industry Solutions & Practical Use Cases</h1>
        <p class="header-lead">
          Targeted software solutions built for the specific operational realities of Sri Lankan sectors and international tech ventures.
        </p>
      </div>
    </section>

    <!-- Industry Grid -->
    <section class="section">
      <div class="container">
        <div class="industries-grid">
          <div *ngFor="let ind of industries()" class="card industry-card">
            <h2>{{ ind.title }}</h2>
            <p>{{ ind.shortDesc }}</p>

            <div class="use-cases-box">
              <strong>Key Realistic Use Cases:</strong>
              <ul>
                <li *ngFor="let uc of parseUseCases(ind.useCases).slice(0, 3)">• {{ uc }}</li>
              </ul>
            </div>

            <div class="mt-4">
              <a [routerLink]="['/industries', ind.slug]" class="btn btn-primary btn-sm">Explore Industry Use Cases →</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
      color: #ffffff;
      padding: 4rem 0;
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.25rem; max-width: 700px; }
    }
    .industries-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }
    .use-cases-box {
      background-color: var(--color-bg-surface-elevated);
      padding: 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      margin-top: 1rem;
      ul { list-style: none; padding: 0; margin-top: 0.5rem; }
      li { margin-bottom: 0.375rem; color: var(--color-charcoal); }
    }
    .btn-sm { padding: 0.4rem 1rem; font-size: 0.8125rem; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
  `]
})
export class IndustriesComponent implements OnInit {
  private seo = inject(SeoService);
  private api = inject(ApiService);

  industries = signal<any[]>([]);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Industry Solutions | Construction, Tourism, Education, Retail, Logistics',
      description: 'Discover tailored software solutions and realistic use cases for Sri Lankan construction, hospitality, retail, logistics, and international startups.',
    });

    this.api.get<any[]>('industries').subscribe({
      next: (data) => this.industries.set(data),
      error: () => this.industries.set(this.getFallbackIndustries()),
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

  private getFallbackIndustries() {
    return [
      { slug: 'construction-engineering', title: 'Construction & Engineering', shortDesc: 'Project tracking, material inventory, subcontractor approvals, and site progress monitoring.', useCases: JSON.stringify(['Material Requisition Approval Workflows', 'Subcontractor Site Progress Logging', 'Client Payment Milestone Tracking']) },
      { slug: 'tourism-hospitality', title: 'Tourism & Hospitality', shortDesc: 'Direct booking engines, tour itinerary builders, guest management, and local payment gateways.', useCases: JSON.stringify(['Direct Hotel Booking Engine with PayHere/LankaPay', 'Tailor-made Tour Itinerary Builder', 'Guest Voucher Management']) },
      { slug: 'education-training', title: 'Education & Training', shortDesc: 'Student enrollment portals, course management, automated billing, and certificate generation.', useCases: JSON.stringify(['Online Student Registration & Fee Scheduling', 'Batch & Timetable Management', 'Automated Attendance & Digital Certificates']) },
      { slug: 'retail-distribution', title: 'Retail & Distribution', shortDesc: 'B2B ordering portals, stock control, sales representative field tracking, and multi-store billing.', useCases: JSON.stringify(['Sales Rep Mobile B2B Order Entry Portal', 'Multi-warehouse Inventory Low Stock Alerts', 'Credit Limit Settlement Tracking']) },
      { slug: 'startups-digital-agencies', title: 'Startups & Digital Agencies', shortDesc: 'Outsourced engineering, MVP development, backend microservices, and dedicated QA teams.', useCases: JSON.stringify(['Rapid MVP Architecture & Prototype Delivery', 'Scalable Backend API Infrastructure', 'Independent QA Regression & Release Validation']) },
    ];
  }
}
