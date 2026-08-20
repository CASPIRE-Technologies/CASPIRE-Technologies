import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Company Blog</span>
        <h1>Blog</h1>
        <p class="header-lead">
          Practical articles on software modernization, search visibility, digital marketing, quality engineering, and secure cloud operations.
        </p>
      </div>
    </section>

    <!-- Search & Listing -->
    <section class="section">
      <div class="container">
        <!-- Search Bar -->
        <div class="search-box mb-4">
          <input 
            type="text" 
            [(ngModel)]="searchQuery" 
            (ngModelChange)="onSearchChange()" 
            placeholder="Search articles by title, keyword or topic..."
            class="search-input"
            aria-label="Search articles"
          />
        </div>

        <!-- Articles Grid -->
        <div class="articles-grid">
          <div *ngFor="let post of posts()" class="card article-card">
            <div class="article-meta">
              <span class="badge badge-navy">{{ post.category?.name || 'Blog' }}</span>
              <span class="read-time">{{ post.readTimeMinutes }} min read</span>
            </div>
            
            <h2>{{ post.title }}</h2>
            <p>{{ post.excerpt }}</p>

            <div class="card-footer mt-4">
              <span class="author">By {{ post.authorName }}</span>
              <a [routerLink]="['/blog', post.slug]" class="btn-read">Read Article →</a>
            </div>
          </div>
        </div>
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
    .search-box { max-width: 600px; }
    .search-input {
      width: 100%;
      padding: 0.875rem 1.25rem;
      font-size: 1rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-surface);
      color: var(--color-navy-dark);
      &:focus { border-color: var(--color-teal-accent); }
    }
    .articles-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }
    .article-card {
      display: flex;
      flex-direction: column;
      height: 100%;
      h2 { font-size: 1.35rem; margin: 0.75rem 0; }
    }
    .article-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.8125rem;
      color: var(--color-charcoal-muted);
    }
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: auto;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
      font-size: 0.875rem;
    }
    .author { font-weight: 600; color: var(--color-navy-dark); }
    .btn-read { font-weight: 700; color: var(--color-teal-dark); }
    .mb-2 { margin-bottom: 0.5rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .mt-4 { margin-top: 1rem; }
  `]
})
export class InsightsComponent implements OnInit {
  private seo = inject(SeoService);
  private api = inject(ApiService);

  posts = signal<any[]>([]);
  searchQuery = '';

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Blog | Software, SEO & Digital Marketing Articles',
      description: 'Read blog articles on software digitization, SEO, social media marketing, independent QA testing, digital payments, and cloud security.',
    });
    this.fetchPosts();
  }

  fetchPosts() {
    this.api.get<any[]>('blog', { search: this.searchQuery }).subscribe({
      next: (data) => this.posts.set(data),
      error: () => this.posts.set(this.getFallbackPosts()),
    });
  }

  onSearchChange() {
    this.fetchPosts();
  }

  private getFallbackPosts() {
    return [
      {
        slug: 'modernizing-legacy-systems-sri-lankan-smes',
        title: 'Modernizing Legacy Systems for Sri Lankan SMEs: A Practical Roadmap',
        excerpt: 'How growing business enterprises can replace error-prone manual spreadsheets with secure, scalable custom web applications.',
        category: { name: 'SME Digitization' },
        readTimeMinutes: 5,
        authorName: 'Apex Engineering Team',
      },
      {
        slug: 'why-independent-qa-saves-maintenance-costs',
        title: 'Why Independent Quality Engineering Saves 40% of Software Maintenance Costs',
        excerpt: 'Discover why separating software development from testing prevents production failures and reduces emergency code hotfixes.',
        category: { name: 'Quality Engineering' },
        readTimeMinutes: 6,
        authorName: 'Apex QA Practice Lead',
      },
      {
        slug: 'securing-digital-payments-for-south-asian-e-commerce',
        title: 'Securing Digital Payments & Compliance for South Asian E-Commerce',
        excerpt: 'Best practices for integrating PayHere, LankaPay, and international payment gateways with secure backend security tokenization.',
        category: { name: 'Cloud & Security' },
        readTimeMinutes: 4,
        authorName: 'Apex Security Team',
      },
    ];
  }
}
