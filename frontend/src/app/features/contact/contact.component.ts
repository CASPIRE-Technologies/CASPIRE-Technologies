import { Component, OnInit, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { SeoService } from '../../core/services/seo.service';
import { ApiService } from '../../core/services/api.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <!-- Header -->
    <section class="page-header">
      <div class="container">
        <span class="badge badge-teal mb-2">Technical Consultation</span>
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
        <div class="card form-card">
          <h2>Project Enquiry Form</h2>
          <p class="form-sub">Fill in your project requirements below to receive a preliminary consultation proposal.</p>

          <!-- Success Alert -->
          <div *ngIf="submitSuccess()" class="alert alert-success" role="alert">
            <span class="alert-icon">✓</span>
            <div>
              <strong>Enquiry Received!</strong>
              <p>{{ responseMessage() }}</p>
            </div>
          </div>

          <!-- Error Alert -->
          <div *ngIf="submitError()" class="alert alert-danger" role="alert">
            <span class="alert-icon">⚠️</span>
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
                  <option value="Dedicated Engineering Teams">Dedicated Engineering Teams</option>
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
          <div class="card info-card">
            <h3>Direct Contact Channels</h3>
            <p>Our business office and engineering center are located at the World Trade Center in Colombo.</p>

            <div class="info-list mt-4">
              <div class="info-item">
                <div class="info-icon">📍</div>
                <div>
                  <strong>Headquarters Address</strong>
                  <p>Level 12, West Tower, World Trade Center, Colombo 01, Sri Lanka</p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">✉️</div>
                <div>
                  <strong>Primary Email</strong>
                  <p><a href="mailto:contact@apexsoftware.lk">contact&#64;apexsoftware.lk</a></p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">📞</div>
                <div>
                  <strong>Office Telephone</strong>
                  <p><a href="tel:+94112345678">+94 11 234 5678</a></p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">💬</div>
                <div>
                  <strong>WhatsApp Business</strong>
                  <p>
                    <a href="https://wa.me/94771234567" target="_blank" rel="noopener" class="whatsapp-link">
                      Chat Direct on WhatsApp (+94 77 123 4567) →
                    </a>
                  </p>
                </div>
              </div>

              <div class="info-item">
                <div class="info-icon">💼</div>
                <div>
                  <strong>Official LinkedIn Page</strong>
                  <p>
                    <a href="https://www.linkedin.com/company/apex-software-lk" target="_blank" rel="noopener">
                      linkedin.com/company/apex-software-lk →
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
      h1 { color: #ffffff; margin-bottom: 0.75rem; }
      .header-lead { color: #cbd5e1; font-size: 1.25rem; max-width: 700px; }
    }
    .contact-grid {
      display: grid;
      grid-template-columns: 1.6fr 1fr;
      gap: 2.5rem;
    }
    .form-card {
      h2 { margin-bottom: 0.5rem; }
    }
    .form-sub { color: var(--color-charcoal-muted); margin-bottom: 1.5rem; }
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }
    .form-group {
      margin-bottom: 1.25rem;
      label { display: block; font-weight: 600; font-size: 0.875rem; color: var(--color-navy-dark); margin-bottom: 0.375rem; }
      .req { color: var(--color-danger); }
    }
    .form-control {
      width: 100%;
      padding: 0.75rem 1rem;
      font-size: 0.9375rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      background-color: var(--color-bg-surface);
      color: var(--color-navy-dark);
      transition: border-color var(--transition-fast);

      &:focus {
        border-color: var(--color-teal-accent);
        outline: none;
      }
      &.is-invalid {
        border-color: var(--color-danger);
      }
    }
    .checkbox-group {
      display: flex;
      align-items: flex-start;
      gap: 0.75rem;
      input { margin-top: 0.25rem; }
      label { font-weight: 400; font-size: 0.84375rem; color: var(--color-charcoal-muted); margin: 0; }
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
      gap: 1rem;
      align-items: flex-start;
      margin-bottom: 1.5rem;

      p { margin: 0; font-size: 0.875rem; }
    }
    .alert-success { background-color: var(--color-success-bg); color: var(--color-success); border: 1px solid #a7f3d0; }
    .alert-danger { background-color: var(--color-danger-bg); color: var(--color-danger); border: 1px solid #fecaca; }

    .info-card {
      h3 { margin-bottom: 0.75rem; }
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
      p { margin: 0.25rem 0 0 0; color: var(--color-charcoal-muted); }
      a { color: var(--color-teal-dark); font-weight: 600; }
    }
    .info-icon { font-size: 1.5rem; }
    .whatsapp-link { color: #25d366 !important; font-weight: 700; }
    .w-full { width: 100%; }
    .mb-2 { margin-bottom: 0.5rem; }
    .mt-4 { margin-top: 1rem; }

    @media (max-width: 900px) {
      .contact-grid { grid-template-columns: 1fr; }
      .form-row { grid-template-columns: 1fr; }
    }
  `]
})
export class ContactComponent implements OnInit {
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private api = inject(ApiService);
  private seo = inject(SeoService);

  contactForm!: FormGroup;
  submitting = signal(false);
  submitSuccess = signal(false);
  submitError = signal(false);
  responseMessage = signal('');

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
