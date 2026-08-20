import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-solutions',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Configurable Offerings</span>
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
          <div *ngFor="let sol of solutions" class="card solution-card">
            <div class="card-badge">Configurable Blueprint</div>
            <div class="card-icon">{{ sol.icon }}</div>
            <h2>{{ sol.title }}</h2>
            <p>{{ sol.description }}</p>
            
            <div class="feature-list">
              <strong>Core Features Included:</strong>
              <ul>
                <li *ngFor="let f of sol.features">• {{ f }}</li>
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
      <div class="container">
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
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.25rem; max-width: 700px; }
    }
    .solutions-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }
    .solution-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      position: relative;
    }
    .card-badge {
      font-size: 0.75rem;
      font-weight: 700;
      color: var(--color-teal-dark);
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 0.5rem;
    }
    .card-icon { font-size: 2.25rem; margin-bottom: 0.75rem; }
    .feature-list {
      background-color: var(--color-bg-surface-elevated);
      padding: 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      margin-top: auto;
      ul { list-style: none; padding: 0; margin-top: 0.5rem; }
      li { margin-bottom: 0.25rem; color: var(--color-charcoal); }
    }
    .cta-lead { font-size: 1.25rem; color: #cbd5e1; max-width: 650px; margin: 0.5rem auto 0 auto; }
    .text-center { text-align: center; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
  `]
})
export class SolutionsComponent implements OnInit {
  private seo = inject(SeoService);

  solutions = [
    {
      title: 'Quotation & Invoicing Platform',
      icon: '📄',
      description: 'Streamline client price estimates, multi-currency invoice generation, tax rules, and local payment gateway collections.',
      features: ['Automated PDF Quotation Generator', 'LankaPay / PayHere IPG Integration', 'Recurring Invoice Scheduler', 'Payment Status Audit Trail'],
    },
    {
      title: 'Inventory & Order Management',
      icon: '📦',
      description: 'Centralized stock balances across multiple warehouses with low-stock alerts, purchase order generation, and dispatch tracking.',
      features: ['Multi-Warehouse Stock Control', 'Sales Representative Mobile Order Entry', 'Barcode & QR Code Scanning Support', 'Stock Valuation & Loss Audit'],
    },
    {
      title: 'Construction Project Tracking',
      icon: '🏗️',
      description: 'Digitize material requisitions, site progress logs, subcontractor invoices, and budget vs actual milestone tracking.',
      features: ['Site Material Requisition Workflow', 'Subcontractor Bill Verification', 'Milestone Payment Certificate Tracking', 'Daily Site Photo & Log Uploads'],
    },
    {
      title: 'Training-Centre Management',
      icon: '🎓',
      description: 'Manage student registrations, course batch schedules, installment payment tracking, and automated QR certificate issuance.',
      features: ['Student Self-Registration Portal', 'Instalment Payment Tracking & Reminders', 'Lecturer Class Timetables', 'QR Code Digital Certificate Generator'],
    },
    {
      title: 'Booking & Tour Operations',
      icon: '🧭',
      description: 'Direct booking engines for boutique hotels, tour operators, and vehicle fleets with automated calendar sync and guest vouchers.',
      features: ['Real-Time Availability Calendar', 'Custom Itinerary Builder', 'Automated WhatsApp Confirmation', 'Multi-currency Currency Converter'],
    },
    {
      title: 'Field-Service Management',
      icon: '🚚',
      description: 'Dispatch technicians, track job tickets, record customer sign-offs on site, and manage spare parts usage.',
      features: ['Mobile Technician Job Sheet', 'Customer Digital Signature Capture', 'Geo-tagged Waypoint Logging', 'Spare Part Inventory Consumption'],
    },
    {
      title: 'Approval & Document Workflows',
      icon: '🔐',
      description: 'Multi-level managerial authorization chains for internal requisitions, contracts, and financial disbursements.',
      features: ['Custom Multi-Tier Approval Rules', 'Version-Controlled Document Vault', 'Role-Based Audit Logging', 'Email & SMS Instant Alerts'],
    },
    {
      title: 'Management Reporting Dashboards',
      icon: '📈',
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
}
