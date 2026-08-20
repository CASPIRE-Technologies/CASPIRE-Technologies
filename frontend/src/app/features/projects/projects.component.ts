import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject, signal, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

interface ProjectCategory {
  slug: string;
  label: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <div class="badge badge-teal mb-2">
          <span class="pulse-dot"></span> Case Studies & Industry Solutions
        </div>
        <h1>Projects & Industry Expertise</h1>
        <p class="header-lead">
          Demonstration case studies and domain solutions illustrating application architecture, technical challenges, and outcomes achieved across the industries we serve.
        </p>
      </div>
    </section>

    <!-- Category Toggle & Projects -->
    <section class="section">
      <div class="container">
        <!-- Toggle Bar: driven entirely by categories() — add a category, get a pill for free -->
        <div class="filter-bar" role="tablist" aria-label="Filter projects by industry">
          <button
            (click)="setFilter('ALL')"
            [class.active]="activeFilter() === 'ALL'"
            class="filter-pill"
            role="tab"
            [attr.aria-selected]="activeFilter() === 'ALL'"
          >
            <span nz-icon nzType="appstore" nzTheme="outline"></span>
            All Projects
          </button>
          <button
            *ngFor="let cat of categories()"
            (click)="setFilter(cat.label)"
            [class.active]="activeFilter() === cat.label"
            class="filter-pill"
            role="tab"
            [attr.aria-selected]="activeFilter() === cat.label"
          >
            <span nz-icon [nzType]="cat.icon" nzTheme="outline"></span>
            {{ cat.label }}
          </button>
        </div>

        <!-- Active Industry Context Panel -->
        <div *ngIf="activeCategory() as cat" class="industry-context reveal">
          <div class="context-icon">
            <span nz-icon [nzType]="cat.icon" nzTheme="outline"></span>
          </div>
          <div>
            <strong>{{ cat.label }}</strong>
            <p>{{ cat.description }}</p>
          </div>
        </div>

        <!-- Projects Grid -->
        <div class="portfolio-grid mt-4">
          <div *ngFor="let proj of filteredProjects(); let i = index" class="card portfolio-card reveal" [style.transition-delay.ms]="i * 70">
            <div class="demo-tag">
              <span nz-icon nzType="experiment" nzTheme="outline"></span>
              Demonstration Case Study
            </div>
            <span class="badge badge-navy mb-2">{{ proj.clientIndustry }}</span>
            <h2>{{ proj.title }}</h2>
            <p>{{ proj.summary }}</p>

            <div class="details-box">
              <strong><span nz-icon nzType="warning" nzTheme="outline"></span> Technical Challenge</strong>
              <p>{{ proj.challenges }}</p>

              <strong class="mt-2"><span nz-icon nzType="bulb" nzTheme="outline"></span> Engineering Solution</strong>
              <p>{{ proj.solution }}</p>
            </div>

            <div class="tech-stack-pills mt-3">
              <span *ngFor="let t of parseList(proj.technologies)" class="tech-tag">{{ t }}</span>
            </div>
          </div>

          <div *ngIf="filteredProjects().length === 0" class="empty-state reveal">
            <span nz-icon nzType="inbox" nzTheme="outline"></span>
            <p>No case studies published for this industry yet. Check back soon, or explore another category.</p>
          </div>
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

    /* Filter Bar */
    .filter-bar {
      display: flex;
      gap: 0.75rem;
      flex-wrap: wrap;
      margin-bottom: 1.5rem;
    }
    .filter-pill {
      display: inline-flex;
      align-items: center;
      gap: 0.5rem;
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
      white-space: nowrap;

      span[nz-icon] { font-size: 1rem; }

      &:hover, &.active {
        background-color: var(--color-teal-dark);
        color: #ffffff;
        border-color: var(--color-teal-dark);
      }
    }

    /* Industry Context Panel */
    .industry-context {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
      background-color: var(--color-bg-surface-elevated);
      border: 1px solid var(--color-border);
      border-left: 4px solid var(--color-teal-dark);
      border-radius: var(--radius-md);
      padding: 1.25rem 1.5rem;
      margin-bottom: 1rem;

      strong { display: block; margin-bottom: 0.25rem; color: var(--color-navy-dark); }
      p { margin: 0; color: var(--color-charcoal-muted); font-size: 0.9375rem; overflow-wrap: break-word; }
    }
    .context-icon {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      background: var(--color-teal-light);
      color: var(--color-teal-dark);
      font-size: 1.25rem;
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
      border-top: 4px solid var(--color-teal-dark);
      min-width: 0;
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .portfolio-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
    }
    .demo-tag {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.7rem;
      font-weight: 700;
      text-transform: uppercase;
      color: var(--color-teal-dark);
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }
    .details-box {
      background-color: var(--color-bg-surface-elevated);
      padding: 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      margin-top: 1rem;
      min-width: 0;

      strong {
        color: var(--color-navy-dark);
        display: flex;
        align-items: center;
        gap: 0.375rem;
      }
      p { margin: 0.25rem 0 0.5rem 0; color: var(--color-charcoal); overflow-wrap: break-word; }
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
      max-width: 100%;
      overflow-wrap: break-word;
    }

