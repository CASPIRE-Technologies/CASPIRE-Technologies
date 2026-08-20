import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CookieConsentService } from '../../../core/services/cookie.service';

@Component({
  selector: 'app-cookie-banner',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div *ngIf="cookieService.consentStatus() === 'pending'" class="cookie-banner" role="region" aria-label="Cookie Preferences">
      <div class="container banner-container">
        <div class="banner-text">
          <p>
            <strong>Cookie & Privacy Notice:</strong> We use essential cookies to operate our platform securely. Non-essential performance and analytics cookies are disabled by default. Read our 
            <a routerLink="/cookie-policy">Cookie Policy</a> and <a routerLink="/privacy-policy">Privacy Policy</a>.
          </p>
        </div>
        <div class="banner-actions">
          <button (click)="cookieService.declineCookies()" class="btn btn-secondary btn-sm">Decline Non-Essential</button>
          <button (click)="cookieService.acceptCookies()" class="btn btn-primary btn-sm">Accept All</button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .cookie-banner {
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1000;
      background-color: var(--color-navy-dark);
      color: #ffffff;
      padding: 1rem 0;
      border-top: 2px solid var(--color-teal-accent);
      box-shadow: var(--shadow-xl);
    }
    .banner-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 1.5rem;
      flex-wrap: wrap;
    }
    .banner-text {
      flex: 1;
      font-size: 0.875rem;
      p { margin: 0; color: #cbd5e1; }
      a { color: var(--color-teal-accent); text-decoration: underline; }
    }
    .banner-actions {
      display: flex;
      gap: 0.75rem;
    }
    .btn-sm {
      padding: 0.4rem 1rem;
      font-size: 0.8125rem;
    }
  `]
})
export class CookieBannerComponent {
  cookieService = inject(CookieConsentService);
}
