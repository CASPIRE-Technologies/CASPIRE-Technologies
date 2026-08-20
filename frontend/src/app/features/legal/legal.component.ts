import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Legal & Compliance</span>
        <h1>{{ pageTitle() }}</h1>
        <p class="header-lead">
          Notice: The content below represents our standard operational terms for Sri Lankan IT services and software delivery, subject to legal review.
        </p>
      </div>
    </section>

    <section class="section">
      <div class="container container-narrow card legal-card">
        <div *ngIf="pageType() === 'privacy'" class="legal-body">
          <h2>Privacy Policy</h2>
          <p><em>Last updated: August 14, 2026 (Pending Final Formal Legal Counsel Review)</em></p>

          <h3>1. Data Collection</h3>
          <p>Apex Software Engineering (Pvt) Ltd collects business contact information (name, corporate email, telephone number, company name) submitted voluntarily via our consultation enquiry forms.</p>

          <h3>2. Purpose of Processing</h3>
          <p>We process your contact details solely to evaluate technical requirements, respond to project requests, and manage client contractual relationships.</p>

          <h3>3. Data Protection & Storage</h3>
          <p>Enquiry data is stored securely in password-protected MySQL databases utilizing encrypted communication channels (TLS/SSL). We do not sell or rent personal data to third parties.</p>
        </div>

        <div *ngIf="pageType() === 'cookie'" class="legal-body">
          <h2>Cookie Policy</h2>
          <p><em>Last updated: August 14, 2026 (Pending Final Formal Legal Counsel Review)</em></p>

          <h3>1. Use of Cookies</h3>
          <p>Our website utilizes essential session cookies necessary for security and user experience. Non-essential performance and analytics cookies remain deactivated until explicit consent is granted via our banner.</p>

          <h3>2. Managing Preferences</h3>
          <p>You may accept or decline non-essential cookies at any time using our site cookie banner or browser settings.</p>
        </div>

        <div *ngIf="pageType() === 'terms'" class="legal-body">
          <h2>Terms of Service</h2>
          <p><em>Last updated: August 14, 2026 (Pending Final Formal Legal Counsel Review)</em></p>

          <h3>1. Intellectual Property & Code Ownership</h3>
          <p>All custom software code, database schemas, and documentation delivered under formal client agreements transfer full intellectual property rights to the client upon settlement of milestone invoices.</p>

          <h3>2. Independent Quality Validation</h3>
          <p>Apex Software Engineering validates software against agreed specifications through independent QA testing prior to production release.</p>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
      color: #ffffff;
      padding: 3.5rem 0;
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.125rem; }
    }
    .container-narrow { max-width: 850px; margin: 0 auto; }
    .legal-card {
      font-size: 1rem;
      line-height: 1.7;
      h2 { margin-bottom: 0.5rem; }
      h3 { margin: 1.5rem 0 0.5rem 0; font-size: 1.2rem; }
      p { color: var(--color-charcoal); }
    }
    .mb-2 { margin-bottom: 0.5rem; }
  `]
})
export class LegalComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  pageType = signal<'privacy' | 'cookie' | 'terms'>('privacy');
  pageTitle = signal<string>('Privacy Policy');

  ngOnInit() {
    this.route.url.subscribe((urlSegments) => {
      const path = urlSegments[0]?.path || 'privacy-policy';
      if (path.includes('cookie')) {
        this.pageType.set('cookie');
        this.pageTitle.set('Cookie Policy');
      } else if (path.includes('terms')) {
        this.pageType.set('terms');
        this.pageTitle.set('Terms of Service');
      } else {
        this.pageType.set('privacy');
        this.pageTitle.set('Privacy Policy');
      }

      this.seo.updateMeta({
        title: this.pageTitle(),
        description: `Read Apex Software Engineering ${this.pageTitle()} details.`,
      });
    });
  }
}
