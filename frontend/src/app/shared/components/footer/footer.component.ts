import { Component, AfterViewInit, OnDestroy, ElementRef, inject, signal, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { siteContent } from '../../../site-content';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink, NzIconModule],
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-grid">
        <!-- Brand Summary Column -->
        <div class="footer-col brand-col reveal">
          <div class="brand-logo">
            <img class="logo-image" [src]="content.brand.logo.src" [alt]="content.brand.logo.alt" />
            <span class="brand-name">{{ content.brand.name }}</span>
          </div>
          <p class="brand-desc">
            An end-to-end software engineering and digital transformation partner delivering secure, reliable and scalable business solutions for Sri Lankan enterprises and international clients.
          </p>
          <div class="contact-meta">
            <div class="meta-item">
              <span class="meta-icon"><span nz-icon nzType="environment" nzTheme="outline"></span></span>
              <span>{{ content.contact.address.full }}</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon"><span nz-icon nzType="mail" nzTheme="outline"></span></span>
              <a [href]="content.contact.email.href">{{ content.contact.email.value }}</a>
            </div>
            <div class="meta-item">
              <span class="meta-icon"><span nz-icon nzType="phone" nzTheme="outline"></span></span>
              <a [href]="content.contact.telephone.href">{{ content.contact.telephone.value }}</a>
            </div>
          </div>
        </div>

        <!-- Services Column -->
        <div class="footer-col reveal">
          <h4 class="col-title">Primary Services</h4>
          <ul class="footer-links">
            <li><a routerLink="/services/custom-web-applications">Custom Web Applications</a></li>
            <li><a routerLink="/services/sme-digital-transformation">SME Workflow Digitization</a></li>
            <li><a routerLink="/services/backend-api-development">Backend & API Development</a></li>
            <li><a routerLink="/services/qa-and-test-automation">QA & Test Automation</a></li>
            <li><a routerLink="/services/cloud-deployment-devops">Cloud Deployment & DevOps</a></li>
            <li><a routerLink="/services/seo">SEO</a></li>
            <li><a routerLink="/services/social-media-marketing">Social Media Marketing</a></li>
          </ul>
        </div>

        <!-- Industry Solutions Column -->
        <div class="footer-col reveal">
          <h4 class="col-title">Industries</h4>
          <ul class="footer-links">
            <li><a routerLink="/industries/construction-engineering">Construction & Engineering</a></li>
            <li><a routerLink="/industries/tourism-hospitality">Tourism & Hospitality</a></li>
            <li><a routerLink="/industries/education-training">Education & Training</a></li>
            <li><a routerLink="/industries/retail-distribution">Retail & Distribution</a></li>
            <li><a routerLink="/industries/startups-digital-agencies">Startups & Digital Agencies</a></li>
          </ul>
        </div>

        <!-- Quick Links & Contact -->
        <div class="footer-col reveal">
          <h4 class="col-title">Company</h4>
          <ul class="footer-links">
            <li><a routerLink="/about">About Us</a></li>
            <li><a routerLink="/solutions">Solution Concepts</a></li>
            <li><a routerLink="/delivery-process">Delivery Process</a></li>
            <li><a routerLink="/portfolio">Case Studies</a></li>
            <li><a routerLink="/blog">Blog</a></li>
            <li><a routerLink="/contact">Contact Consultation</a></li>
          </ul>

          <div class="social-actions mt-4">
            <a [href]="content.contact.linkedin.href" target="_blank" rel="noopener" class="social-btn">
              <span nz-icon nzType="linkedin" nzTheme="fill"></span> LinkedIn
            </a>
            <a [href]="content.contact.whatsapp.href" target="_blank" rel="noopener" class="social-btn whatsapp-btn">
              <svg class="whatsapp-icon" viewBox="0 0 32 32" width="16" height="16" fill="currentColor" aria-hidden="true">
                <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.42.68 4.68 1.86 6.6L3 29l7.09-2.31A12.44 12.44 0 0 0 16 28.5C22.905 28.5 28.5 22.904 28.5 16S22.905 3 16.001 3zm0 22.7c-1.98 0-3.86-.53-5.48-1.46l-.39-.23-4.21 1.37 1.38-4.1-.25-.42a10.17 10.17 0 0 1-1.55-5.36c0-5.64 4.59-10.23 10.23-10.23 5.64 0 10.23 4.59 10.23 10.23 0 5.64-4.59 10.2-10.23 10.2zm5.61-7.66c-.31-.15-1.83-.9-2.11-1.01-.28-.1-.49-.15-.69.15-.2.31-.79 1.01-.97 1.22-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.53-1.83-1.72-2.14-.18-.31-.02-.47.13-.62.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.67-.95-2.28-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.54.08-.82.38-.28.31-1.08 1.05-1.08 2.57s1.1 2.98 1.26 3.19c.15.2 2.16 3.31 5.24 4.64.73.32 1.3.5 1.75.64.73.23 1.4.2 1.93.12.59-.09 1.83-.75 2.09-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36z"/>
              </svg>
              WhatsApp Us
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container bottom-container">
          <p>&copy; {{ currentYear }} {{ content.brand.legalName }}. All rights reserved.</p>
          <div class="legal-links">
            <a routerLink="/privacy-policy">Privacy Policy</a>
            <a routerLink="/cookie-policy">Cookie Policy</a>
            <a routerLink="/terms-of-service">Terms of Service</a>
            <a routerLink="/admin/login" class="admin-link">Admin Portal</a>
          </div>
        </div>
      </div>

      <!-- Back to top -->
      <button
        class="back-to-top"
        [class.visible]="showBackToTop()"
        (click)="scrollToTop()"
        aria-label="Back to top">
        <span nz-icon nzType="arrow-up" nzTheme="outline"></span>
      </button>
    </footer>
  `,
  styles: [`
    .site-footer {
      position: relative;
      background-color: var(--color-navy-dark);
      color: #e2e8f0;
      padding-top: 4rem;
      border-top: 4px solid var(--color-teal-dark);
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 2fr 1fr 1fr 1fr;
      gap: 3rem;
      padding-bottom: 4rem;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .logo-image {
      width: 36px;
      height: 36px;
      object-fit: contain;
      border-radius: var(--radius-sm);
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .brand-logo:hover .logo-image {
      transform: scale(1.08) rotate(-4deg);
    }
    .brand-name {
      font-family: var(--font-family-heading);
      font-weight: 800;
      color: #ffffff;
      font-size: 1.125rem;
    }
    .brand-desc {
      color: #94a3b8;
      font-size: 0.9375rem;
      margin-bottom: 1.5rem;
    }
    .contact-meta {
      display: flex;
      flex-direction: column;
      gap: 0.875rem;
      font-size: 0.875rem;
      color: #cbd5e1;

      a { color: var(--color-teal-accent); transition: color var(--transition-fast); }
      a:hover { color: #ffffff; }
    }
    .meta-item {
      display: flex;
      align-items: flex-start;
      gap: 0.625rem;
    }
    .meta-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px;
      height: 30px;
      flex-shrink: 0;
      border-radius: var(--radius-sm);
      background: rgba(255, 255, 255, 0.06);
      color: var(--color-teal-accent);
      font-size: 0.9375rem;
      transition: background 0.3s ease, transform 0.3s ease;
    }
    .meta-item:hover .meta-icon {
      background: var(--color-teal-dark);
      transform: scale(1.08);
    }
    .col-title {
      color: #ffffff;
      font-size: 1.125rem;
      font-weight: 700;
      margin-bottom: 1.25rem;
    }
    .footer-links {
      list-style: none;
      display: flex;
      flex-direction: column;
      gap: 0.75rem;

      a {
        position: relative;
        display: inline-block;
        color: #94a3b8;
        font-size: 0.9375rem;
        transition: color var(--transition-fast), transform 0.25s ease;
      }

      a:hover {
        color: var(--color-teal-accent);
        transform: translateX(4px);
      }
    }
    .social-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .social-btn {
      display: inline-flex;
      align-items: center;
      gap: 0.375rem;
      padding: 0.4rem 0.875rem;
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      font-size: 0.8125rem;
      border-radius: var(--radius-sm);
      font-weight: 600;
      transition: background-color 0.25s ease, transform 0.25s ease;

      &:hover {
        background-color: var(--color-teal-dark);
        transform: translateY(-2px);
      }
    }
    .whatsapp-btn {
      background-color: #25d366;
      color: #ffffff;
      &:hover { background-color: #128c7e; }
    }
    .whatsapp-icon { display: block; }
    .footer-bottom {
      background-color: #070f1e;
      padding: 1.5rem 0;
      border-top: 1px solid rgba(255, 255, 255, 0.08);
      font-size: 0.875rem;
      color: #64748b;
    }
    .bottom-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .legal-links {
      display: flex;
      gap: 1.5rem;

      a {
        color: #94a3b8;
        transition: color var(--transition-fast);
        &:hover { color: #ffffff; }
      }
    }
    .admin-link {
      color: var(--color-teal-accent) !important;
      font-weight: 600;
    }
    .mt-4 { margin-top: 1rem; }

    /* Scroll reveal, matching home page pattern */
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .footer-grid .reveal:nth-child(1) { transition-delay: 0ms; }
    .footer-grid .reveal:nth-child(2) { transition-delay: 90ms; }
    .footer-grid .reveal:nth-child(3) { transition-delay: 180ms; }
    .footer-grid .reveal:nth-child(4) { transition-delay: 270ms; }

    /* Back to top */
    .back-to-top {
      position: absolute;
      right: 1.5rem;
      bottom: 2rem;
      width: 44px;
      height: 44px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 50%;
      background: var(--color-teal-accent);
      color: #ffffff;
      border: none;
      font-size: 1.125rem;
      cursor: pointer;
      opacity: 0;
      transform: translateY(12px);
      pointer-events: none;
      transition: opacity 0.3s ease, transform 0.3s ease, background 0.25s ease;
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    }
    .back-to-top.visible {
      opacity: 1;
      transform: translateY(0);
      pointer-events: auto;
    }
    .back-to-top:hover {
      background: var(--color-teal-dark);
    }

    @media (prefers-reduced-motion: reduce) {
      .reveal, .logo-image, .footer-links a, .social-btn, .back-to-top, .meta-icon {
        transition: none !important;
      }
      .reveal { opacity: 1; transform: none; }
    }

    @media (max-width: 900px) {
      .footer-grid {
        grid-template-columns: 1fr 1fr;
      }
    }
    @media (max-width: 600px) {
      .footer-grid {
        grid-template-columns: 1fr;
      }
      .bottom-container {
        flex-direction: column;
        text-align: center;
      }
      .back-to-top {
        right: 1rem;
        bottom: 1.5rem;
      }
    }
  `]
})
export class FooterComponent implements AfterViewInit, OnDestroy {
  content = siteContent;
  currentYear = new Date().getFullYear();
  showBackToTop = signal(false);

  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

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

  @HostListener('window:scroll')
  onScroll() {
    this.showBackToTop.set(window.scrollY > 480);
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}