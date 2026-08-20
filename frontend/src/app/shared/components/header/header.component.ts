import { Component, signal, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header" role="banner">
      <div class="container header-container">
        <!-- Brand Logo -->
        <a routerLink="/" class="brand-logo" aria-label="Apex Software Engineering Homepage">
          <div class="logo-mark">A</div>
          <div class="logo-text">
            <span class="brand-name">APEX</span>
            <span class="brand-tagline">SOFTWARE ENGINEERING</span>
          </div>
        </a>

        <!-- Desktop Navigation -->
        <nav class="desktop-nav" role="navigation" aria-label="Main Navigation">
          <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
          <a routerLink="/services" routerLinkActive="active">Services</a>
          <a routerLink="/industries" routerLinkActive="active">Industries</a>
          <a routerLink="/solutions" routerLinkActive="active">Solutions</a>
          <a routerLink="/delivery-process" routerLinkActive="active">Delivery Process</a>
          <a routerLink="/portfolio" routerLinkActive="active">Portfolio</a>
          <a routerLink="/about" routerLinkActive="active">About Us</a>
          <a routerLink="/insights" routerLinkActive="active">Insights</a>
        </nav>

        <!-- CTA Action Buttons -->
        <div class="header-actions">
          <a routerLink="/contact" class="btn btn-primary btn-sm">Request Consultation</a>
          <button 
            class="mobile-menu-btn" 
            (click)="toggleMenu()" 
            [attr.aria-expanded]="isMenuOpen()"
            aria-label="Toggle Navigation Menu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path *ngIf="!isMenuOpen()" d="M4 6h16M4 12h16M4 18h16"/>
              <path *ngIf="isMenuOpen()" d="M18 6L6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </div>

      <!-- Mobile Navigation Drawer -->
      <div class="mobile-drawer" [class.open]="isMenuOpen()" role="dialog" aria-modal="true" aria-label="Mobile Menu">
        <nav class="mobile-nav">
          <a routerLink="/" (click)="closeMenu()">Home</a>
          <a routerLink="/services" (click)="closeMenu()">Services</a>
          <a routerLink="/industries" (click)="closeMenu()">Industries</a>
          <a routerLink="/solutions" (click)="closeMenu()">Solutions</a>
          <a routerLink="/delivery-process" (click)="closeMenu()">Delivery Process</a>
          <a routerLink="/portfolio" (click)="closeMenu()">Portfolio</a>
          <a routerLink="/about" (click)="closeMenu()">About Us</a>
          <a routerLink="/insights" (click)="closeMenu()">Insights</a>
          <a routerLink="/contact" class="btn btn-primary w-full mt-4" (click)="closeMenu()">Request Consultation</a>
        </nav>
      </div>
    </header>
  `,
  styles: [`
    .site-header {
      position: sticky;
      top: 0;
      z-index: 100;
      background-color: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(8px);
      border-bottom: 1px solid var(--color-border);
      height: 72px;
      display: flex;
      align-items: center;
    }
    .header-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
    }
    .brand-logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      text-decoration: none;
    }
    .logo-mark {
      width: 40px;
      height: 40px;
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-teal-dark));
      color: #ffffff;
      font-family: var(--font-family-heading);
      font-weight: 800;
      font-size: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      box-shadow: 0 2px 8px rgba(0, 119, 182, 0.3);
    }
    .logo-text {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-family: var(--font-family-heading);
      font-weight: 800;
      font-size: 1.25rem;
      color: var(--color-navy-dark);
      line-height: 1;
      letter-spacing: 0.05em;
    }
    .brand-tagline {
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--color-teal-dark);
      letter-spacing: 0.1em;
      margin-top: 2px;
    }
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 1.75rem;

      a {
        font-family: var(--font-family-heading);
        font-weight: 600;
        font-size: 0.9375rem;
        color: var(--color-charcoal);
        padding: 0.5rem 0;
        border-bottom: 2px solid transparent;
        transition: all var(--transition-fast);

        &:hover, &.active {
          color: var(--color-teal-dark);
          border-bottom-color: var(--color-teal-accent);
        }
      }
    }
    .header-actions {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .btn-sm {
      padding: 0.5rem 1.25rem;
      font-size: 0.875rem;
    }
    .mobile-menu-btn {
      display: none;
      background: none;
      border: none;
      color: var(--color-navy-dark);
      cursor: pointer;
      padding: 0.5rem;
    }
    .mobile-drawer {
      display: none;
      position: absolute;
      top: 72px;
      left: 0;
      right: 0;
      background-color: var(--color-bg-surface);
      border-bottom: 1px solid var(--color-border);
      padding: 1.5rem;
      box-shadow: var(--shadow-xl);
    }
    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      a {
        font-family: var(--font-family-heading);
        font-size: 1.125rem;
        font-weight: 600;
        color: var(--color-navy-dark);
      }
    }
    .w-full { width: 100%; }
    .mt-4 { margin-top: 1rem; }

    @media (max-width: 1024px) {
      .desktop-nav { display: none; }
      .mobile-menu-btn { display: block; }
      .mobile-drawer.open { display: block; }
    }
  `]
})
export class HeaderComponent {
  isMenuOpen = signal(false);

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}
