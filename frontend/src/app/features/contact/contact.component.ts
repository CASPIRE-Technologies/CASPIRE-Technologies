import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { siteContent } from '../../site-content';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NzIconModule],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <div class="badge badge-teal mb-2">
          <span class="pulse-dot"></span> Technical Consultation
        </div>
        <h1>Request a Free Consultation</h1>
        <p class="header-lead">
          Connect directly with our software architects and quality leads. We review requirements and respond within 24 business hours.
        </p>
      </div>
    </section>

    <!-- Main Contact Section -->
    <section class="section">
      <div class="container contact-grid">
        <!-- Contact Form Column -->
        <div class="card form-card reveal">
          <h2>Project Enquiry Form</h2>
          <p class="form-sub">Fill in your project requirements below to receive a preliminary consultation proposal.</p>

          <!-- Success Alert -->
          <div *ngIf="submitSuccess()" class="alert alert-success" role="alert">
            <span nz-icon nzType="check-circle" nzTheme="fill" class="alert-icon"></span>
            <div>
              <strong>Enquiry Received!</strong>
              <p>{{ responseMessage() }}</p>
            </div>
          </div>

          <!-- Error Alert -->
          <div *ngIf="submitError()" class="alert alert-danger" role="alert">
            <span nz-icon nzType="warning" nzTheme="fill" class="alert-icon"></span>
            <div>
              <strong>Submission Error</strong>
              <p>{{ responseMessage() }}</p>
            </div>
          </div>

          <form [formGroup]="contactForm" (ngSubmit)="onSubmit()" *ngIf="!submitSuccess()" class="mt-4">
            <!-- Spam Honeypot Field (Hidden from real users) -->
            <div class="sr-only" aria-hidden="true">
              <label for="website_url_hp">Do not fill this</label>
              <input type="text" id="website_url_hp" formControlName="website_url_hp" tabindex="-1" autocomplete="off" />
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="name">Full Name <span class="req">*</span></label>
                <input type="text" id="name" formControlName="name" placeholder="e.g. Kusal Perera" class="form-control" [class.is-invalid]="isFieldInvalid('name')" />
                <span *ngIf="isFieldInvalid('name')" class="invalid-feedback">Full name is required.</span>
              </div>

              <div class="form-group">
                <label for="company">Company / Organization <span class="req">*</span></label>
                <input type="text" id="company" formControlName="company" placeholder="e.g. Lanka Logistics Ltd" class="form-control" [class.is-invalid]="isFieldInvalid('company')" />
                <span *ngIf="isFieldInvalid('company')" class="invalid-feedback">Company name is required.</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="email">Corporate Email <span class="req">*</span></label>
                <input type="email" id="email" formControlName="email" placeholder="e.g. kusal@company.lk" class="form-control" [class.is-invalid]="isFieldInvalid('email')" />
                <span *ngIf="isFieldInvalid('email')" class="invalid-feedback">Valid email address is required.</span>
              </div>

              <div class="form-group">
                <label for="telephone">Telephone Number <span class="req">*</span></label>
                <input type="tel" id="telephone" formControlName="telephone" placeholder="e.g. +94 77 123 4567" class="form-control" [class.is-invalid]="isFieldInvalid('telephone')" />
                <span *ngIf="isFieldInvalid('telephone')" class="invalid-feedback">Telephone number is required.</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="country">Country of Operation</label>
                <input type="text" id="country" formControlName="country" placeholder="e.g. Sri Lanka" class="form-control" />
              </div>

              <div class="form-group">
                <label for="serviceOfInterest">Service of Interest <span class="req">*</span></label>
                <select id="serviceOfInterest" formControlName="serviceOfInterest" class="form-control" [class.is-invalid]="isFieldInvalid('serviceOfInterest')">
                  <option value="">-- Select a Service --</option>
                  <option value="Custom Web Applications">Custom Web Applications</option>
                  <option value="SME Workflow Digitization">SME Workflow Digitization</option>
                  <option value="Backend & API Development">Backend & API Development</option>
                  <option value="QA & Test Automation">QA & Test Automation</option>
                  <option value="Cloud Deployment & DevOps">Cloud Deployment & DevOps</option>
                  <option value="SEO">SEO</option>
                  <option value="Social Media Marketing">Social Media Marketing</option>
                  <option value="Other Technical Advisory">Other Technical Advisory</option>
                </select>
                <span *ngIf="isFieldInvalid('serviceOfInterest')" class="invalid-feedback">Please select a service.</span>
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label for="budgetRange">Estimated Budget Range <span class="req">*</span></label>
                <select id="budgetRange" formControlName="budgetRange" class="form-control" [class.is-invalid]="isFieldInvalid('budgetRange')">
                  <option value="">-- Select Budget Range --</option>
                  <option value="Under $2,500">Under $2,500 (Small Automation / MVP)</option>
                  <option value="$2,500 - $5,000">$2,500 - $5,000 (SME Digitization)</option>
                  <option value="$5,000 - $15,000">$5,000 - $15,000 (Custom Application)</option>
                  <option value="$15,000+">$15,000+ (Enterprise Platform / Dedicated Pod)</option>
                </select>
                <span *ngIf="isFieldInvalid('budgetRange')" class="invalid-feedback">Please select a budget range.</span>
              </div>

              <div class="form-group">
                <label for="preferredContactMethod">Preferred Contact Method</label>
                <select id="preferredContactMethod" formControlName="preferredContactMethod" class="form-control">
                  <option value="Email">Email</option>
                  <option value="Telephone Call">Telephone Call</option>
                  <option value="WhatsApp">WhatsApp</option>
                  <option value="Google Meet">Google Meet Video Call</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label for="description">Project Description & Requirements <span class="req">*</span></label>
              <textarea id="description" formControlName="description" rows="4" placeholder="Briefly describe your business challenge, software goals, or current tools..." class="form-control" [class.is-invalid]="isFieldInvalid('description')"></textarea>
              <span *ngIf="isFieldInvalid('description')" class="invalid-feedback">Please provide at least 10 characters describing your project.</span>
            </div>

            <div class="form-group checkbox-group">
              <input type="checkbox" id="consent" formControlName="consent" [class.is-invalid]="isFieldInvalid('consent')" />
              <label for="consent">
                I agree to the processing of my contact information to handle this technical enquiry in accordance with the Privacy Policy.
              </label>
            </div>
            <span *ngIf="isFieldInvalid('consent')" class="invalid-feedback block mb-2">Consent is required to submit.</span>

            <button type="submit" [disabled]="submitting()" class="btn btn-primary btn-lg w-full">
              <span *ngIf="!submitting()">Submit Consultation Request →</span>
              <span *ngIf="submitting()">Submitting Enquiry...</span>
            </button>
          </form>
        </div>

        <!-- Direct Contact Details Column -->
        <div class="direct-contact-col">
          <div class="card info-card reveal">
            <h3>Direct Contact Channels</h3>
            <p>{{ content.contact.intro }}</p>

            <div class="info-list mt-4">
              <div class="info-item">
                <div class="info-icon">
                  <span nz-icon nzType="environment" nzTheme="outline"></span>
                </div>
                <div class="info-text">
                  <strong>{{ content.contact.address.label }}</strong>
                  <p>{{ content.contact.address.full }}</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <span nz-icon nzType="mail" nzTheme="outline"></span>
                </div>
                <div class="info-text">
                  <strong>{{ content.contact.email.label }}</strong>
                  <p><a [href]="content.contact.email.href">{{ content.contact.email.value }}</a></p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <span nz-icon nzType="phone" nzTheme="outline"></span>
                </div>
                <div class="info-text">
                  <strong>{{ content.contact.telephone.label }}</strong>
                  <p><a [href]="content.contact.telephone.href">{{ content.contact.telephone.value }}</a></p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon whatsapp-icon-wrap">
                  <svg viewBox="0 0 32 32" width="18" height="18" fill="currentColor" aria-hidden="true">
                    <path d="M16.001 3C9.096 3 3.5 8.596 3.5 15.5c0 2.42.68 4.68 1.86 6.6L3 29l7.09-2.31A12.44 12.44 0 0 0 16 28.5C22.905 28.5 28.5 22.904 28.5 16S22.905 3 16.001 3zm0 22.7c-1.98 0-3.86-.53-5.48-1.46l-.39-.23-4.21 1.37 1.38-4.1-.25-.42a10.17 10.17 0 0 1-1.55-5.36c0-5.64 4.59-10.23 10.23-10.23 5.64 0 10.23 4.59 10.23 10.23 0 5.64-4.59 10.2-10.23 10.2zm5.61-7.66c-.31-.15-1.83-.9-2.11-1.01-.28-.1-.49-.15-.69.15-.2.31-.79 1.01-.97 1.22-.18.2-.36.23-.67.08-.31-.15-1.3-.48-2.48-1.53-.92-.82-1.53-1.83-1.72-2.14-.18-.31-.02-.47.13-.62.14-.14.31-.36.46-.54.15-.18.2-.31.31-.51.1-.2.05-.38-.03-.54-.08-.15-.69-1.67-.95-2.28-.25-.6-.5-.52-.69-.53h-.59c-.2 0-.54.08-.82.38-.28.31-1.08 1.05-1.08 2.57s1.1 2.98 1.26 3.19c.15.2 2.16 3.31 5.24 4.64.73.32 1.3.5 1.75.64.73.23 1.4.2 1.93.12.59-.09 1.83-.75 2.09-1.47.26-.72.26-1.34.18-1.47-.08-.13-.28-.2-.59-.36z"/>
                  </svg>
                </div>
                <div class="info-text">
                  <strong>{{ content.contact.whatsapp.label }}</strong>
                  <p>
                    <a [href]="content.contact.whatsapp.href" target="_blank" rel="noopener" class="whatsapp-link">
                      {{ content.contact.whatsapp.linkText }}
                    </a>
                  </p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">
                  <span nz-icon nzType="linkedin" nzTheme="fill"></span>
                </div>
                <div class="info-text">
                  <strong>{{ content.contact.linkedin.label }}</strong>
                  <p>
                    <a [href]="content.contact.linkedin.href" target="_blank" rel="noopener">
                      {{ content.contact.linkedin.display }}
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .page-header {
      background: linear-gradient(135deg, var(--color-navy-dark), var(--color-navy));
      color: #ffffff;
      padding: 4rem 0;
      overflow-wrap: break-word;
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.25rem; max-width: 700px; }
    }

    .pulse-dot {
      width: 8px;
      height: 8px;
      background-color: var(--color-teal-accent);
      border-radius: 50%;
      display: inline-block;
      animation: pulse 2s ease-in-out infinite;
    }
    @keyframes pulse {
      0%, 100% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.55; transform: scale(1.35); }
    }

    /* ROOT FIX: grid items default to min-width:auto, so intrinsic content
       (long <select> option text, unbreakable strings) can force tracks
       wider than their fr share and overflow the viewport at ANY size.
       min-width: 0 lets tracks actually respect the fr proportions. */
    .contact-grid {
      display: grid;
      grid-template-columns: minmax(0, 1.6fr) minmax(0, 1fr);
      gap: 2.5rem;
      align-items: start;
      width: 100%;
    }
    .form-card,
    .direct-contact-col {
      min-width: 0;
      width: 100%;
    }

    .form-card {
      h2 { margin-bottom: 0.5rem; }
    }
    .form-sub { color: var(--color-charcoal-muted); margin-bottom: 1.5rem; }

    .form-row {
      display: grid;
      grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
      gap: 1rem;
      width: 100%;
    }
    .form-group {
      min-width: 0;
      margin-bottom: 1.25rem;
      label { display: block; font-weight: 600; font-size: 0.875rem; color: var(--color-navy-dark); margin-bottom: 0.375rem; }
      .req { color: var(--color-danger); }
    }
    .form-control {
      display: block;
      width: 100%;
      min-width: 0;
      max-width: 100%;
      box-sizing: border-box;
      padding: 0.75rem 1rem;
      font-size: 0.9375rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-surface);
      color: var(--color-navy-dark);
      transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
      -webkit-appearance: none;
      appearance: none;

      &:focus {
        border-color: var(--color-teal-accent);
        box-shadow: 0 0 0 3px rgba(189, 156, 66, 0.15);
        outline: none;
      }
      &.is-invalid {
        border-color: var(--color-danger);
      }
    }
    select.form-control {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%23475569'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: right 0.875rem center;
      background-size: 1rem;
      padding-right: 2.5rem;
      /* prevent long option text from setting an intrinsic min-width on the select */
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    textarea.form-control {
      resize: vertical;
      min-height: 100px;
    }

    .checkbox-group {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      input { margin-top: 0.25rem; flex-shrink: 0; }
      label { font-weight: 400; font-size: 0.84375rem; color: var(--color-charcoal-muted); margin: 0; overflow-wrap: break-word; }
    }
    .invalid-feedback {
      font-size: 0.78125rem;
      color: var(--color-danger);
      margin-top: 0.25rem;
      display: block;
    }
    .alert {
      padding: 1rem 1.25rem;
      border-radius: var(--radius-md);
      display: flex;
      gap: 0.875rem;
      align-items: flex-start;
      margin-bottom: 1.5rem;

      p { margin: 0; font-size: 0.875rem; overflow-wrap: break-word; }
    }
    .alert-icon { font-size: 1.25rem; flex-shrink: 0; margin-top: 0.1rem; }
    .alert-success { background-color: var(--color-success-bg); color: var(--color-success); border: 1px solid #a7f3d0; }
    .alert-danger { background-color: var(--color-danger-bg); color: var(--color-danger); border: 1px solid #fecaca; }

    .info-card {
      h3 { margin-bottom: 0.75rem; }
      transition: transform 0.35s ease, box-shadow 0.35s ease, border-color 0.35s ease;
    }
    .info-card:hover {
      box-shadow: 0 16px 32px rgba(15, 23, 42, 0.1);
      border-color: var(--color-teal-accent);
    }
    .info-list {
      display: flex;
      flex-direction: column;
      gap: 1.25rem;
    }
    .info-item {
      display: flex;
      gap: 0.875rem;
      font-size: 0.875rem;
      align-items: flex-start;
    }
    .info-text {
      min-width: 0;
      flex: 1;
      p { margin: 0.25rem 0 0 0; color: var(--color-charcoal-muted); overflow-wrap: anywhere; word-break: break-word; }
      a { color: var(--color-teal-dark); font-weight: 600; overflow-wrap: anywhere; word-break: break-word; }
    }
    .info-icon {
      width: 40px;
      height: 40px;
      flex-shrink: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-md);
      background: var(--color-bg-surface-elevated, #f0fdfa);
      color: var(--color-teal-dark);
      font-size: 1.125rem;
      transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.35s ease, color 0.35s ease;
    }
    .info-item:hover .info-icon {
      transform: scale(1.08) rotate(-4deg);
      background: var(--color-teal-dark);
      color: #ffffff;
    }
    .whatsapp-icon-wrap {
      background: rgba(37, 211, 102, 0.12);
      color: #25d366;
    }
    .info-item:hover .whatsapp-icon-wrap {
      background: #25d366;
      color: #ffffff;
    }
    .whatsapp-link { color: #25d366 !important; font-weight: 700; }
    .w-full { width: 100%; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-4 { margin-top: 1rem; }

    /* Scroll reveal */
    .reveal {
      opacity: 0;
      transform: translateY(24px);
      transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1), transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .reveal.revealed {
      opacity: 1;
      transform: translateY(0);
    }
    .contact-grid .info-card.reveal { transition-delay: 120ms; }

    @media (prefers-reduced-motion: reduce) {
      .reveal { opacity: 1; transform: none; transition: none; }
      .pulse-dot { animation: none; }
    }

    /* ===== Responsive breakpoints (layout only — overflow is fixed above) ===== */
    @media (max-width: 1024px) {
      .contact-grid { gap: 2rem; }
    }

    @media (max-width: 900px) {
      .contact-grid {
        grid-template-columns: minmax(0, 1fr);
      }
      .direct-contact-col { order: -1; }
    }

    @media (max-width: 767px) {
      .page-header { padding: 2.75rem 0; }
      .form-row { grid-template-columns: minmax(0, 1fr); gap: 0; }
      .card.form-card,
      .card.info-card { padding: 1.5rem; }
    }

    @media (max-width: 480px) {
      .card.form-card,
      .card.info-card { padding: 1.25rem; }
      .alert { padding: 0.875rem 1rem; }
      .info-icon { width: 36px; height: 36px; font-size: 1rem; }
      .btn.btn-lg { font-size: 0.9375rem; padding: 0.75rem 1.25rem; }
    }
  `]
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private seo = inject(SeoService);
  private el = inject(ElementRef);
  private observer?: IntersectionObserver;

  contactForm!: FormGroup;
  submitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);
  responseMessage = signal('');
  content = siteContent;

  ngOnInit() {
    this.seo.updateMeta({
      title: 'Contact & Request Consultation | Apex Software Engineering',
      description: 'Request a free technical consultation with Sri Lanka software engineering leads. Submit requirements or contact office directly.',
    });

    this.contactForm = this.fb.group({
      name: ['', [Validators.required]],
      company: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      telephone: ['', [Validators.required]],
      country: ['Sri Lanka'],
      serviceOfInterest: ['', [Validators.required]],
      budgetRange: ['', [Validators.required]],
      preferredContactMethod: ['Email'],
      description: ['', [Validators.required, Validators.minLength(10)]],
      consent: [false, [Validators.requiredTrue]],
      website_url_hp: [''], // Spam honeypot
    });

    this.route.queryParams.subscribe((params) => {
      if (params['service']) {
        this.contactForm.patchValue({ serviceOfInterest: params['service'] });
      }
    });
  }

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

  isFieldInvalid(field: string): boolean {
    const control = this.contactForm.get(field);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  onSubmit() {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.submitting.set(true);
    this.submitError.set(false);

    this.api.post<any>('enquiries', this.contactForm.value).subscribe({
      next: (res) => {
        this.submitting.set(false);
        this.submitSuccess.set(true);
        this.responseMessage.set(res.message || 'Thank you! Your enquiry has been received successfully.');
      },
      error: (err) => {
        this.submitting.set(false);
        this.submitError.set(true);
        this.responseMessage.set(err.error?.error?.message || 'Failed to submit enquiry. Please call us directly.');
      },
    });
  }
}