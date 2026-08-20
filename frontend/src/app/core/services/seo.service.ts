import { Injectable, inject, PLATFORM_ID } from '@angular/core';
import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Title, Meta } from '@angular/platform-browser';
import { siteContent } from '../../site-content';

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

  private defaultTitle = siteContent.seo.defaultTitle;
  private defaultDesc = siteContent.seo.defaultDescription;

  updateMeta(config: SeoConfig) {
    const title = config.title ? `${config.title} | ${siteContent.brand.name}` : this.defaultTitle;
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
      'name': siteContent.brand.legalName,
      'url': siteContent.seo.siteUrl,
      'logo': `${siteContent.seo.siteUrl}${siteContent.brand.logo.src}`,
      'description': siteContent.seo.organizationDescription,
      'address': {
        '@type': 'PostalAddress',
        'streetAddress': siteContent.contact.address.street,
        'addressLocality': siteContent.contact.address.locality,
        'addressRegion': siteContent.contact.address.region,
        'addressCountry': siteContent.contact.address.country
      },
      'contactPoint': {
        '@type': 'ContactPoint',
        'telephone': siteContent.contact.telephone.schemaValue,
        'contactType': 'customer service',
        'email': siteContent.contact.email.value
      },
      'sameAs': [
        siteContent.contact.linkedin.href
      ]
    };
  }
}
