import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- 1. Hero Section -->
    <section class="hero-section" aria-label="Hero Introduction">
      <!-- Background Video -->
      <video class="hero-video" autoplay [muted]="true" loop playsinline>
        <source src="./../../../assets/videos/Hero_video_for_tech_company_202608201455.mp4" type="video/mp4" >
        Your browser does not support the video tag.
      </video>
      
      <!-- Video Overlay -->
      <div class="hero-overlay"></div>
      
      <div class="container hero-container">
        <div class="hero-content">
          <div class="badge badge-teal mb-4">
            <span class="pulse-dot"></span> Sri Lanka & International Engineering Partner
          </div>
          <h1 class="hero-title">Software that moves your business forward.</h1>
          <p class="hero-subtitle">
            We design, build, test and support secure digital solutions for growing businesses in Sri Lanka and international markets.
          </p>
          <div class="hero-actions">
            <a routerLink="/contact" class="btn btn-primary">Request a Consultation →</a>
            <a routerLink="/services" class="btn btn-secondary">Explore Our Services</a>
          </div>
        </div>

        <div class="hero-visual">
          <div class="hero-card-stack">
            <div class="visual-card visual-card-main">
              <div class="card-header">
                <span class="status-indicator"></span>
                <span>Apex Engineering Dashboard</span>
              </div>
              <div class="code-snippet">
                <span class="token-keyword">const</span> solution = <span class="token-keyword">await</span> <span class="token-function">buildStack</span>({{ '{' }}<br>
                &nbsp;&nbsp;frontend: <span class="token-string">'Angular Standalone + Signals'</span>,<br>
                &nbsp;&nbsp;backend: <span class="token-string">'NestJS REST API + Prisma'</span>,<br>
                &nbsp;&nbsp;quality: <span class="token-string">'Independent QA & Automation'</span>,<br>
                &nbsp;&nbsp;security: <span class="token-string">'Tokenized Auth + Rate Limiting'</span><br>
                {{ '}' }}).<span class="token-function">deploy</span>();
              </div>
              <div class="card-footer-stats">
                <div class="stat-box">
                  <span class="stat-num">100%</span>
                  <span class="stat-label">Code Ownership</span>
                </div>
                <div class="stat-box">
                  <span class="stat-num">24/7</span>
                  <span class="stat-label">Managed SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. Trust Statement Section -->
    <section class="trust-banner section-sm">
      <div class="container trust-container">
        <div class="trust-title">Founding Capabilities:</div>
        <div class="trust-grid">
          <div class="trust-pill">
            <span class="pill-icon">💻</span>
            <div>
              <strong>Frontend Engineering</strong>
              <p>Angular, React, Responsive SPAs & SSR</p>
            </div>
          </div>
          <div class="trust-pill">
            <span class="pill-icon">⚙️</span>
            <div>
              <strong>Backend Engineering</strong>
              <p>NestJS, Microservices, REST/GraphQL APIs</p>
            </div>
          </div>
          <div class="trust-pill">
            <span class="pill-icon">🛡️</span>
            <div>
              <strong>Independent Quality Engineering</strong>
              <p>Automated Testing, Security & Load Audits</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 3. Business Problems We Solve -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header text-center">
          <span class="badge badge-navy mb-2">Operational Bottlenecks</span>
          <h2>Business Problems We Solve</h2>
          <p class="section-lead">Transforming complex, disconnected manual work into automated software systems.</p>
        </div>

        <div class="problems-grid">
          <div class="problem-card">
            <div class="problem-icon">📊</div>
            <h3>Manual Spreadsheet Data Silos</h3>
            <p>Multiple departments maintaining conflicting Excel sheets leads to lost invoices, stock discrepancies, and delayed executive reporting.</p>
            <div class="solution-tag">→ Solved with Centralized Custom ERP Web Portals</div>
          </div>
          <div class="problem-card">
            <div class="problem-icon">⏳</div>
            <h3>Slow Paper Approval Chains</h3>
            <p>Physical paper requisitions and signature delays stall site work, customer orders, and vendor disbursements for days.</p>
            <div class="solution-tag">→ Solved with Digital Approval Routing & SMS Notifications</div>
          </div>
          <div class="problem-card">
            <div class="problem-icon">🐛</div>
            <h3>Frequent Bugs & System Downtime</h3>
            <p>Software released without independent quality validation causes customer complaints and costly emergency hotfixes.</p>
            <div class="solution-tag">→ Solved with QA as a Service & Automated Regression Testing</div>
          </div>
        </div>
      </div>
    </section>

    <!-- 4. Featured Services Grid -->
    <section class="section">
      <div class="container">
        <div class="section-header text-center">
          <span class="badge badge-teal mb-2">Core Engineering Services</span>
          <h2>Our Primary Capabilities</h2>
          <p class="section-lead">Tailored technical solutions engineered for reliability, security, and growth.</p>
        </div>

        <div class="services-grid">
          <div *ngFor="let s of featuredServices()" class="card service-card">
            <div class="service-icon-box">{{ getServiceIcon(s.icon) }}</div>
            <h3>{{ s.title }}</h3>
            <p>{{ s.shortDesc }}</p>
            <a [routerLink]="['/services', s.slug]" class="service-link">View Service Details →</a>
          </div>
        </div>

        <div class="text-center mt-5">
          <a routerLink="/services" class="btn btn-secondary">Explore All 11 Services & Capabilities →</a>
        </div>
      </div>
    </section>

    <!-- 5. Industry Solutions -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header text-center">
          <span class="badge badge-navy mb-2">Tailored Domain Knowledge</span>
          <h2>Industry Solutions</h2>
          <p class="section-lead">Real-world software engineering tailored to Sri Lankan SMEs and global enterprises.</p>
        </div>

        <div class="industries-grid">
          <div *ngFor="let ind of industries()" class="card industry-card">
            <h3>{{ ind.title }}</h3>
            <p>{{ ind.shortDesc }}</p>
            <a [routerLink]="['/industries', ind.slug]" class="btn-link">See Use Cases →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 6. Delivery Process -->
    <section class="section">
      <div class="container">
        <div class="section-header text-center">
          <span class="badge badge-teal mb-2">Structured Lifecycle</span>
          <h2>Our 9-Step Delivery Process</h2>
          <p class="section-lead">From initial consultation to production rollout and continuous support.</p>
        </div>

        <div class="process-timeline">
          <div class="process-step">
            <div class="step-num">01</div>
            <h4>Initial Consultation</h4>
          </div>
          <div class="process-step">
            <div class="step-num">02</div>
            <h4>Discovery</h4>
          </div>
          <div class="process-step">
            <div class="step-num">03</div>
            <h4>Requirements</h4>
          </div>
          <div class="process-step">
            <div class="step-num">04</div>
            <h4>Proposal & Estimate</h4>
          </div>
          <div class="process-step">
            <div class="step-num">05</div>
            <h4>Design & Development</h4>
          </div>
          <div class="process-step">
            <div class="step-num">06</div>
            <h4>Independent QA</h4>
          </div>
          <div class="process-step">
            <div class="step-num">07</div>
            <h4>Client UAT</h4>
          </div>
          <div class="process-step">
            <div class="step-num">08</div>
            <h4>Production Deployment</h4>
          </div>
          <div class="process-step">
            <div class="step-num">09</div>
            <h4>Managed Support</h4>
          </div>
        </div>

        <div class="text-center mt-4">
          <a routerLink="/delivery-process" class="btn btn-secondary">Learn More About Our Methodology →</a>
        </div>
      </div>
    </section>

    <!-- 7. Maintenance & Managed Support Section -->
    <section class="section section-dark">
      <div class="container">
        <div class="managed-grid">
          <div class="managed-content">
            <span class="badge badge-teal mb-3">Long-Term SLA Commitment</span>
            <h2>Application Maintenance & Managed Support</h2>
            <p>
              Software requires ongoing security updates, database index optimization, dependency upgrades, and operational monitoring. We provide long-term application maintenance agreements to ensure your digital platform remains secure, high-performing, and compliant.
            </p>
            <ul class="check-list">
              <li>✔️ Proactive Security Patching & Vulnerability Mitigation</li>
              <li>✔️ 99.9% Uptime Monitoring & Health Check Alerts</li>
              <li>✔️ Guaranteed Response Time Service Level Agreements (SLAs)</li>
              <li>✔️ Monthly Database Optimization & Automated Backup Checks</li>
            </ul>
          </div>
          <div class="managed-card">
            <h3>Need Maintenance for Existing Software?</h3>
            <p>Whether built by Apex or a previous team, we provide software modernization and managed application support.</p>
            <a routerLink="/contact" class="btn btn-primary mt-3">Discuss Support Options →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Final Call to Action -->
    <section class="section cta-section">
      <div class="container text-center">
        <h2>Ready to digitize and scale your business operations?</h2>
        <p class="cta-lead">Speak with our senior engineering team today to review your project goals, scope, and technical roadmap.</p>
        <div class="cta-buttons mt-4">
          <a routerLink="/contact" class="btn btn-primary">Request a Free Consultation →</a>
          <a href="tel:+94112345678" class="btn btn-secondary">Call Office: +94 11 234 5678</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero-section {
      background-size: cover;
      border-bottom-color: linear-gradient(to down, red, orange);
      background-position: center;
      color: #ffffff;
      padding: 5rem 0 6rem 0;
      position: relative;
      overflow: hidden;

      .hero-title { color: #ffffff; margin-bottom: 1.25rem; }
      .hero-subtitle { color: #cbd5e1; font-size: 1.25rem; max-width: 600px; margin-bottom: 2rem; }
    }
    .hero-video {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: 0;
    }
    .hero-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      z-index: 1;
    }
    .hero-container {
      display: grid;
      grid-template-columns: 1.2fr 1fr;
      gap: 3rem;
      align-items: center;
      position: relative;
      z-index: 2;
    }
    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: var(--color-teal-accent);
      border-radius: 50%;
      display: inline-block;
    }
    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .hero-visual {
      display: flex;
      justify-content: center;
    }
    .visual-card-main {
      background: rgba(15, 23, 42, 0.4);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.25);
      border-radius: var(--radius-lg);
      padding: 1.5rem;
      box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37), inset 0 1px 2px 0 rgba(255, 255, 255, 0.1);
      font-family: monospace;
      color: #e2e8f0;
    }
    .card-header {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      font-size: 0.8125rem;
      color: #94a3b8;
      margin-bottom: 1rem;
      padding-bottom: 0.75rem;
      border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }
    .status-indicator {
      width: 10px;
      height: 10px;
      background-color: #10b981;
      border-radius: 50%;
    }
    .code-snippet {
      font-size: 0.875rem;
      line-height: 1.7;
      margin-bottom: 1.5rem;
    }
    .token-keyword { color: #f43f5e; }
    .token-function { color: #38bdf8; }
    .token-string { color: #a3e635; }
    .card-footer-stats {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      padding-top: 1rem;
      border-top: 1px solid rgba(255, 255, 255, 0.1);
    }
    .stat-num { font-size: 1.25rem; font-weight: 800; color: var(--color-teal-accent); display: block; }
    .stat-label { font-size: 0.75rem; color: #94a3b8; }

    /* Trust Banner */
    .trust-banner {
      background-color: var(--color-bg-surface);
      border-bottom: 1px solid var(--color-border);
    }
    .trust-container {
      display: flex;
      align-items: center;
      gap: 2rem;
      flex-wrap: wrap;
    }
    .trust-title {
      font-family: var(--font-family-heading);
      font-weight: 800;
      color: var(--color-navy-dark);
      font-size: 0.9375rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .trust-grid {
      display: flex;
      gap: 2rem;
      flex: 1;
      flex-wrap: wrap;
    }
    .trust-pill {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      p { font-size: 0.8125rem; color: var(--color-charcoal-muted); margin: 0; }
    }
    .pill-icon { font-size: 1.5rem; }

    /* Problems Grid */
    .section-header { margin-bottom: 3.5rem; }
    .section-lead { font-size: 1.125rem; max-width: 650px; margin: 0.5rem auto 0 auto; }

    .problems-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }
    .problem-card {
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-lg);
      padding: 2rem;
      box-shadow: var(--shadow-sm);
    }
    .problem-icon { font-size: 2.25rem; margin-bottom: 1rem; }
    .solution-tag {
      margin-top: 1.25rem;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--color-teal-dark);
    }

    /* Services Grid */
    .services-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }
    .service-card {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .service-icon-box {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
    .service-link {
      margin-top: auto;
      font-weight: 700;
      color: var(--color-teal-dark);
    }

    /* Industries Grid */
    .industries-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .industry-card {
      h3 { margin-bottom: 0.75rem; }
    }
    .btn-link {
      display: inline-block;
      margin-top: 1rem;
      font-weight: 700;
      color: var(--color-teal-dark);
    }

    /* Process Timeline */
    .process-timeline {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
      gap: 1rem;
    }
    .process-step {
      background-color: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      padding: 1.25rem 1rem;
      text-align: center;

      .step-num {
        font-family: var(--font-family-heading);
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-teal-dark);
        margin-bottom: 0.5rem;
      }
      h4 { font-size: 0.875rem; line-height: 1.3; }
    }

    /* Managed Support */
    .managed-grid {
      display: grid;
      grid-template-columns: 1.5fr 1fr;
      gap: 3rem;
      align-items: center;
    }
    .check-list {
      list-style: none;
      margin-top: 1.5rem;
      li { margin-bottom: 0.75rem; font-weight: 500; }
    }
    .managed-card {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 2rem;
      border-radius: var(--radius-lg);
    }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, var(--color-bg-surface) 0%, var(--color-bg-surface-elevated) 100%);
      border-top: 1px solid var(--color-border);
    }
    .cta-lead { font-size: 1.25rem; max-width: 700px; margin: 0.5rem auto 0 auto; }
    .cta-buttons { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
    .text-center { text-center: center; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-4 { margin-top: 1rem; }
    .mt-5 { margin-top: 2rem; }

    @media (max-width: 900px) {
      .hero-container { grid-template-columns: 1fr; }
      .managed-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private seo = inject(SeoService);
  private api = inject(ApiService);

  featuredServices = signal<any[]>([]);
  industries = signal<any[]>([]);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Software Engineering & Digital Transformation Partner',
      description: 'We design, build, test and support secure digital solutions for growing businesses in Sri Lanka and international markets.',
    });

    this.api.get<any[]>('services').subscribe({
      next: (res) => this.featuredServices.set(res.slice(0, 6)),
      error: () => this.featuredServices.set(this.getFallbackServices()),
    });

    this.api.get<any[]>('industries').subscribe({
      next: (res) => this.industries.set(res),
      error: () => this.industries.set(this.getFallbackIndustries()),
    });
  }

  getServiceIcon(icon: string): string {
    const map: Record<string, string> = {
      code: '💻',
      cpu: '⚡',
      server: '⚙️',
      'shield-check': '🛡️',
      cloud: '☁️',
      users: '👥',
    };
    return map[icon] || '🚀';
  }

  private getFallbackServices() {
    return [
      { slug: 'custom-web-applications', title: 'Custom Web Applications', icon: 'code', shortDesc: 'Tailor-made web applications designed for high performance, enterprise security, and long-term scalability.' },
      { slug: 'sme-digital-transformation', title: 'SME Workflow Digitization', icon: 'cpu', shortDesc: 'Automate manual paper processes, eliminate spreadsheet errors, and digitize core business operations.' },
      { slug: 'backend-api-development', title: 'Backend & API Development', icon: 'server', shortDesc: 'Robust RESTful and GraphQL APIs, microservices architecture, and secure enterprise integration layers.' },
      { slug: 'qa-and-test-automation', title: 'QA & Test Automation', icon: 'shield-check', shortDesc: 'Independent quality engineering, automated regression testing, performance profiling, and security testing.' },
      { slug: 'cloud-deployment-devops', title: 'Cloud Deployment & DevOps', icon: 'cloud', shortDesc: 'Automated CI/CD pipelines, Docker containerization, cloud infrastructure management, and monitoring.' },
      { slug: 'dedicated-engineering-teams', title: 'Dedicated Engineering Teams', icon: 'users', shortDesc: 'Extend your product team with dedicated Sri Lankan frontend, backend, and QA software engineers.' },
    ];
  }

  private getFallbackIndustries() {
    return [
      { slug: 'construction-engineering', title: 'Construction & Engineering', shortDesc: 'Project tracking, material inventory, subcontractor approvals, and site progress monitoring.' },
      { slug: 'tourism-hospitality', title: 'Tourism & Hospitality', shortDesc: 'Direct booking engines, tour itinerary builders, guest management, and local payment gateways.' },
      { slug: 'education-training', title: 'Education & Training', shortDesc: 'Student enrollment portals, course management, automated billing, and certificate generation.' },
      { slug: 'retail-distribution', title: 'Retail & Distribution', shortDesc: 'B2B ordering portals, stock control, sales representative field tracking, and multi-store billing.' },
      { slug: 'startups-digital-agencies', title: 'Startups & Digital Agencies', shortDesc: 'Outsourced engineering, MVP development, backend microservices, and dedicated QA teams.' },
    ];
  }
}
