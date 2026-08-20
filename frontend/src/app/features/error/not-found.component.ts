import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <section class="section section-alt not-found-section text-center">
      <div class="container container-narrow">
        <div class="error-code">404</div>
        <h1>Page Not Found</h1>
        <p class="section-lead">
          The page or resource you are looking for has been moved, renamed, or is temporarily unavailable.
        </p>

        <div class="quick-links mt-4">
          <a routerLink="/" class="btn btn-primary">Return to Homepage</a>
          <a routerLink="/services" class="btn btn-secondary">Explore Services</a>
          <a routerLink="/contact" class="btn btn-secondary">Contact Consultation</a>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .not-found-section {
      padding: 6rem 0;
    }
    .error-code {
      font-family: var(--font-family-heading);
      font-size: 6rem;
      font-weight: 800;
      color: var(--color-teal-dark);
      line-height: 1;
    }
    .container-narrow { max-width: 600px; margin: 0 auto; }
    .quick-links {
      display: flex;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }
    .text-center { text-align: center; }
    .mt-4 { margin-top: 1.5rem; }
  `]
})
export class NotFoundComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.updateMeta({
      title: '404 - Page Not Found',
      description: 'The requested page could not be found on Apex Software Engineering website.',
    });
  }
}
