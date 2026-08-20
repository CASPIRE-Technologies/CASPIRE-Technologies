import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, catchError, of } from 'rxjs';
import { Router } from '@angular/router';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  currentUser = signal<User | null>(this.getStoredUser());
  accessToken = signal<string | null>(this.getStoredToken());
  isAuthenticated = computed(() => !!this.currentUser() && !!this.accessToken());

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post<any>('/api/v1/auth/login', credentials).pipe(
      tap((res) => {
        if (res.accessToken) {
          this.setSession(res.user, res.accessToken, res.refreshToken);
        }
      })
    );
  }

  logout() {
    const token = this.getStoredRefreshToken();
    if (this.accessToken()) {
      this.http.post('/api/v1/auth/logout', { refreshToken: token }).pipe(
        catchError(() => of(null))
      ).subscribe();
    }
    this.clearSession();
    this.router.navigate(['/admin/login']);
  }

  private setSession(user: User, token: string, refreshToken: string) {
    this.currentUser.set(user);
    this.accessToken.set(token);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('apex_user', JSON.stringify(user));
      localStorage.setItem('apex_token', token);
      localStorage.setItem('apex_refresh_token', refreshToken);
    }
  }

  private clearSession() {
    this.currentUser.set(null);
    this.accessToken.set(null);
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.removeItem('apex_user');
      localStorage.removeItem('apex_token');
      localStorage.removeItem('apex_refresh_token');
    }
  }

  private getStoredUser(): User | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      const data = localStorage.getItem('apex_user');
      return data ? JSON.parse(data) : null;
    }
    return null;
  }

  private getStoredToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('apex_token');
    }
    return null;
  }

  private getStoredRefreshToken(): string | null {
    if (typeof window !== 'undefined' && window.localStorage) {
      return localStorage.getItem('apex_refresh_token');
    }
    return null;
  }
}
