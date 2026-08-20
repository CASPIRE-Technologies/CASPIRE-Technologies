import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';

export interface SeoConfig {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  schema?: any;
}

@Injectable({
  providedIn: 'root',
})
export class SeoService {
  private titleService = inject(Title);
  private metaService = inject(Meta);
  private doc = inject(DOCUMENT, { optional: true });
  private platformId = inject(PLATFORM_ID);

  private defaultTitle = 'Apex Software Engineering | Sri Lankan IT & Digital Transformation Partner';
  private defaultDesc = 'An end-to-end software engineering and digital transformation partner delivering secure, reliable and scalable business solutions for Sri Lankan enterprises and international clients.';

  updateMeta(config: SeoConfig) {
    const title = config.title ? `${config.title} | Apex Software Engineering` : this.defaultTitle;
    const description = config.description || this.defaultDesc;

    this.titleService.setTitle(title);

    // Standard Meta
    this.metaService.updateTag({ name: 'description', content: description });
    if (config.keywords) {
      this.metaService.updateTag({ name: 'keywords', content: config.keywords });
    }

    // Open Graph
    this.metaService.updateTag({ property: 'og:title', content: title });
    this.metaService.updateTag({ property: 'og:description', content: description });
    if (config.ogUrl) {
      this.metaService.updateTag({ property: 'og:url', content: config.ogUrl });
    }

    // Twitter Card
    this.metaService.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.metaService.updateTag({ name: 'twitter:title', content: title });
    this.metaService.updateTag({ name: 'twitter:description', content: description });

    // Schema.org Structured Data
    if (config.schema) {
      this.injectSchema(config.schema);
    } else {
      this.injectSchema(this.getDefaultOrganizationSchema());
    }
  }

  private injectSchema(schema: any) {
    if (!isPlatformBrowser(this.platformId) || !this.doc) return;

    let script = this.doc.getElementById('json-ld-schema') as HTMLScriptElement;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'json-ld-schema';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.text = JSON.stringify(schema);
  }

  public getDefaultOrganizationSchema() {
    return {
      '@context': 'https://schema.org',
      '@type': 'ITSoftwareCompany',
      'name': 'Apex Software Engineering (Pvt) Ltd',
      'url': 'https://www.apexsoftware.lk',
      'logo': 'https://www.apexsoftware.lk/assets/logo.svg',
      'description': 'End-to-end software engineering and digital transformation partner in Sri Lanka.',
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': 'Level 12, West Tower, World Trade Center',
        'addressLocality': 'Colombo 01',
        'addressRegion': 'Western Province',
        'addressCountry': 'LK'
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': '+94-11-234-5678',
        'contactType': 'customer service',
        'email': 'contact@apexsoftware.lk'
      },
      'sameAs': [
        'https://www.linkedin.com/company/apex-software-lk'
      ]
    };
  }
}
