import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <footer class="site-footer" role="contentinfo">
      <div class="container footer-grid">
        <!-- Brand Summary Column -->
        <div class="footer-col brand-col">
          <div class="brand-logo">
            <div class="logo-mark">A</div>
            <span class="brand-name">APEX SOFTWARE ENGINEERING</span>
          </div>
          <p class="brand-desc">
            An end-to-end software engineering and digital transformation partner delivering secure, reliable and scalable business solutions for Sri Lankan enterprises and international clients.
          </p>
          <div class="contact-meta">
            <div class="meta-item">
              <span class="meta-icon">📍</span>
              <span>Level 12, West Tower, World Trade Center, Colombo 01, Sri Lanka</span>
            </div>
            <div class="meta-item">
              <span class="meta-icon">✉️</span>
              <a href="mailto:contact@apexsoftware.lk">contact&#64;apexsoftware.lk</a>
            </div>
            <div class="meta-item">
              <span class="meta-icon">📞</span>
              <a href="tel:+94112345678">+94 11 234 5678</a>
            </div>
          </div>
        </div>

        <!-- Services Column -->
        <div class="footer-col">
          <h4 class="col-title">Primary Services</h4>
          <ul class="footer-links">
            <li><a routerLink="/services/custom-web-applications">Custom Web Applications</a></li>
            <li><a routerLink="/services/sme-digital-transformation">SME Workflow Digitization</a></li>
            <li><a routerLink="/services/backend-api-development">Backend & API Development</a></li>
            <li><a routerLink="/services/qa-and-test-automation">QA & Test Automation</a></li>
            <li><a routerLink="/services/cloud-deployment-devops">Cloud Deployment & DevOps</a></li>
            <li><a routerLink="/services/dedicated-engineering-teams">Dedicated Engineering Teams</a></li>
          </ul>
        </div>

        <!-- Industry Solutions Column -->
        <div class="footer-col">
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
        <div class="footer-col">
          <h4 class="col-title">Company</h4>
          <ul class="footer-links">
            <li><a routerLink="/about">About Us</a></li>
            <li><a routerLink="/solutions">Solution Concepts</a></li>
            <li><a routerLink="/delivery-process">Delivery Process</a></li>
            <li><a routerLink="/portfolio">Case Studies</a></li>
            <li><a routerLink="/insights">Insights & Blog</a></li>
            <li><a routerLink="/contact">Contact Consultation</a></li>
          </ul>
          
          <div class="social-actions mt-4">
            <a href="https://www.linkedin.com/company/apex-software-lk" target="_blank" rel="noopener" class="social-btn">LinkedIn</a>
            <a href="https://wa.me/94771234567" target="_blank" rel="noopener" class="social-btn whatsapp-btn">WhatsApp Us</a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container bottom-container">
          <p>&copy; {{ currentYear }} Apex Software Engineering (Pvt) Ltd. All rights reserved.</p>
          <div class="legal-links">
            <a routerLink="/privacy-policy">Privacy Policy</a>
            <a routerLink="/cookie-policy">Cookie Policy</a>
            <a routerLink="/terms-of-service">Terms of Service</a>
            <a routerLink="/admin/login" class="admin-link">Admin Portal</a>
          </div>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-footer {
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
    .logo-mark {
      width: 36px;
      height: 36px;
      background: var(--color-teal-dark);
      color: #ffffff;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
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
      gap: 0.75rem;
      font-size: 0.875rem;
      color: #cbd5e1;

      a { color: var(--color-teal-accent); }
    }
    .meta-item {
      display: flex;
      align-items: flex-start;
      gap: 0.5rem;
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
        color: #94a3b8;
        font-size: 0.9375rem;
        transition: color var(--transition-fast);

        &:hover { color: var(--color-teal-accent); }
      }
    }
    .social-actions {
      display: flex;
      gap: 0.5rem;
      flex-wrap: wrap;
    }
    .social-btn {
      padding: 0.4rem 0.875rem;
      background-color: rgba(255, 255, 255, 0.1);
      color: #ffffff;
      font-size: 0.8125rem;
      border-radius: var(--radius-sm);
      font-weight: 600;

      &:hover { background-color: var(--color-teal-dark); }
    }
    .whatsapp-btn {
      background-color: #25d366;
      color: #ffffff;
      &:hover { background-color: #128c7e; }
    }
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
        &:hover { color: #ffffff; }
      }
    }
    .admin-link {
      color: var(--color-teal-accent) !important;
      font-weight: 600;
    }
    .mt-4 { margin-top: 1rem; }

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
    }
  `]
})
export class FooterComponent {
  currentYear = new Date().getFullYear();
}
