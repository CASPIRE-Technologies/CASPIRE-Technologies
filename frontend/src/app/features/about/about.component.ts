import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <div class="badge badge-teal mb-2">
          <span class="pulse-dot"></span> Company Overview
        </div>
        <h1>About Apex Software Engineering</h1>
        <p class="header-lead">
          Founded on core principles of technical rigor, transparent execution, and independent quality validation.
        </p>
      </div>
    </section>

    <!-- Mission & Vision Section -->
    <section class="section section-alt">
      <div class="container">
        <div class="grid-2">
          <div class="card card-brand reveal">
            <div class="card-icon">
              <span nz-icon nzType="aim" nzTheme="outline"></span>
            </div>
            <h2>Our Mission</h2>
            <p>
              To engineer secure, reliable, and scalable software solutions that eliminate operational friction for Sri Lankan enterprises and provide world-class outsourced engineering teams for global digital innovators.
            </p>
          </div>
          <div class="card card-brand reveal">
            <div class="card-icon">
              <span nz-icon nzType="star" nzTheme="outline"></span>
            </div>
            <h2>Our Vision</h2>
            <p>
              To establish Sri Lanka as a premier destination for high-rigor software engineering, independent software quality assurance, and sustainable digital transformation partnerships.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Operating Principles -->
    <section class="section">
      <div class="container">
        <div class="section-header text-center">
          <span class="badge badge-navy mb-2">Engineering Ethics</span>
          <h2>Our Operating Principles</h2>
          <p class="section-lead">Guidelines that govern how we build, test, and support every line of code.</p>
        </div>

        <div class="principles-grid">
          <div class="principle-card reveal">
            <div class="principle-num">01</div>
            <h3>Code Integrity & Ownership</h3>
            <p>We build production-ready systems without artificial vendor lock-in. Full source code ownership, migration scripts, and documentation belong to our clients.</p>
          </div>
          <div class="principle-card reveal">
            <div class="principle-num">02</div>
            <h3>Independent Quality Engineering</h3>
            <p>Software quality is validated by dedicated QA engineers operating independently from feature development teams to guarantee uncompromised test objectivity.</p>
          </div>
          <div class="principle-card reveal">
            <div class="principle-num">03</div>
            <h3>Security-First Architecture</h3>
            <p>We embed tokenized authentication, rate limiting, input sanitization, and security headers from day one rather than as expensive post-release additions.</p>
          </div>
          <div class="principle-card reveal">
            <div class="principle-num">04</div>
            <h3>Long-Term SLAs & Managed Care</h3>
            <p>We stand behind our code with structured service level agreements, maintenance, and continuous optimization so systems perform year after year.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Founder Capability Areas -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header text-center">
          <span class="badge badge-teal mb-2">Technical Foundations</span>
          <h2>Core Founder Capability Areas</h2>
          <p class="section-lead">Built upon three foundational pillars of modern software engineering.</p>
        </div>

        <div class="capabilities-grid">
          <div class="capability-box reveal">
            <div class="cap-icon">
              <span nz-icon nzType="laptop" nzTheme="outline"></span>
            </div>
            <h3>1. Frontend Engineering</h3>
            <p>Specialized in modern Single Page Applications (SPAs) and Server-Side Rendering (SSR) using Angular Standalone Architecture, RxJS, and Angular Signals. Focus on fast page load times, responsive SCSS layout design, and WCAG 2.1 AA accessibility compliance.</p>
          </div>
          <div class="capability-box reveal">
            <div class="cap-icon">
              <span nz-icon nzType="setting" nzTheme="outline"></span>
            </div>
            <h3>2. Backend Engineering</h3>
            <p>Architecting enterprise REST APIs and microservices with NestJS, TypeScript, and Prisma ORM on MySQL 8 databases. Experienced in local digital payment integrations (PayHere, LankaPay), JWT refresh token rotation, and structured logging.</p>
          </div>
          <div class="capability-box reveal">
            <div class="cap-icon">
              <span nz-icon nzType="safety-certificate" nzTheme="outline"></span>
            </div>
            <h3>3. Independent Quality Engineering</h3>
            <p>Delivering manual and automated testing, API vulnerability scanning, cross-browser verification, and load profiling. Ensuring software products withstand real-world operational stress before staging and deployment.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Base Location & International Delivery -->
    <section class="section section-dark">
      <div class="container">
        <div class="location-banner reveal">
          <div class="location-info">
            <span class="badge badge-teal mb-2">Strategic Delivery Location</span>
            <h2>Sri Lankan Base with International Capability</h2>
            <p>
              Headquartered at the World Trade Center in Colombo 01, Sri Lanka, our company combines deep regional business knowledge with international delivery standards. Sri Lanka offers an exceptional talent pool of English-fluent, highly educated software engineers with optimal timezone alignment for regional and global clients.
            </p>
            <div class="location-stats mt-4">
              <div class="stat-item">
                <span class="stat-icon"><span nz-icon nzType="bank" nzTheme="outline"></span></span>
                <div>
                  <span class="stat-val">Colombo 01</span>
                  <span class="stat-sub">WTC Headquarters</span>
                </div>
              </div>
              <div class="stat-item">
                <span class="stat-icon"><span nz-icon nzType="global" nzTheme="outline"></span></span>
                <div>
                  <span class="stat-val">GMT +5:30</span>
                  <span class="stat-sub">Timezone Alignment</span>
                </div>
              </div>
              <div class="stat-item">
                <span class="stat-icon"><span nz-icon nzType="sync" nzTheme="outline"></span></span>
                <div>
                  <span class="stat-val">Global</span>
                  <span class="stat-sub">Agile Delivery Standards</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Teaser -->
    <section class="section">
      <div class="container text-center reveal">
        <h2>Partner with an Engineering Team You Can Trust</h2>
        <p class="section-lead">Contact our team to discuss your software engineering, QA, or digital transformation goals.</p>
        <a routerLink="/contact" class="btn btn-primary mt-4">Schedule a Consultation →</a>
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

    /* min-width: 0 throughout — prevents intrinsic content (long copy,
       stat labels) from forcing grid/flex tracks wider than their share
       at any viewport size, not just narrow ones */
    .grid-2 {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 2rem;
    }
    .card-brand {
      min-width: 0;
      border-top: 4px solid var(--color-teal-dark);
      transition: transform 0.35s ease, box-shadow 0.35s ease;
    }
    .card-brand:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
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
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, color 0.35s ease;
    }
    .card-brand:hover .card-icon {
      transform: scale(1.1) rotate(-4deg);
      background: var(--color-teal-dark);
      color: #ffffff;
    }

    .section-header { margin-bottom: 3rem; }
    .section-lead { font-size: 1.125rem; max-width: 650px; margin: 0.5rem auto 0 auto; }

    .principles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 2rem;
    }
    .principle-card {
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      padding: 2rem;
      border-radius: var(--radius-lg);
      min-width: 0;
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;

      .principle-num {
        font-family: var(--font-family-heading);
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-teal-dark);
        margin-bottom: 0.5rem;
      }
    }
    .principle-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 12px 24px rgba(15, 23, 42, 0.08);
      border-color: var(--color-teal-accent);
    }

    .capabilities-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
    }
    .capability-box {
      background: var(--color-bg-surface);
      border: 1px solid var(--color-border);
      padding: 2rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-sm);
      min-width: 0;
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .capability-box:hover {
      transform: translateY(-6px);
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
      border-color: var(--color-navy-dark);
    }
    .cap-icon {
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
    .capability-box:hover .cap-icon {
      transform: scale(1.1) rotate(4deg);
      background: var(--color-navy-dark);
      color: #ffffff;
    }

    .location-banner {
      max-width: 900px;
    }
    .location-stats {
      display: flex;
      gap: 2.5rem;
      flex-wrap: wrap;
    }
    .stat-item {
      display: flex;
      align-items: center;
      gap: 0.875rem;
      min-width: 0;
    }
    .stat-icon {
      width: 44px;
      height: 44px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      background: rgba(255, 255, 255, 0.08);
      color: var(--color-teal-accent);
      font-size: 1.25rem;
    }
    .stat-val { font-size: 1.5rem; font-weight: 800; color: var(--color-teal-accent); display: block; overflow-wrap: break-word; }
    .stat-sub { font-size: 0.875rem; color: #94a3b8; overflow-wrap: break-word; }

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
    .grid-2 .reveal:nth-child(1) { transition-delay: 0ms; }
    .grid-2 .reveal:nth-child(2) { transition-delay: 100ms; }
    .principles-grid .reveal:nth-child(1) { transition-delay: 0ms; }
    .principles-grid .reveal:nth-child(2) { transition-delay: 80ms; }
    .principles-grid .reveal:nth-child(3) { transition-delay: 160ms; }
    .principles-grid .reveal:nth-child(4) { transition-delay: 240ms; }
    .capabilities-grid .reveal:nth-child(1) { transition-delay: 0ms; }
    .capabilities-grid .reveal:nth-child(2) { transition-delay: 100ms; }
    .capabilities-grid .reveal:nth-child(3) { transition-delay: 200ms; }

    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
      .pulse-dot { animation: none; }
    }

    /* ===== Responsive ===== */
    @media (max-width: 1024px) {
      .principles-grid,
      .capabilities-grid { gap: 1.5rem; }
    }

    @media (max-width: 900px) {
      .location-stats { gap: 1.75rem; }
    }

    @media (max-width: 767px) {
      .page-header { padding: 2.75rem 0; }
      .grid-2 { grid-template-columns: minmax(0, 1fr); gap: 1.5rem; }
      .section-header { margin-bottom: 2.25rem; }
      .card.card-brand,
      .principle-card,
      .capability-box { padding: 1.5rem; }
      .location-stats { flex-direction: column; gap: 1.25rem; }
    }

    @media (max-width: 480px) {
      .principles-grid,
      .capabilities-grid { grid-template-columns: 1fr; }
      .card-icon,
      .cap-icon { width: 48px; height: 48px; font-size: 1.375rem; }
      .stat-icon { width: 38px; height: 38px; font-size: 1.0625rem; }
      .stat-val { font-size: 1.25rem; }
    }
  `]
})
export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {
  private seo = inject(SeoService);
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  ngOnInit() {
    this.seo.updateMeta({
      title: 'About Us | Sri Lankan IT & Software Engineering Partner',
      description: 'Learn about Apex Software Engineering vision, founding capability areas, operating principles, and commitment to software quality.',
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