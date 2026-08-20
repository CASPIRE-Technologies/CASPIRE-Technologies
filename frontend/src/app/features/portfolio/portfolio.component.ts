import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Case Studies</span>
        <h1>Engineering Portfolio & Case Studies</h1>
        <p class="header-lead">
          Demonstration case studies illustrating application architecture, technical challenges, and qualitative outcomes achieved across various sectors.
        </p>
      </div>
    </section>

    <!-- Filters & List -->
    <section class="section">
      <div class="container">
        <!-- Filter Pills -->
        <div class="filter-bar">
          <button (click)="setFilter('ALL')" [class.active]="activeFilter() === 'ALL'" class="filter-pill">All Projects</button>
          <button (click)="setFilter('Logistics & Distribution')" [class.active]="activeFilter() === 'Logistics & Distribution'" class="filter-pill">Logistics</button>
          <button (click)="setFilter('Tourism & Hospitality')" [class.active]="activeFilter() === 'Tourism & Hospitality'" class="filter-pill">Hospitality</button>
          <button (click)="setFilter('Construction & Engineering')" [class.active]="activeFilter() === 'Construction & Engineering'" class="filter-pill">Construction</button>
        </div>

        <!-- Projects Grid -->
        <div class="portfolio-grid mt-4">
          <div *ngFor="let proj of filteredProjects()" class="card portfolio-card">
            <div class="demo-tag">Demonstration Case Study</div>
            <span class="badge badge-navy mb-2">{{ proj.clientIndustry }}</span>
            <h2>{{ proj.title }}</h2>
            <p>{{ proj.summary }}</p>

            <div class="details-box">
              <strong>Technical Challenge:</strong>
              <p>{{ proj.challenges }}</p>
              
              <strong class="mt-2">Engineering Solution:</strong>
              <p>{{ proj.solution }}</p>
            </div>

            <div class="tech-stack-pills mt-3">
              <span *ngFor="let t of parseList(proj.technologies)" class="tech-tag">{{ t }}</span>
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
    .filter-bar {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 2rem;
    }
    .filter-pill {
      padding: 0.5rem 1.25rem;
      font-family: var(--font-family-heading);
      font-size: 0.875rem;
      font-weight: 600;
      border-radius: var(--radius-full);
      background-color: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      color: var(--color-charcoal);
      cursor: pointer;
      transition: all var(--transition-fast);

      &:hover, &.active {
        background-color: var(--color-teal-dark);
        color: #ffffff;
        border-color: var(--color-teal-dark);
      }
    }
    .portfolio-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }
    .portfolio-card {
      position: relative;
      border-top: 4px solid var(--color-teal-dark);
    }
    .demo-tag {
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-teal-dark);
      letter-spacing: 0.05em;
      margin-bottom: 0.25rem;
    }
    .details-box {
      background-color: var(--color-bg-surface-elevated);
      padding: 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      margin-top: 1rem;
      strong { color: var(--color-navy-dark); display: block; }
      p { margin: 0.25rem 0 0.5rem 0; color: var(--color-charcoal); }
    }
    .tech-stack-pills {
      display: flex;
      gap: 0.375rem;
      flex-wrap: wrap;
    }
    .tech-tag {
      font-size: 0.75rem;
      font-weight: 600;
      background-color: #e2e8f0;
      color: var(--color-navy-dark);
      padding: 0.2rem 0.6rem;
      border-radius: var(--radius-sm);
    }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-4 { margin-top: 1rem; }
  `]
})
export class PortfolioComponent implements OnInit {
  private seo = inject(SeoService);
  private api = inject(ApiService);

  projects = signal<any[]>([]);
  activeFilter = signal<string>('ALL');

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Case Studies & Demonstration Projects',
      description: 'Review demonstration software engineering case studies in logistics, hospitality, and construction.',
    });

    this.api.get<any[]>('portfolio').subscribe({
      next: (data) => this.projects.set(data),
      error: () => this.projects.set(this.getFallbackProjects()),
    });
  }

  setFilter(filter: string) {
    this.activeFilter.set(filter);
  }

  filteredProjects() {
    const f = this.activeFilter();
    if (f === 'ALL') return this.projects();
    return this.projects().filter((p) => p.clientIndustry === f);
  }

  parseList(data: any): string[] {
    if (!data) return [];
    if (Array.isArray(data)) return data;
    try {
      return JSON.parse(data);
    } catch {
      return [data];
    }
  }

  private getFallbackProjects() {
    return [
      {
        slug: 'lankalogistics-erp',
        title: 'LankaLogistics ERP & Dispatch Manager',
        clientIndustry: 'Logistics & Distribution',
        summary: 'Demonstration Case Study: A centralized web portal digitizing dispatch schedules, waypoint tracking, and driver payout management.',
        challenges: 'Manual phone coordination for 120+ daily freight runs resulted in billing delays.',
        solution: 'Architected custom Angular SSR platform with NestJS backend, role-based dispatcher views, and SMS notifications.',
        technologies: JSON.stringify(['Angular', 'NestJS', 'MySQL', 'Docker']),
      },
      {
        slug: 'ceylonstay-booking-engine',
        title: 'CeylonStay Boutique Hotel Booking Engine',
        clientIndustry: 'Tourism & Hospitality',
        summary: 'Demonstration Case Study: Direct guest booking and payment platform with multi-currency support and real-time room calendar.',
        challenges: 'High commission fees paid to international OTAs combined with slow instant booking confirmations.',
        solution: 'Built high-converting web booking engine integrated with local payment gateways (PayHere, LankaPay) and WhatsApp alerts.',
        technologies: JSON.stringify(['Angular SSR', 'TypeScript', 'NestJS', 'PayHere']),
      },
      {
        slug: 'buildtrack-construction-manager',
        title: 'BuildTrack Construction Project Tracker',
        clientIndustry: 'Construction & Engineering',
        summary: 'Demonstration Case Study: Quotation workflow and material requisition portal for mid-sized engineering contractors.',
        challenges: 'Uncontrolled cost variations and slow site material approval chains led to project margin erosion.',
        solution: 'Implemented structured multi-level approval portal for material requisitions with automated budget checks.',
        technologies: JSON.stringify(['Angular', 'NestJS', 'Prisma', 'MySQL']),
      },
    ];
  }
}
