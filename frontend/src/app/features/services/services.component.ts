import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <!-- Page Header -->
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Primary Services</span>
        <h1>Software Engineering & Services Catalog</h1>
        <p class="header-lead">
          Comprehensive digital capability spanning custom application development, quality engineering, backend APIs, and dedicated team extension.
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section">
      <div class="container">
        <div class="services-list-grid">
          <div *ngFor="let s of services()" class="card service-card-detailed">
            <div class="card-icon">{{ getIcon(s.icon) }}</div>
            <div class="card-body">
              <h2>{{ s.title }}</h2>
              <p class="short-desc">{{ s.shortDesc }}</p>
              
              <div class="problem-preview">
                <strong>Target Challenge:</strong> {{ s.customerProblem }}
              </div>

              <div class="card-actions mt-4">
                <a [routerLink]="['/services', s.slug]" class="btn btn-primary btn-sm">Explore Service Details →</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Consultation Banner -->
    <section class="section section-alt text-center">
      <div class="container">
        <h2>Unsure which service matches your exact requirement?</h2>
        <p class="section-lead">Schedule a discovery call with our technical architect to assess your project requirements.</p>
        <a routerLink="/contact" class="btn btn-primary mt-4">Request a Free Technical Assessment →</a>
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
    .services-list-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(340px, 1fr));
      gap: 2rem;
    }
    .service-card-detailed {
      display: flex;
      flex-direction: column;
      height: 100%;
    }
    .card-icon { font-size: 2.5rem; margin-bottom: 1rem; }
    .short-desc { color: var(--color-charcoal-muted); margin-bottom: 1.25rem; }
    .problem-preview {
      background-color: var(--color-bg-surface-elevated);
      padding: 0.875rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
      color: var(--color-charcoal);
      border-left: 3px solid var(--color-teal-dark);
      margin-top: auto;
    }
    .btn-sm { padding: 0.5rem 1.25rem; font-size: 0.875rem; }
    .text-center { text-align: center; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-4 { margin-top: 1rem; }
  `]
})
export class ServicesComponent implements OnInit {
  private seo = inject(SeoService);
  private api = inject(ApiService);

  services = signal<any[]>([]);

  ngOnInit() {
    this.seo.updateMeta({
      title: 'IT & Software Engineering Services',
      description: 'Explore custom web applications, SME digitization, backend APIs, QA testing, DevOps, and dedicated Sri Lankan engineering teams.',
    });

    this.api.get<any[]>('services').subscribe({
      next: (data) => this.services.set(data),
      error: () => this.services.set(this.getFallbackServices()),
    });
  }

  getIcon(icon: string): string {
    const map: Record<string, string> = {
      code: '💻', cpu: '⚡', server: '⚙️', 'shield-check': '🛡️', cloud: '☁️', users: '👥',
    };
    return map[icon] || '🚀';
  }

  private getFallbackServices() {
    return [
      { slug: 'custom-web-applications', title: 'Custom Web Applications', icon: 'code', shortDesc: 'Tailor-made web applications designed for high performance, enterprise security, and long-term scalability.', customerProblem: 'Off-the-shelf software forces businesses into rigid workflows.' },
      { slug: 'sme-digital-transformation', title: 'SME Workflow Digitization', icon: 'cpu', shortDesc: 'Automate manual paper processes, eliminate spreadsheet errors, and digitize core business operations.', customerProblem: 'Fragmented spreadsheets cause data errors and lost records.' },
      { slug: 'backend-api-development', title: 'Backend & API Development', icon: 'server', shortDesc: 'Robust RESTful and GraphQL APIs, microservices architecture, and secure enterprise integration layers.', customerProblem: 'Legacy APIs crash under peak concurrency.' },
      { slug: 'qa-and-test-automation', title: 'QA & Test Automation', icon: 'shield-check', shortDesc: 'Independent quality engineering, automated regression testing, performance profiling, and security testing.', customerProblem: 'Releasing unverified software damages brand trust.' },
      { slug: 'cloud-deployment-devops', title: 'Cloud Deployment & DevOps', icon: 'cloud', shortDesc: 'Automated CI/CD pipelines, Docker containerization, cloud infrastructure management, and monitoring.', customerProblem: 'Manual server deployments are error-prone.' },
      { slug: 'dedicated-engineering-teams', title: 'Dedicated Engineering Teams', icon: 'users', shortDesc: 'Extend your product team with dedicated Sri Lankan frontend, backend, and QA software engineers.', customerProblem: 'High local developer hiring costs in international markets.' },
    ];
  }
}