    .empty-state {
      grid-column: 1 / -1;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 3rem 1.5rem;
      text-align: center;
      color: var(--color-charcoal-muted);
      background: var(--color-bg-surface-elevated);
      border-radius: var(--radius-lg);
      border: 1px dashed var(--color-border);

      span[nz-icon] { font-size: 2rem; color: var(--color-teal-dark); }
      p { margin: 0; max-width: 360px; }
    }

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
      .filter-bar { gap: 0.5rem; }
      .filter-pill { padding: 0.45rem 1rem; font-size: 0.8125rem; }
      .industry-context { padding: 1rem 1.25rem; flex-direction: column; }
      .card.portfolio-card { padding: 1.25rem; }
    }

    @media (max-width: 480px) {
      .portfolio-grid { grid-template-columns: 1fr; }
      .filter-bar {
        flex-wrap: nowrap;
        overflow-x: auto;
        padding-bottom: 0.5rem;
        -webkit-overflow-scrolling: touch;
        scrollbar-width: thin;
      }
      .filter-pill { flex-shrink: 0; }
      .context-icon { width: 36px; height: 36px; font-size: 1rem; }
    }
  `]
})
export class ProjectsComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private api = inject(ApiService);
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  projects = signal<any[]>([]);
  activeFilter = signal<string>('ALL');

  /**
   * Single source of truth for filter pills. To add a new industry/category,
   * add one object here (or have the API return it) — the toggle bar,
   * context panel, and filtering all pick it up automatically.
   */
  categories = signal<ProjectCategory[]>([]);

  activeCategory = computed<ProjectCategory | null>(() => {
    const filter = this.activeFilter();
    if (filter === 'ALL') return null;
    return this.categories().find((c) => c.label === filter) ?? null;
  });

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Projects & Industry Solutions | Case Studies',
      description: 'Explore demonstration software engineering case studies and industry solutions across logistics, hospitality, construction, education, retail, and startups.',
    });

    this.api.get<any[]>('industries').subscribe({
      next: (data) => this.categories.set(this.mapIndustriesToCategories(data)),
      error: () => this.categories.set(this.getFallbackCategories()),
    });

    this.api.get<any[]>('portfolio').subscribe({
      next: (data) => {
        this.projects.set(data);
        setTimeout(() => this.observeReveal());
      },
      error: () => {
        this.projects.set(this.getFallbackProjects());
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

  setFilter(filter: string) {
    this.activeFilter.set(filter);
    setTimeout(() => this.observeReveal());
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

  /** Maps an industry icon from its slug, so new industries from the API still render a sensible pill icon. */
  private categoryIcon(slug: string): string {
    const map: Record<string, string> = {
      'construction-engineering': 'build',
      'tourism-hospitality': 'compass',
      'education-training': 'read',
      'retail-distribution': 'shop',
      'startups-digital-agencies': 'rocket',
    };
    return map[slug] || 'apartment';
  }

  private mapIndustriesToCategories(industries: any[]): ProjectCategory[] {
    return industries.map((ind) => ({
      slug: ind.slug,
      label: ind.title,
      icon: this.categoryIcon(ind.slug),
      description: ind.shortDesc,
    }));
  }

  private getFallbackCategories(): ProjectCategory[] {
    return [
      { slug: 'construction-engineering', label: 'Construction & Engineering', icon: 'build', description: 'Project tracking, material inventory, subcontractor approvals, and site progress monitoring.' },
      { slug: 'tourism-hospitality', label: 'Tourism & Hospitality', icon: 'compass', description: 'Direct booking engines, tour itinerary builders, guest management, and local payment gateways.' },
      { slug: 'education-training', label: 'Education & Training', icon: 'read', description: 'Student enrollment portals, course management, automated billing, and certificate generation.' },
      { slug: 'retail-distribution', label: 'Retail & Distribution', icon: 'shop', description: 'B2B ordering portals, stock control, sales representative field tracking, and multi-store billing.' },
      { slug: 'startups-digital-agencies', label: 'Startups & Digital Agencies', icon: 'rocket', description: 'Outsourced engineering, MVP development, backend microservices, and dedicated QA teams.' },
      // Add a new industry here later — e.g.:
      // { slug: 'healthcare', label: 'Healthcare & Clinics', icon: 'medicine-box', description: 'Appointment scheduling, patient records, and billing systems.' },
    ];
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