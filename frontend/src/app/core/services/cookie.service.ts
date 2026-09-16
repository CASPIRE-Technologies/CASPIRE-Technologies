import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  consentStatus = signal<'pending' | 'accepted' | 'declined'>(this.getInitialConsent());

  acceptCookies() {
    this.setConsent('accepted');
  }

  declineCookies() {
    this.setConsent('declined');
  }

  private setConsent(status: 'accepted' | 'declined') {
    this.consentStatus.set(status);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('CASPIRE_cookie_consent', status);
    }
  }

  private getInitialConsent(): 'pending' | 'accepted' | 'declined' {
    if (typeof window !== 'undefined' && window.localStorage) {
      const stored = localStorage.getItem('CASPIRE_cookie_consent');
      if (stored === 'accepted' || stored === 'declined') {
        return stored;
      }
    }
    return 'pending';
  }
}
