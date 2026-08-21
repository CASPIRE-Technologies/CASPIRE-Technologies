import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <div class="badge badge-teal mb-2">
          <span class="pulse-dot"></span> Configurable Offerings
        </div>
        <h1>Reusable Solution Concepts</h1>
        <p class="header-lead">
          Pre-architected core software blueprints designed to accelerate custom development, reduce time-to-market, and lower implementation risks.
        </p>
      </div>
    </section>

    <!-- Solutions Grid -->
    <section class="section">
      <div class="container">
        <div class="solutions-grid">
          <div *ngFor="let sol of solutions; let i = index" class="card solution-card reveal" [style.transition-delay.ms]="(i % 3) * 90">
            <div class="card-badge">
              <span nz-icon nzType="thunderbolt" nzTheme="fill"></span>
              Configurable Blueprint
            </div>
            <div class="card-icon">
              <span nz-icon [nzType]="sol.icon" nzTheme="outline"></span>
            </div>
            <h2>{{ sol.title }}</h2>
            <p>{{ sol.description }}</p>

            <div class="feature-list">
              <strong>Core Features Included</strong>
              <ul>
                <li *ngFor="let f of sol.features">
                  <span nz-icon nzType="check-circle" nzTheme="fill" class="feature-check"></span>
                  {{ f }}
                </li>
              </ul>
            </div>

            <div class="card-actions mt-4">
              <a routerLink="/contact" [queryParams]="{ service: sol.title }" class="btn btn-secondary btn-sm">Request Solution Demo →</a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="section section-dark text-center">
      <div class="container reveal">
        <h2>Need a Configured Version of One of Our Solution Blueprints?</h2>
        <p class="cta-lead">We adapt and extend these pre-architected modules to match your exact business rules.</p>
        <a routerLink="/contact" class="btn btn-primary mt-4">Request a Solution Architecture Consultation →</a>
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

    /* Grid: minmax with a real fallback below so long feature text never
       forces a track wider than its share at any viewport width */
    .solutions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }
    .solution-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      min-width: 0;
      position: relative;
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .solution-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
      border-color: var(--color-teal-accent);
    }
    .card-badge {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-teal-dark);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.75rem;

      span[nz-icon] { font-size: 0.8125rem; }
    }
    .card-icon {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      background: var(--color-bg-surface-elevated, #f0fdfa);
      color: var(--color-teal-dark);
      font-size: 1.625rem;
      margin-bottom: 1rem;
      flex-shrink: 0;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, color 0.35s ease;
    }
    .solution-card:hover .card-icon {
      transform: scale(1.1) rotate(-4deg);
      background: var(--color-teal-dark);
      color: #ffffff;
    }
    .feature-list {
      background-color: var(--color-bg-surface-elevated);
      padding: 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      margin-top: auto;
      min-width: 0;

      strong { color: var(--color-navy-dark); }
      ul { list-style: none; padding: 0; margin-top: 0.625rem; }
      li {
        display: flex;
        align-items: flex-start;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        color: var(--color-charcoal);
        overflow-wrap: break-word;
      }
    }
    .feature-check {
      color: var(--color-teal-dark);
      font-size: 0.9375rem;
      margin-top: 0.15rem;
      flex-shrink: 0;
    }

    .cta-lead { font-size: 1.25rem; color: #cbd5e1; max-width: 650px; margin: 0.5rem auto 0 auto; }
    .text-center { text-align: center; }
    .mb-2 { margin-bottom: 0.5rem; }
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
      .solutions-grid { grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; }
    }

    @media (max-width: 767px) {
      .page-header { padding: 2.75rem 0; }
      .card.solution-card { padding: 1.25rem; }
      .card-icon { width: 48px; height: 48px; font-size: 1.375rem; }
    }

    @media (max-width: 480px) {
      .solutions-grid { grid-template-columns: 1fr; }
      .card.solution-card { padding: 1.25rem; }
      .btn-sm { width: 100%; justify-content: center; }
    }
  `]
})
export class SolutionsComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  solutions = [
    {
      title: 'Quotation & Invoicing Platform',
      icon: 'file-text',
      description: 'Streamline client price estimates, multi-currency invoice generation, tax rules, and local payment gateway collections.',
      features: ['Automated PDF Quotation Generator', 'LankaPay / PayHere IPG Integration', 'Recurring Invoice Scheduler', 'Payment Status Audit Trail'],
    },
    {
      title: 'Inventory & Order Management',
      icon: 'inbox',
      description: 'Centralized stock balances across multiple warehouses with low-stock alerts, purchase order generation, and dispatch tracking.',
      features: ['Multi-Warehouse Stock Control', 'Sales Representative Mobile Order Entry', 'Barcode & QR Code Scanning Support', 'Stock Valuation & Loss Audit'],
    },
    {
      title: 'Construction Project Tracking',
      icon: 'build',
      description: 'Digitize material requisitions, site progress logs, subcontractor invoices, and budget vs actual milestone tracking.',
      features: ['Site Material Requisition Workflow', 'Subcontractor Bill Verification', 'Milestone Payment Certificate Tracking', 'Daily Site Photo & Log Uploads'],
    },
    {
      title: 'Training-Centre Management',
      icon: 'read',
      description: 'Manage student registrations, course batch schedules, installment payment tracking, and automated QR certificate issuance.',
      features: ['Student Self-Registration Portal', 'Instalment Payment Tracking & Reminders', 'Lecturer Class Timetables', 'QR Code Digital Certificate Generator'],
    },
    {
      title: 'Booking & Tour Operations',
      icon: 'compass',
      description: 'Direct booking engines for boutique hotels, tour operators, and vehicle fleets with automated calendar sync and guest vouchers.',
      features: ['Real-Time Availability Calendar', 'Custom Itinerary Builder', 'Automated WhatsApp Confirmation', 'Multi-currency Currency Converter'],
    },
    {
      title: 'Field-Service Management',
      icon: 'car',
      description: 'Dispatch technicians, track job tickets, record customer sign-offs on site, and manage spare parts usage.',
      features: ['Mobile Technician Job Sheet', 'Customer Digital Signature Capture', 'Geo-tagged Waypoint Logging', 'Spare Part Inventory Consumption'],
    },
    {
      title: 'Approval & Document Workflows',
      icon: 'lock',
      description: 'Multi-level managerial authorization chains for internal requisitions, contracts, and financial disbursements.',
      features: ['Custom Multi-Tier Approval Rules', 'Version-Controlled Document Vault', 'Role-Based Audit Logging', 'Email & SMS Instant Alerts'],
    },
    {
      title: 'Management Reporting Dashboards',
      icon: 'line-chart',
      description: 'Real-time executive dashboards aggregating operational KPIs, financial summaries, and team performance metrics.',
      features: ['Interactive Chart & Data Visualizations', 'Automated Scheduled PDF Digest Emails', 'Role-Restricted Dashboard Views', 'Export to Excel / CSV / JSON'],
    },
  ];

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Configurable Solution Offerings & Software Blueprints',
      description: 'Explore pre-architected solution blueprints for quotation invoicing, inventory management, construction tracking, training centers, and BI dashboards.',
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
    this.el.nativeElement.querySelectorAll('.reveal').forEach((elToObserve: Element) => {
      this.observer?.observe(elToObserve);
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}