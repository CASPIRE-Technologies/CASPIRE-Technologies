import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Company Overview</span>
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
          <div class="card card-brand">
            <div class="card-icon">🎯</div>
            <h2>Our Mission</h2>
            <p>
              To engineer secure, reliable, and scalable software solutions that eliminate operational friction for Sri Lankan enterprises and provide world-class outsourced engineering teams for global digital innovators.
            </p>
          </div>
          <div class="card card-brand">
            <div class="card-icon">🌟</div>
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
          <div class="principle-card">
            <div class="principle-num">01</div>
            <h3>Code Integrity & Ownership</h3>
            <p>We build production-ready systems without artificial vendor lock-in. Full source code ownership, migration scripts, and documentation belong to our clients.</p>
          </div>
          <div class="principle-card">
            <div class="principle-num">02</div>
            <h3>Independent Quality Engineering</h3>
            <p>Software quality is validated by dedicated QA engineers operating independently from feature development teams to guarantee uncompromised test objectivity.</p>
          </div>
          <div class="principle-card">
            <div class="principle-num">03</div>
            <h3>Security-First Architecture</h3>
            <p>We embed tokenized authentication, rate limiting, input sanitization, and security headers from day one rather than as expensive post-release additions.</p>
          </div>
          <div class="principle-card">
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
          <div class="capability-box">
            <div class="cap-icon">💻</div>
            <h3>1. Frontend Engineering</h3>
            <p>Specialized in modern Single Page Applications (SPAs) and Server-Side Rendering (SSR) using Angular Standalone Architecture, RxJS, and Angular Signals. Focus on fast page load times, responsive SCSS layout design, and WCAG 2.1 AA accessibility compliance.</p>
          </div>
          <div class="capability-box">
            <div class="cap-icon">⚙️</div>
            <h3>2. Backend Engineering</h3>
            <p>Architecting enterprise REST APIs and microservices with NestJS, TypeScript, and Prisma ORM on MySQL 8 databases. Experienced in local digital payment integrations (PayHere, LankaPay), JWT refresh token rotation, and structured logging.</p>
          </div>
          <div class="capability-box">
            <div class="cap-icon">🛡️</div>
            <h3>3. Independent Quality Engineering</h3>
            <p>Delivering manual and automated testing, API vulnerability scanning, cross-browser verification, and load profiling. Ensuring software products withstand real-world operational stress before staging and deployment.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Base Location & International Delivery -->
    <section class="section section-dark">
      <div class="container">
        <div class="location-banner">
          <div class="location-info">
            <span class="badge badge-teal mb-2">Strategic Delivery Location</span>
            <h2>Sri Lankan Base with International Capability</h2>
            <p>
              Headquartered at the World Trade Center in Colombo 01, Sri Lanka, our company combines deep regional business knowledge with international delivery standards. Sri Lanka offers an exceptional talent pool of English-fluent, highly educated software engineers with optimal timezone alignment for regional and global clients.
            </p>
            <div class="location-stats mt-4">
              <div class="stat-item">
                <span class="stat-val">Colombo 01</span>
                <span class="stat-sub">WTC Headquarters</span>
              </div>
              <div class="stat-item">
                <span class="stat-val">GMT +5:30</span>
                <span class="stat-sub">Timezone Alignment</span>
              </div>
              <div class="stat-item">
                <span class="stat-val">Global</span>
                <span class="stat-sub">Agile Delivery Standards</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Teaser -->
    <section class="section">
      <div class="container text-center">
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
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.25rem; max-width: 700px; }
    }
    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; }
    .card-brand { border-top: 4px solid var(--color-teal-dark); }
    .card-icon { font-size: 2.5rem; margin-bottom: 1rem; }

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

      .principle-num {
        font-family: var(--font-family-heading);
        font-size: 1.5rem;
        font-weight: 800;
        color: var(--color-teal-dark);
        margin-bottom: 0.5rem;
      }
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
    }
    .cap-icon { font-size: 2.25rem; margin-bottom: 1rem; }

    .location-banner {
      max-width: 900px;
    }
    .location-stats {
      display: flex;
      gap: 3rem;
      flex-wrap: wrap;
    }
    .stat-val { font-size: 1.5rem; font-weight: 800; color: var(--color-teal-accent); display: block; }
    .stat-sub { font-size: 0.875rem; color: #94a3b8; }

    .text-center { text-align: center; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-4 { margin-top: 1rem; }

    @media (max-width: 768px) {
      .grid-2 { grid-template-columns: 1fr; }
    }
  `]
})
export class AboutComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'About Us | Sri Lankan IT & Software Engineering Partner',
      description: 'Learn about Apex Software Engineering vision, founding capability areas, operating principles, and commitment to software quality.',
    });
  }
}
