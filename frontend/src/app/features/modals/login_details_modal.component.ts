import { Component, Output, EventEmitter, HostListener } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-login-modal",
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
    <div class="user-menu-dropdown" (click)="$event.stopPropagation()">
      <div class="user-header">
        <div class="user-avatar-small"></div>
        <div class="user-info">
          <span class="user-name">User Account</span>
          <span class="user-email">user&#64;example.com</span>
        </div>
      </div>
      
      <div class="menu-divider"></div>
      
      <div class="menu-links">
        <a routerLink="/profile" class="menu-item" (click)="close.emit()">
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span>Profile</span>
          <span class="arrow">&rarr;</span>
        </a>
        
        <button class="menu-item logout-btn" (click)="logout()">
          <svg class="icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  `,
  styles: [
    `
      .user-menu-dropdown {
        position: absolute;
        top: calc(100% + 12px);
        right: 0;
        width: 240px;
        background: rgba(12, 12, 14, 0.95);
        backdrop-filter: blur(12px);
        border: 1px solid rgba(189, 156, 66, 0.35);
        border-radius: 0.75rem;
        padding: 0.75rem;
        box-shadow: 0 20px 35px rgba(0, 0, 0, 0.6);
        z-index: 110;
        animation: fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
          transform: translateY(-8px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      .user-header {
        display: flex;
        align-items: center;
        gap: 0.75rem;
        padding: 0.5rem;
      }

      .user-avatar-small {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background-image: url("https://gravatar.com/avatar/4d05459ab91779b811e26e821ceee66c?s=400&d=mp&r=x");
        background-size: cover;
        border: 1px solid var(--color-teal-accent, #00f2fe);
      }

      .user-info {
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .user-name {
        font-size: 0.875rem;
        font-weight: 600;
        color: #ffffff;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .user-email {
        font-size: 0.725rem;
        color: #94a3b8;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

      .menu-divider {
        height: 1px;
        background: rgba(189, 156, 66, 0.2);
        margin: 0.5rem 0;
      }

      .menu-links {
        display: flex;
        flex-direction: column;
        gap: 0.25rem;
      }

      .menu-item {
        display: flex;
        align-items: center;
        gap: 0.625rem;
        padding: 0.625rem 0.75rem;
        color: #f8fafc;
        text-decoration: none;
        font-size: 0.875rem;
        font-weight: 500;
        border-radius: 0.375rem;
        background: transparent;
        border: none;
        width: 100%;
        cursor: pointer;
        transition: all 0.2s ease;
      }

      .menu-item:hover {
        background: rgba(255, 255, 255, 0.08);
        color: var(--color-teal-accent, #00f2fe);
      }

      .menu-item .icon {
        width: 18px;
        height: 18px;
        stroke: currentColor;
      }

      .menu-item .arrow {
        margin-left: auto;
        font-size: 0.875rem;
        transition: transform 0.2s ease;
      }

      .menu-item:hover .arrow {
        transform: translateX(3px);
      }

      .logout-btn:hover {
        color: #ef4444;
        background: rgba(239, 68, 68, 0.1);
      }
    `,
  ],
})
export class LoginDetailsModalComponent {
  @Output() close = new EventEmitter<void>();

  logout() {
    // Add logout service logic here if needed
    this.close.emit();
  }
}