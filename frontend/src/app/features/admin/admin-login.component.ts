import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <section class="section section-alt login-section">
      <div class="container container-narrow">
        <div class="card login-card">
          <div class="logo-mark mx-auto mb-3">A</div>
          <h1 class="text-center">Admin Portal Login</h1>
          <p class="text-center text-muted mb-4">Secure authentication for Apex System Administrators.</p>

          <div *ngIf="loginError()" class="alert alert-danger mb-4">
            {{ loginError() }}
          </div>

          <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
            <div class="form-group mb-3">
              <label for="email">Admin Email Address</label>
              <input 
                type="email" 
                id="email" 
                formControlName="email" 
                placeholder="admin@apexsoftware.lk" 
                class="form-control" 
                [class.is-invalid]="loginForm.get('email')?.invalid && loginForm.get('email')?.touched" 
              />
            </div>

            <div class="form-group mb-4">
              <label for="password">Password</label>
              <input 
                type="password" 
                id="password" 
                formControlName="password" 
                placeholder="••••••••" 
                class="form-control" 
                [class.is-invalid]="loginForm.get('password')?.invalid && loginForm.get('password')?.touched" 
              />
            </div>

            <button type="submit" [disabled]="submitting()" class="btn btn-primary w-full btn-lg">
              <span *ngIf="!submitting()">Sign In to Dashboard →</span>
              <span *ngIf="submitting()">Authenticating...</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .login-section { padding: 5rem 0; }
    .container-narrow { max-width: 450px; margin: 0 auto; }
    .login-card {
      padding: 2.5rem;
      border-top: 4px solid var(--color-teal-dark);
    }
    .logo-mark {
      width: 48px;
      height: 48px;
      background: var(--color-teal-dark);
      color: #ffffff;
      font-weight: 800;
      font-size: 1.75rem;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
    }
    .mx-auto { margin-left: auto; margin-right: auto; }
    .text-center { text-align: center; }
    .text-muted { color: var(--color-charcoal-muted); font-size: 0.875rem; }
    .w-full { width: 100%; }
    .form-group {
      label { display: block; font-weight: 600; font-size: 0.875rem; margin-bottom: 0.375rem; }
    }
    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 0.9375rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      &:focus { border-color: var(--color-teal-accent); outline: none; }
    }
    .alert-danger {
      background-color: var(--color-danger-bg);
      color: var(--color-danger);
      padding: 0.75rem 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
    }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-4 { margin-bottom: 1.5rem; }
  `]
})
export class AdminLoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private seo = inject(SeoService);

  loginForm!: FormGroup;
  submitting = signal(false);
  loginError = signal('');
  returnUrl = '/admin/dashboard';

  ngOnInit() {
    this.seo.updateMeta({ title: 'Admin Login', description: 'Admin Login Portal' });

    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/admin/dashboard']);
    }

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin/dashboard';

    this.loginForm = this.fb.group({
      email: ['admin@apexsoftware.lk', [Validators.required, Validators.email]],
      password: ['AdminPass123!', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.loginError.set('');

    this.authService.login(this.loginForm.value).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigateByUrl(this.returnUrl);
      },
      error: (err) => {
        this.submitting.set(false);
        this.loginError.set(err.error?.error?.message || 'Invalid email or password.');
      },
    });
  }
}
