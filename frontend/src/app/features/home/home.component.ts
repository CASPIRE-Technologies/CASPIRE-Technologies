import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
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

      </div>
    </section>

    <!-- 2. Trust Statement Section -->
    <section class="trust-banner section-sm">
      <div class="container trust-container">
        <div class="trust-grid">
          <div class="trust-pill reveal">
            <span nz-icon nzType="laptop" nzTheme="outline" class="pill-icon"></span>
            <div>
              <strong>Frontend Engineering</strong>
              <p>Angular, React, Responsive SPAs & SSR</p>
            </div>
          </div>
          <div class="trust-pill reveal">
            <span nz-icon nzType="setting" nzTheme="outline" class="pill-icon"></span>
            <div>
              <strong>Backend Engineering</strong>
              <p>NestJS, Microservices, REST/GraphQL APIs</p>
            </div>
          </div>
          <div class="trust-pill reveal">
            <span nz-icon nzType="safety-certificate" nzTheme="outline" class="pill-icon"></span>
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
          <div class="problem-card reveal">
            <div class="problem-icon-wrap">
              <span nz-icon nzType="table" nzTheme="outline"></span>
            </div>
            <h3>Manual Spreadsheet Data Silos</h3>
            <p>Multiple departments maintaining conflicting Excel sheets leads to lost invoices, stock discrepancies, and delayed executive reporting.</p>
            <div class="solution-tag">→ Solved with Centralized Custom ERP Web Portals</div>
          </div>
          <div class="problem-card reveal">
            <div class="problem-icon-wrap">
              <span nz-icon nzType="hourglass" nzTheme="outline"></span>
            </div>
            <h3>Slow Paper Approval Chains</h3>
            <p>Physical paper requisitions and signature delays stall site work, customer orders, and vendor disbursements for days.</p>
            <div class="solution-tag">→ Solved with Digital Approval Routing & SMS Notifications</div>
          </div>
          <div class="problem-card reveal">
            <div class="problem-icon-wrap">
              <span nz-icon nzType="bug" nzTheme="outline"></span>
            </div>
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
          <div *ngFor="let s of featuredServices()" class="card service-card reveal">
            <div class="service-icon-box">
              <span nz-icon [nzType]="getServiceIcon(s.icon)" nzTheme="outline"></span>
            </div>
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
          <div *ngFor="let ind of industries()" class="card industry-card reveal">
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
          <div class="process-step reveal">
            <div class="step-num">01</div>
            <h4>Initial Consultation</h4>
          </div>
          <div class="process-step reveal">
            <div class="step-num">02</div>
            <h4>Discovery</h4>
          </div>
          <div class="process-step reveal">
            <div class="step-num">03</div>
            <h4>Requirements</h4>
          </div>
          <div class="process-step reveal">
            <div class="step-num">04</div>
            <h4>Proposal & Estimate</h4>
          </div>
          <div class="process-step reveal">
            <div class="step-num">05</div>
            <h4>Design & Development</h4>
          </div>
          <div class="process-step reveal">
            <div class="step-num">06</div>
            <h4>Independent QA</h4>
          </div>
          <div class="process-step reveal">
            <div class="step-num">07</div>
            <h4>Client UAT</h4>
          </div>
          <div class="process-step reveal">
            <div class="step-num">08</div>
            <h4>Production Deployment</h4>
          </div>
          <div class="process-step reveal">
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
          <div class="managed-content reveal">
            <span class="badge badge-teal mb-3">Long-Term SLA Commitment</span>
            <h2>Application Maintenance & Managed Support</h2>
            <p>
              Software requires ongoing security updates, database index optimization, dependency upgrades, and operational monitoring. We provide long-term application maintenance agreements to ensure your digital platform remains secure, high-performing, and compliant.
            </p>
            <ul class="check-list">
              <li><span nz-icon nzType="check-circle" nzTheme="fill" class="check-icon"></span> Proactive Security Patching & Vulnerability Mitigation</li>
              <li><span nz-icon nzType="check-circle" nzTheme="fill" class="check-icon"></span> 99.9% Uptime Monitoring & Health Check Alerts</li>
              <li><span nz-icon nzType="check-circle" nzTheme="fill" class="check-icon"></span> Guaranteed Response Time Service Level Agreements (SLAs)</li>
              <li><span nz-icon nzType="check-circle" nzTheme="fill" class="check-icon"></span> Monthly Database Optimization & Automated Backup Checks</li>
            </ul>
          </div>
          <div class="managed-card reveal">
            <h3>Need Maintenance for Existing Software?</h3>
            <p>Whether built by Apex or a previous team, we provide software modernization and managed application support.</p>
            <a routerLink="/contact" class="btn btn-primary mt-3">Discuss Support Options →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- 8. Final Call to Action -->
    <section class="section cta-section">
      <div class="container text-center reveal">
        <h2>Ready to digitize and scale your business operations?</h2>
        <p class="cta-lead">Speak with our senior engineering team today to review your project goals, scope, and technical roadmap.</p>
        <div class="cta-buttons mt-4">
          <a routerLink="/contact" class="btn btn-primary">Request a Free Consultation →</a>
          <a href="tel:+94112345678" class="btn btn-secondary">
            <span nz-icon nzType="phone" nzTheme="outline"></span>
            Call Office: +94 11 234 5678
          </a>
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
      padding: 5.5rem 0 10rem 0;
      position: relative;
      overflow: hidden;
      min-height: 540px;
      display: flex;
      align-items: center;

      .hero-title {
        color: #ffffff;
        margin: 0 auto 1.25rem auto;
        max-width: 760px;
        text-shadow: 0 3px 18px rgba(0, 0, 0, 0.45);
      }
      .hero-subtitle {
        color: #f8fafc;
        font-size: 1.25rem;
        max-width: 650px;
        margin: 0 auto 2rem auto;
        text-shadow: 0 2px 14px rgba(0, 0, 0, 0.45);
      }
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
      background:
        linear-gradient(to bottom, rgba(5, 5, 5, 0.3) 0%, rgba(5, 5, 5, 0.14) 45%, rgba(255, 255, 255, 0.72) 84%, #ffffff 100%),
        linear-gradient(to right, rgba(5, 5, 5, 0.2), rgba(5, 5, 5, 0.08));
      z-index: 1;
    }
    .hero-container {
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      z-index: 2;
    }
    .hero-content {
      width: min(100%, 820px);
      text-align: center;
      margin: 0 auto;
    }

    /* Orchestrated hero entrance */
    .hero-content > * {
      animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .hero-content .badge { animation-delay: 0ms; }
    .hero-content .hero-title { animation-delay: 120ms; }
    .hero-content .hero-subtitle { animation-delay: 240ms; }
    .hero-content .hero-actions { animation-delay: 360ms; }

    @keyframes fadeInUp {
      from { opacity: 0; transform: translateY(22px); }
      to { opacity: 1; transform: translateY(0); }
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

    .hero-actions {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      justify-content: center;
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
      justify-content: center;
      gap: 2rem;
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
      justify-content: center;
      align-items: center;
      gap: 2rem;
      flex: 1;
      flex-wrap: wrap;
    }
    .trust-pill {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      transition: transform 0.3s ease;
      p { font-size: 0.8125rem; color: var(--color-charcoal-muted); margin: 0; }
    }
    .trust-pill:hover { transform: translateY(-3px); }
    .pill-icon {
      font-size: 1.75rem;
      color: var(--color-teal-dark);
      flex-shrink: 0;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .trust-pill:hover .pill-icon { transform: scale(1.15) rotate(-6deg); }

    .trust-grid .reveal:nth-child(1) { transition-delay: 0ms; }
    .trust-grid .reveal:nth-child(2) { transition-delay: 90ms; }
    .trust-grid .reveal:nth-child(3) { transition-delay: 180ms; }

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
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .problem-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
      border-color: var(--color-teal-accent);
    }
    .problem-icon-wrap {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      background: var(--color-bg-surface-elevated, #f0fdfa);
      color: var(--color-teal-dark);
      font-size: 1.625rem;
      margin-bottom: 1.25rem;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease;
    }
    .problem-card:hover .problem-icon-wrap {
      transform: scale(1.1) rotate(-4deg);
      background: var(--color-teal-accent);
      color: #ffffff;
    }
    .solution-tag {
      margin-top: 1.25rem;
      font-size: 0.875rem;
      font-weight: 700;
      color: var(--color-teal-dark);
    }

    .problems-grid .reveal:nth-child(1) { transition-delay: 0ms; }
    .problems-grid .reveal:nth-child(2) { transition-delay: 100ms; }
    .problems-grid .reveal:nth-child(3) { transition-delay: 200ms; }

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
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .service-card:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
      border-color: var(--color-navy-dark);
    }
    .service-icon-box {
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      background: var(--color-bg-surface-elevated, #f8fafc);
      color: var(--color-navy-dark);
      font-size: 1.625rem;
      margin-bottom: 1rem;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, color 0.35s ease;
    }
    .service-card:hover .service-icon-box {
      transform: scale(1.1) rotate(4deg);
      background: var(--color-navy-dark);
      color: #ffffff;
    }
    .service-link {
      margin-top: auto;
      font-weight: 700;
      color: var(--color-teal-dark);
      transition: gap 0.25s ease;
    }

    .services-grid .reveal:nth-child(1) { transition-delay: 0ms; }
    .services-grid .reveal:nth-child(2) { transition-delay: 80ms; }
    .services-grid .reveal:nth-child(3) { transition-delay: 160ms; }
    .services-grid .reveal:nth-child(4) { transition-delay: 240ms; }
    .services-grid .reveal:nth-child(5) { transition-delay: 320ms; }
    .services-grid .reveal:nth-child(6) { transition-delay: 400ms; }

    /* Industries Grid */
    .industries-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: 1.5rem;
    }
    .industry-card {
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      h3 { margin-bottom: 0.75rem; }
    }
    .industry-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
    }
    .btn-link {
      display: inline-block;
      margin-top: 1rem;
      font-weight: 700;
      color: var(--color-teal-dark);
    }

    .industries-grid .reveal:nth-child(1) { transition-delay: 0ms; }
    .industries-grid .reveal:nth-child(2) { transition-delay: 70ms; }
    .industries-grid .reveal:nth-child(3) { transition-delay: 140ms; }
    .industries-grid .reveal:nth-child(4) { transition-delay: 210ms; }
    .industries-grid .reveal:nth-child(5) { transition-delay: 280ms; }

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
      transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;

      .step-num {
        font-family: var(--font-family-heading);
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-teal-dark);
        margin-bottom: 0.5rem;
      }
      h4 { font-size: 0.875rem; line-height: 1.3; }
    }
    .process-step:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 20px rgba(15, 23, 42, 0.08);
      border-color: var(--color-teal-accent);
    }

    .process-timeline .reveal:nth-child(1) { transition-delay: 0ms; }
    .process-timeline .reveal:nth-child(2) { transition-delay: 50ms; }
    .process-timeline .reveal:nth-child(3) { transition-delay: 100ms; }
    .process-timeline .reveal:nth-child(4) { transition-delay: 150ms; }
    .process-timeline .reveal:nth-child(5) { transition-delay: 200ms; }
    .process-timeline .reveal:nth-child(6) { transition-delay: 250ms; }
    .process-timeline .reveal:nth-child(7) { transition-delay: 300ms; }
    .process-timeline .reveal:nth-child(8) { transition-delay: 350ms; }
    .process-timeline .reveal:nth-child(9) { transition-delay: 400ms; }

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
      li {
        display: flex;
        align-items: flex-start;
        gap: 0.625rem;
        margin-bottom: 0.75rem;
        font-weight: 500;
      }
    }
    .check-icon {
      color: var(--color-teal-accent);
      font-size: 1.125rem;
      margin-top: 0.15rem;
      flex-shrink: 0;
    }
    .managed-card {
      background-color: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.15);
      padding: 2rem;
      border-radius: var(--radius-lg);
      transition: transform 0.3s ease, border-color 0.3s ease;
    }
    .managed-card:hover {
      transform: translateY(-4px);
      border-color: var(--color-teal-accent);
    }

    .managed-grid .managed-content.reveal { transition-delay: 0ms; }
    .managed-grid .managed-card.reveal { transition-delay: 120ms; }

    /* CTA Section */
    .cta-section {
      background: linear-gradient(135deg, var(--color-bg-surface) 0%, var(--color-bg-surface-elevated) 100%);
      border-top: 1px solid var(--color-border);
    }
    .cta-lead { font-size: 1.25rem; max-width: 700px; margin: 0.5rem auto 0 auto; }
    .cta-buttons { display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; }
    .cta-buttons .btn-secondary { display: inline-flex; align-items: center; gap: 0.5rem; }
    .text-center { text-center: center; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-4 { margin-bottom: 1rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-4 { margin-top: 1rem; }
    .mt-5 { margin-top: 2rem; }

    /* Scroll reveal base */
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
      .reveal {
        opacity: 1;
        transform: none;
        transition: none;
      }
      .hero-content > *,
      .pulse-dot {
        animation: none;
      }
    }

    @media (max-width: 900px) {
      .hero-container { grid-template-columns: 1fr; }
      .managed-grid { grid-template-columns: 1fr; }
    }
  `]
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private api = inject(ApiService);
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  featuredServices = signal<any[]>([]);
  industries = signal<any[]>([]);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Software Engineering & Digital Transformation Partner',
      description: 'We design, build, test and support secure digital solutions for growing businesses in Sri Lanka and international markets.',
    });

    this.api.get<any[]>('services').subscribe({
      next: (res) => {
        this.featuredServices.set(this.withMarketingServices(res).slice(0, 6));
        setTimeout(() => this.observeReveal());
      },
      error: () => {
        this.featuredServices.set(this.getFallbackServices());
        setTimeout(() => this.observeReveal());
      },
    });

    this.api.get<any[]>('industries').subscribe({
      next: (res) => {
        this.industries.set(res);
        setTimeout(() => this.observeReveal());
      },
      error: () => {
        this.industries.set(this.getFallbackIndustries());
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

  getServiceIcon(icon: string): string {
    const map: Record<string, string> = {
      code: 'code',
      cpu: 'thunderbolt',
      server: 'cluster',
      'shield-check': 'security-scan',
      cloud: 'cloud',
      search: 'search',
      social: 'share-alt',
    };
    return map[icon] || 'rocket';
  }

  private withMarketingServices(services: any[]) {
    const visibleServices = services.filter((service) => service.slug !== 'dedicated-engineering-teams');
    const slugs = new Set(visibleServices.map((service) => service.slug));
    return [
      ...visibleServices,
      ...this.marketingServices().filter((service) => !slugs.has(service.slug)),
    ].sort((a, b) => (a.displayOrder ?? 999) - (b.displayOrder ?? 999));
  }

  private marketingServices() {
    return [
      { slug: 'seo', title: 'SEO', icon: 'search', shortDesc: 'Technical, on-page, and local SEO improvements that help customers find your business through organic search.', displayOrder: 6 },
      { slug: 'social-media-marketing', title: 'Social Media Marketing', icon: 'social', shortDesc: 'Organic social media planning, content calendars, creative posts, and profile management without paid boosting.', displayOrder: 7 },
    ];
  }

  private getFallbackServices() {
    return [
      { slug: 'custom-web-applications', title: 'Custom Web Applications', icon: 'code', shortDesc: 'Tailor-made web applications designed for high performance, enterprise security, and long-term scalability.' },
      { slug: 'sme-digital-transformation', title: 'SME Workflow Digitization', icon: 'cpu', shortDesc: 'Automate manual paper processes, eliminate spreadsheet errors, and digitize core business operations.' },
      { slug: 'backend-api-development', title: 'Backend & API Development', icon: 'server', shortDesc: 'Robust RESTful and GraphQL APIs, microservices architecture, and secure enterprise integration layers.' },
      { slug: 'qa-and-test-automation', title: 'QA & Test Automation', icon: 'shield-check', shortDesc: 'Independent quality engineering, automated regression testing, performance profiling, and security testing.' },
      { slug: 'cloud-deployment-devops', title: 'Cloud Deployment & DevOps', icon: 'cloud', shortDesc: 'Automated CI/CD pipelines, Docker containerization, cloud infrastructure management, and monitoring.' },
      ...this.marketingServices(),
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