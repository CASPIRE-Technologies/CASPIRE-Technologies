import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-delivery',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Software Quality Lifecycle</span>
        <h1>Our 9-Step Delivery Process</h1>
        <p class="header-lead">
          A disciplined, transparent engineering methodology ensuring predictable timelines, uncompromised quality, and zero production surprises.
        </p>
      </div>
    </section>

    <!-- Detailed 9 Steps -->
    <section class="section">
      <div class="container">
        <div class="steps-wrapper">
          <div *ngFor="let s of steps" class="step-card">
            <div class="step-header">
              <div class="step-badge">Phase {{ s.num }}</div>
              <h2>{{ s.title }}</h2>
            </div>
            <p>{{ s.description }}</p>
            
            <div class="step-details">
              <div class="detail-box">
                <strong>Key Deliverables:</strong>
                <p>{{ s.deliverable }}</p>
              </div>
              <div class="detail-box">
                <strong>Client Involvement:</strong>
                <p>{{ s.involvement }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Quality Commitment -->
    <section class="section section-dark text-center">
      <div class="container">
        <h2>Experience Transparent Software Delivery</h2>
        <p class="cta-lead">Partner with an engineering team that prioritizes clear communication and independent quality validation.</p>
        <a routerLink="/contact" class="btn btn-primary mt-4">Start Phase 1: Schedule Initial Consultation →</a>
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
    .steps-wrapper {
      display: flex;
      flex-direction: column;
      gap: 2rem;
      max-width: 900px;
      margin: 0 auto;
    }
    .step-card {
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
      border-left: 4px solid var(--color-teal-dark);
    }
    .step-header {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 0.75rem;
      h2 { font-size: 1.5rem; }
    }
    .step-badge {
      background-color: var(--color-teal-light);
      color: var(--color-teal-dark);
      font-size: 0.8125rem;
      font-weight: 800;
      padding: 0.35rem 0.875rem;
      border-radius: var(--radius-full);
      text-transform: uppercase;
    }
    .step-details {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1.5rem;
      margin-top: 1.25rem;
      padding-top: 1.25rem;
      border-top: 1px solid var(--color-border);
    }
    .detail-box {
      font-size: 0.875rem;
      strong { color: var(--color-navy-dark); display: block; margin-bottom: 0.25rem; }
      p { margin: 0; color: var(--color-charcoal-muted); }
    }
    .cta-lead { font-size: 1.25rem; color: #cbd5e1; max-width: 650px; margin: 0.5rem auto 0 auto; }
    .text-center { text-align: center; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-4 { margin-top: 1rem; }

    @media (max-width: 600px) {
      .step-details { grid-template-columns: 1fr; }
    }
  `]
})
export class DeliveryProcessComponent implements OnInit {
  private seo = inject(SeoService);

  steps = [
    {
      num: '01',
      title: 'Initial Consultation',
      description: 'We meet with your leadership and technical stakeholders to discuss your business goals, target timelines, and core project vision.',
      deliverable: 'Consultation summary and high-level technical scope options.',
      involvement: 'Initial 45-minute discovery conversation.',
    },
    {
      num: '02',
      title: 'Discovery',
      description: 'Deep dive into existing workflows, software systems, data schemas, compliance rules, and operational pain points.',
      deliverable: 'Business requirements specification and system workflow map.',
      involvement: 'Stakeholder interviews and workflow walkthroughs.',
    },
    {
      num: '03',
      title: 'Requirements Specification',
      description: 'Documenting explicit functional requirements, user personas, API endpoints, and technical constraints.',
      deliverable: 'Functional Requirement Document (FRD) and wireframes.',
      involvement: 'Review and sign-off on specified requirements.',
    },
    {
      num: '04',
      title: 'Proposal & Commercial Estimate',
      description: 'Presenting a fixed-price or time-and-materials proposal outlining sprint breakdown, team allocation, and clear milestones.',
      deliverable: 'Formal commercial proposal, contract, and project roadmap.',
      involvement: 'Commercial agreement and contract execution.',
    },
    {
      num: '05',
      title: 'Design & Agile Development',
      description: 'Building software in two-week iterative sprints. Code is checked into client repositories with continuous integration.',
      deliverable: 'Working software builds at the end of each sprint demo.',
      involvement: 'Sprint demo reviews every two weeks.',
    },
    {
      num: '06',
      title: 'Independent Quality Engineering',
      description: 'Dedicated QA engineers run automated test suites, API security scans, cross-browser tests, and performance load profiling.',
      deliverable: 'Master Test Execution Report and Release Readiness Certificate.',
      involvement: 'Review of bug trace reports and QA status metrics.',
    },
    {
      num: '07',
      title: 'Client User Acceptance Testing (UAT)',
      description: 'Your team tests the fully integrated application in a dedicated staging environment replicating production data.',
      deliverable: 'Completed UAT sign-off matrix.',
      involvement: 'Key staff operational validation in staging.',
    },
    {
      num: '08',
      title: 'Production Deployment',
      description: 'Executing containerized deployment scripts, configuring domain SSL certificates, and setting up real-time monitoring.',
      deliverable: 'Live production URL, automated backups, and handover documents.',
      involvement: 'Go-live approval and launch verification.',
    },
    {
      num: '09',
      title: 'Maintenance & Improvement',
      description: 'Providing ongoing SLA support, security patches, database performance tuning, and planned feature enhancements.',
      deliverable: 'Monthly maintenance reports and 99.9% uptime SLA compliance.',
      involvement: 'Quarterly review of software performance and backlog items.',
    },
  ];

  ngOnInit() {
    this.seo.updateMeta({
      title: '9-Step Delivery Lifecycle | Software Engineering Process',
      description: 'Learn how Apex Software Engineering executes projects through discovery, requirements, agile development, independent QA, UAT, and production SLA support.',
    });
  }
}
