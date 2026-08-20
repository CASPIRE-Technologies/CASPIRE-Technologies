import { Component, signal, inject, effect, HostListener } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { siteContent } from '../../../site-content';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  template: `
    <header class="site-header" [class.scrolled]="isScrolled()" role="banner">
      <div class="container header-container">
        <!-- Brand Logo -->
        <a routerLink="/" class="brand-logo" [attr.aria-label]="content.brand.homepageAriaLabel">
          <img class="logo-image" [src]="content.brand.logo.src" [alt]="content.brand.logo.alt" />
          <div class="logo-text">
            <span class="brand-name">{{ content.brand.shortName }}</span>
            <span class="brand-tagline">{{ content.brand.tagline }}</span>
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
          <a routerLink="/blog" routerLinkActive="active">Blog</a>
        </nav>

        <!-- CTA Action Buttons -->
        <div class="header-actions">
          <a routerLink="/contact" class="btn btn-primary btn-sm">Request Consultation</a>
          <button
            class="mobile-menu-btn"
            [class.open]="isMenuOpen()"
            (click)="toggleMenu()"
            [attr.aria-expanded]="isMenuOpen()"
            aria-label="Toggle Navigation Menu">
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </button>
        </div>
      </div>

      <!-- Mobile Backdrop -->
      <div class="mobile-backdrop" [class.open]="isMenuOpen()" (click)="closeMenu()" aria-hidden="true"></div>

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
          <a routerLink="/blog" (click)="closeMenu()">Blog</a>
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
      background-color: #050505;
      backdrop-filter: blur(8px);
      border-bottom: 1px solid rgba(189, 156, 66, 0.45);
      height: 72px;
      display: flex;
      align-items: center;
      transition: box-shadow 0.3s ease, background-color 0.3s ease;
    }
    .site-header.scrolled {
      background-color: rgba(5, 5, 5, 0.94);
      box-shadow: 0 10px 28px rgba(0, 0, 0, 0.4);
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
    .logo-image {
      width: 56px;
      height: 56px;
      object-fit: contain;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
    .brand-logo:hover .logo-image {
      transform: scale(1.07) rotate(-4deg);
    }
    .logo-text {
      display: flex;
      flex-direction: column;
    }
    .brand-name {
      font-family: var(--font-family-heading);
      font-weight: 800;
      font-size: 1.25rem;
      color: #ffffff;
      line-height: 1;
      letter-spacing: 0.05em;
    }
    .brand-tagline {
      font-size: 0.65rem;
      font-weight: 700;
      color: var(--color-teal-accent);
      letter-spacing: 0.1em;
      margin-top: 2px;
    }
    .desktop-nav {
      display: flex;
      align-items: center;
      gap: 1.75rem;

      a {
        position: relative;
        font-family: var(--font-family-heading);
        font-weight: 600;
        font-size: 0.9375rem;
        color: #f8fafc;
        padding: 0.5rem 0;
        transition: color var(--transition-fast);
      }

      a::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: -1px;
        width: 100%;
        height: 2px;
        background: var(--color-teal-accent);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      }

      a:hover, a.active {
        color: var(--color-teal-accent);
      }

      a:hover::after, a.active::after {
        transform: scaleX(1);
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

    /* Animated hamburger */
    .mobile-menu-btn {
      display: none;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
      width: 32px;
      height: 32px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
    }
    .mobile-menu-btn .bar {
      display: block;
      width: 100%;
      height: 2px;
      background: var(--color-teal-accent);
      border-radius: 2px;
      transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease;
    }
    .mobile-menu-btn.open .bar:nth-child(1) {
      transform: translateY(8px) rotate(45deg);
    }
    .mobile-menu-btn.open .bar:nth-child(2) {
      opacity: 0;
      transform: scaleX(0);
    }
    .mobile-menu-btn.open .bar:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    /* Backdrop */
    .mobile-backdrop {
      display: none;
      position: fixed;
      inset: 72px 0 0 0;
      background: rgba(0, 0, 0, 0.55);
      opacity: 0;
      transition: opacity 0.3s ease;
      z-index: 90;
    }
    .mobile-backdrop.open {
      display: block;
      opacity: 1;
    }

    /* Sliding drawer */
    .mobile-drawer {
      position: absolute;
      top: 72px;
      left: 0;
      right: 0;
      background-color: #050505;
      border-bottom: 1px solid rgba(189, 156, 66, 0.45);
      box-shadow: var(--shadow-xl);
      max-height: 0;
      opacity: 0;
      overflow: hidden;
      padding: 0 1.5rem;
      transition: max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease, padding 0.4s ease;
      z-index: 95;
    }
    .mobile-drawer.open {
      max-height: 640px;
      opacity: 1;
      padding: 1.5rem;
    }
    .mobile-nav {
      display: flex;
      flex-direction: column;
      gap: 1rem;

      a {
        font-family: var(--font-family-heading);
        font-size: 1.125rem;
        font-weight: 600;
        color: #f8fafc;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease, color var(--transition-fast);
      }

      a:hover {
        color: var(--color-teal-accent);
      }
    }
    .mobile-drawer.open .mobile-nav > a {
      opacity: 1;
      transform: translateY(0);
    }
    .mobile-drawer.open .mobile-nav > a:nth-child(1) { transition-delay: 60ms; }
    .mobile-drawer.open .mobile-nav > a:nth-child(2) { transition-delay: 100ms; }
    .mobile-drawer.open .mobile-nav > a:nth-child(3) { transition-delay: 140ms; }
    .mobile-drawer.open .mobile-nav > a:nth-child(4) { transition-delay: 180ms; }
    .mobile-drawer.open .mobile-nav > a:nth-child(5) { transition-delay: 220ms; }
    .mobile-drawer.open .mobile-nav > a:nth-child(6) { transition-delay: 260ms; }
    .mobile-drawer.open .mobile-nav > a:nth-child(7) { transition-delay: 300ms; }
    .mobile-drawer.open .mobile-nav > a:nth-child(8) { transition-delay: 340ms; }
    .mobile-drawer.open .mobile-nav > a:nth-child(9) { transition-delay: 380ms; }

    .w-full { width: 100%; }
    .mt-4 { margin-top: 1rem; }

    @media (prefers-reduced-motion: reduce) {
      .site-header,
      .logo-image,
      .desktop-nav a::after,
      .mobile-menu-btn .bar,
      .mobile-backdrop,
      .mobile-drawer,
      .mobile-nav a {
        transition: none !important;
        animation: none !important;
      }
      .mobile-drawer { max-height: none; }
      .mobile-drawer:not(.open) { display: none; }
    }

    @media (max-width: 1024px) {
      .desktop-nav { display: none; }
      .mobile-menu-btn { display: flex; }
    }
  `]
})
export class HeaderComponent {
  content = siteContent;
  isMenuOpen = signal(false);
  isScrolled = signal(false);

  constructor() {
    effect(() => {
      document.body.style.overflow = this.isMenuOpen() ? 'hidden' : '';
    });
  }

  @HostListener('window:scroll')
  onScroll() {
    this.isScrolled.set(window.scrollY > 12);
  }

  @HostListener('window:keydown.escape')
  onEscape() {
    this.closeMenu();
  }

  toggleMenu() {
    this.isMenuOpen.update(v => !v);
  }

  closeMenu() {
    this.isMenuOpen.set(false);
  }
}