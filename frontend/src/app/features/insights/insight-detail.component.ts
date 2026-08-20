import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-insight-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <article *ngIf="post()" class="article-page">
      <header class="page-header">
        <div class="container container-narrow">
          <nav class="breadcrumb">
            <a routerLink="/">Home</a> / <a routerLink="/insights">Insights</a> / <span>{{ post()?.title }}</span>
          </nav>
          <div class="article-meta mt-3">
            <span class="badge badge-teal">{{ post()?.category?.name || 'Insight' }}</span>
            <span class="meta-date">{{ post()?.publishedAt | date:'mediumDate' }}</span>
            <span class="meta-read">• {{ post()?.readTimeMinutes }} min read</span>
          </div>
          <h1 class="mt-2">{{ post()?.title }}</h1>
          <p class="header-lead">{{ post()?.excerpt }}</p>
        </div>
      </header>

      <div class="container container-narrow section">
        <div class="article-body card" [innerHTML]="post()?.content"></div>

        <!-- Related Articles -->
        <div *ngIf="related().length > 0" class="related-box mt-5">
          <h3>Related Insights</h3>
          <div class="related-grid mt-3">
            <div *ngFor="let rel of related()" class="card related-card">
              <h4>{{ rel.title }}</h4>
              <p>{{ rel.excerpt }}</p>
              <a [routerLink]="['/insights', rel.slug]" class="btn-link">Read Article →</a>
            </div>
          </div>
        </div>
      </div>
    </article>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
      color: #ffffff;
      padding: 3.5rem 0;
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.25rem; }
    }
    .container-narrow { max-width: 800px; }
    .breadcrumb {
      font-size: 0.875rem;
      color: #94a3b8;
      a { color: var(--color-teal-accent); }
      span { color: #ffffff; }
    }
    .article-meta {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.875rem;
      color: #cbd5e1;
    }
    .article-body {
      font-size: 1.0625rem;
      line-height: 1.8;
      color: var(--color-charcoal);

      h3 { margin: 1.75rem 0 0.75rem 0; }
      p { margin-bottom: 1.25rem; }
      ul { margin-bottom: 1.25rem; padding-left: 1.5rem; }
      li { margin-bottom: 0.5rem; }
    }
    .related-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 1.5rem;
    }
    .btn-link { font-weight: 700; color: var(--color-teal-dark); margin-top: 0.5rem; display: inline-block; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-3 { margin-top: 0.75rem; }
    .mt-5 { margin-top: 3rem; }
  `]
})
export class InsightDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private seo = inject(SeoService);

  post = signal<any | null>(null);
  related = signal<any[]>([]);

  ngOnInit() {
    this.route.params.subscribe((params) => {
      const slug = params['slug'];
      if (slug) {
        this.loadArticle(slug);
      }
    });
  }

  private loadArticle(slug: string) {
    this.api.get<any>(`blog/${slug}`).subscribe({
      next: (res) => {
        this.post.set(res.post);
        this.related.set(res.related || []);
        this.seo.updateMeta({
          title: res.post.title,
          description: res.post.excerpt,
        });
      },
      error: () => this.post.set(this.getFallbackPost(slug)),
    });
  }

  private getFallbackPost(slug: string) {
    return {
      title: slug.replace(/-/g, ' ').toUpperCase(),
      excerpt: 'Technical insights on software architecture, quality engineering, and digital transformation.',
      content: '<p>Many established businesses in Sri Lanka rely heavily on legacy spreadsheets, physical paper ledgers, or disconnected software tools...</p>',
      authorName: 'Apex Engineering Team',
      publishedAt: new Date(),
      readTimeMinutes: 5,
    };
  }
}
