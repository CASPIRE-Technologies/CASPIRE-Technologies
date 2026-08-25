import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { ApiService } from '../../core/services/api.service';
import { SeoService } from '../../core/services/seo.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  template: `
    <div class="admin-dashboard-page">
      <!-- Admin Top Header -->
      <header class="admin-header">
        <div class="container admin-nav-container">
          <div class="brand">
            <span class="logo-mark">A</span>
            <strong>Apex Admin Portal</strong>
          </div>

          <div class="user-meta">
            <span>Logged in as <strong>{{ auth.currentUser()?.email }}</strong> ({{ auth.currentUser()?.role }})</span>
            <button (click)="auth.logout()" class="btn btn-secondary btn-sm">Logout</button>
          </div>
        </div>
      </header>

      <!-- Dashboard Main -->
      <main class="container section">
        <!-- Tab Controls -->
        <div class="admin-tabs mb-4">
          <button (click)="activeTab.set('enquiries')" [class.active]="activeTab() === 'enquiries'" class="tab-btn">
            Enquiries Manager
          </button>
          <button (click)="activeTab.set('industries')" [class.active]="activeTab() === 'industries'" class="tab-btn">
            Industries Manager
          </button>
          <button (click)="activeTab.set('services')" [class.active]="activeTab() === 'services'" class="tab-btn">
            Services Manager
          </button>
          <button (click)="activeTab.set('portfolio')" [class.active]="activeTab() === 'portfolio'" class="tab-btn">
            Portfolio Projects
          </button>
          <button (click)="activeTab.set('blog')" [class.active]="activeTab() === 'blog'" class="tab-btn">
            Blog Articles
          </button>
        </div>

        <!-- 1. Enquiries Manager Tab (Issue #15) -->
        <div *ngIf="activeTab() === 'enquiries'" class="tab-content">
          <div class="table-header">
            <h2>Submitted Consultation Enquiries</h2>
            <div class="action-controls">
              <div class="search-box">
                <input
                  type="text"
                  [(ngModel)]="enquirySearchQuery"
                  (keyup.enter)="loadEnquiries()"
                  placeholder="Search inquiries..."
                  class="form-control form-control-sm"
                />
                <button (click)="loadEnquiries()" class="btn btn-secondary btn-sm ms-1">Search</button>
              </div>

              <select [(ngModel)]="statusFilter" (change)="loadEnquiries()" class="form-select form-select-sm">
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="IN_REVIEW">IN REVIEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="CLOSED">CLOSED</option>
              </select>

              <button (click)="openAddEnquiryModal()" class="btn btn-primary btn-sm">
                ➕ Add New Inquiry
              </button>
            </div>
          </div>

          <div class="card table-card mt-3">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Contact Person</th>
                  <th>Company</th>
                  <th>Service</th>
                  <th>Budget</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let enq of enquiries()">
                  <td>{{ enq.createdAt | date:'shortDate' }}</td>
                  <td>
                    <strong>{{ enq.name }}</strong><br/>
                    <small>{{ enq.email }} | {{ enq.telephone }}</small>
                  </td>
                  <td>{{ enq.company }}</td>
                  <td>{{ enq.serviceOfInterest }}</td>
                  <td>{{ enq.budgetRange }}</td>
                  <td>
                    <span class="badge" [ngClass]="getStatusBadgeClass(enq.status)">{{ enq.status }}</span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button (click)="selectEnquiry(enq)" class="btn btn-secondary btn-xs">View & Notes</button>
                      <button (click)="deleteEnquiry(enq.id, enq.name)" class="btn btn-danger btn-xs ms-1">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr *ngIf="enquiries().length === 0">
                  <td colspan="7" class="text-center p-4">No inquiries found matching criteria.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Enquiry Details & Notes Modal -->
          <div *ngIf="selectedEnquiry()" class="modal-overlay">
            <div class="modal-card card">
              <div class="modal-header">
                <h3>Enquiry Details #{{ selectedEnquiry().id.substring(0, 8) }}</h3>
                <button (click)="selectedEnquiry.set(null)" class="close-btn">✕</button>
              </div>

              <div class="modal-body">
                <div class="grid-2 gap-3 mb-3">
                  <div>
                    <strong>From:</strong> {{ selectedEnquiry().name }} ({{ selectedEnquiry().company }})<br/>
                    <strong>Email:</strong> {{ selectedEnquiry().email }} | <strong>Phone:</strong> {{ selectedEnquiry().telephone }}<br/>
                    <strong>Country:</strong> {{ selectedEnquiry().country }}
                  </div>
                  <div>
                    <strong>Service:</strong> {{ selectedEnquiry().serviceOfInterest }}<br/>
                    <strong>Budget:</strong> {{ selectedEnquiry().budgetRange }}<br/>
                    <strong>Preferred Contact:</strong> {{ selectedEnquiry().preferredContactMethod }}
                  </div>
                </div>

                <div class="desc-box mb-3">
                  <strong>Requirements Description:</strong>
                  <p>{{ selectedEnquiry().description }}</p>
                </div>

                <!-- Update Status -->
                <div class="status-updater mb-4">
                  <label>Update Status:</label>
                  <select [ngModel]="selectedEnquiry().status" (ngModelChange)="updateStatus(selectedEnquiry().id, $event)" class="form-select inline-select ms-2">
                    <option value="NEW">NEW</option>
                    <option value="IN_REVIEW">IN_REVIEW</option>
                    <option value="CONTACTED">CONTACTED</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>

                <!-- Notes Timeline -->
                <div class="notes-section">
                  <h4>Internal Notes</h4>
                  <div class="notes-list mb-3">
                    <div *ngFor="let n of selectedEnquiry().notes" class="note-item">
                      <span class="note-author">{{ n.author?.name || 'Admin' }} ({{ n.createdAt | date:'short' }}):</span>
                      <p>{{ n.note }}</p>
                    </div>
                    <p *ngIf="!selectedEnquiry().notes?.length" class="text-muted">No internal notes yet.</p>
                  </div>

                  <!-- Add Note Form -->
                  <div class="add-note-box">
                    <textarea [(ngModel)]="newNoteText" placeholder="Add an internal note..." rows="2" class="form-control"></textarea>
                    <button (click)="addNote(selectedEnquiry().id)" [disabled]="!newNoteText.trim()" class="btn btn-primary btn-sm mt-2">Add Internal Note</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Inquiry Modal -->
          <div *ngIf="isEnquiryModalOpen()" class="modal-overlay">
            <div class="modal-card card">
              <div class="modal-header">
                <h3>Add New Consultation Inquiry</h3>
                <button (click)="closeEnquiryModal()" class="close-btn">✕</button>
              </div>

              <div class="modal-body">
                <form (ngSubmit)="submitNewEnquiry()">
                  <div class="grid-2 gap-3 mb-3">
                    <div>
                      <label class="form-label">Full Name *</label>
                      <input type="text" [(ngModel)]="newEnquiryForm.name" name="name" required class="form-control" placeholder="e.g. Jane Doe" />
                    </div>
                    <div>
                      <label class="form-label">Company Name *</label>
                      <input type="text" [(ngModel)]="newEnquiryForm.company" name="company" required class="form-control" placeholder="e.g. Apex Corp" />
                    </div>
                  </div>

                  <div class="grid-2 gap-3 mb-3">
                    <div>
                      <label class="form-label">Email Address *</label>
                      <input type="email" [(ngModel)]="newEnquiryForm.email" name="email" required class="form-control" placeholder="jane@example.com" />
                    </div>
                    <div>
                      <label class="form-label">Telephone *</label>
                      <input type="text" [(ngModel)]="newEnquiryForm.telephone" name="telephone" required class="form-control" placeholder="+94 77 123 4567" />
                    </div>
                  </div>

                  <div class="grid-2 gap-3 mb-3">
                    <div>
                      <label class="form-label">Country</label>
                      <input type="text" [(ngModel)]="newEnquiryForm.country" name="country" class="form-control" />
                    </div>
                    <div>
                      <label class="form-label">Service of Interest</label>
                      <select [(ngModel)]="newEnquiryForm.serviceOfInterest" name="serviceOfInterest" class="form-select">
                        <option value="Custom Software Development">Custom Software Development</option>
                        <option value="Cloud Architecture & DevOps">Cloud Architecture & DevOps</option>
                        <option value="Web & Mobile App Engineering">Web & Mobile App Engineering</option>
                        <option value="QA & Test Automation">QA & Test Automation</option>
                        <option value="IT Consulting & Transformation">IT Consulting & Transformation</option>
                      </select>
                    </div>
                  </div>

                  <div class="grid-2 gap-3 mb-3">
                    <div>
                      <label class="form-label">Budget Range</label>
                      <select [(ngModel)]="newEnquiryForm.budgetRange" name="budgetRange" class="form-select">
                        <option value="Under $10,000">Under $10,000</option>
                        <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                        <option value="$25,000 - $50,000">$25,000 - $50,000</option>
                        <option value="$50,000+">$50,000+</option>
                      </select>
                    </div>
                    <div>
                      <label class="form-label">Preferred Contact Method</label>
                      <select [(ngModel)]="newEnquiryForm.preferredContactMethod" name="preferredContactMethod" class="form-select">
                        <option value="Email">Email</option>
                        <option value="Phone">Phone</option>
                        <option value="WhatsApp">WhatsApp</option>
                      </select>
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Requirements Description *</label>
                    <textarea [(ngModel)]="newEnquiryForm.description" name="description" rows="3" required class="form-control" placeholder="Describe the consultation or project needs..."></textarea>
                  </div>

                  <div class="modal-footer">
                    <button type="button" (click)="closeEnquiryModal()" class="btn btn-secondary me-2">Cancel</button>
                    <button type="submit" class="btn btn-primary">Submit Inquiry</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- 2. Industries Manager Tab (Issue #12) -->
        <div *ngIf="activeTab() === 'industries'" class="tab-content">
          <div class="table-header">
            <h2>Industries Management</h2>
            <div class="action-controls">
              <div class="search-box">
                <input
                  type="text"
                  [ngModel]="industrySearchQuery()"
                  (ngModelChange)="industrySearchQuery.set($event)"
                  placeholder="Search industries..."
                  class="form-control form-control-sm"
                />
              </div>

              <select [ngModel]="industryStatusFilter()" (ngModelChange)="industryStatusFilter.set($event)" class="form-select form-select-sm">
                <option value="ALL">All Statuses</option>
                <option value="PUBLISHED">PUBLISHED</option>
                <option value="DRAFT">DRAFT</option>
              </select>

              <button (click)="openAddIndustryModal()" class="btn btn-primary btn-sm">
                ➕ Add New Industry
              </button>
            </div>
          </div>

          <div class="card table-card mt-3">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Short Description</th>
                  <th>Order</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let ind of filteredIndustries()">
                  <td>
                    <strong>{{ ind.title }}</strong>
                  </td>
                  <td><code>{{ ind.slug }}</code></td>
                  <td>{{ ind.shortDesc | slice:0:70 }}{{ ind.shortDesc?.length > 70 ? '...' : '' }}</td>
                  <td>{{ ind.displayOrder }}</td>
                  <td>
                    <span class="badge" [class.badge-teal]="ind.isPublished" [class.badge-navy]="!ind.isPublished">
                      {{ ind.isPublished ? 'PUBLISHED' : 'DRAFT' }}
                    </span>
                  </td>
                  <td>
                    <div class="btn-group">
                      <button (click)="openEditIndustryModal(ind)" class="btn btn-secondary btn-xs">Edit</button>
                      <button (click)="deleteIndustry(ind.id, ind.title)" class="btn btn-danger btn-xs ms-1">Delete</button>
                    </div>
                  </td>
                </tr>
                <tr *ngIf="filteredIndustries().length === 0">
                  <td colspan="6" class="text-center p-4">No industries found.</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Add / Edit Industry Modal -->
          <div *ngIf="isIndustryModalOpen()" class="modal-overlay">
            <div class="modal-card card">
              <div class="modal-header">
                <h3>{{ editingIndustryId() ? 'Edit Industry' : 'Add New Industry' }}</h3>
                <button (click)="closeIndustryModal()" class="close-btn">✕</button>
              </div>

              <div class="modal-body">
                <form (ngSubmit)="saveIndustry()">
                  <div class="grid-2 gap-3 mb-3">
                    <div>
                      <label class="form-label">Title *</label>
                      <input
                        type="text"
                        [(ngModel)]="industryForm.title"
                        (ngModelChange)="onIndustryTitleChange($event)"
                        name="title"
                        required
                        class="form-control"
                        placeholder="e.g. Retail & Distribution"
                      />
                    </div>
                    <div>
                      <label class="form-label">Slug *</label>
                      <input
                        type="text"
                        [(ngModel)]="industryForm.slug"
                        name="slug"
                        required
                        class="form-control"
                        placeholder="e.g. retail-distribution"
                      />
                    </div>
                  </div>

                  <div class="grid-2 gap-3 mb-3">
                    <div>
                      <label class="form-label">Icon Name</label>
                      <input
                        type="text"
                        [(ngModel)]="industryForm.icon"
                        name="icon"
                        class="form-control"
                        placeholder="e.g. shopping-bag"
                      />
                    </div>
                    <div>
                      <label class="form-label">Display Order</label>
                      <input
                        type="number"
                        [(ngModel)]="industryForm.displayOrder"
                        name="displayOrder"
                        class="form-control"
                      />
                    </div>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Short Description *</label>
                    <textarea
                      [(ngModel)]="industryForm.shortDesc"
                      name="shortDesc"
                      rows="2"
                      required
                      class="form-control"
                      placeholder="Brief overview of industry capabilities..."
                    ></textarea>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Full Description *</label>
                    <textarea
                      [(ngModel)]="industryForm.fullDesc"
                      name="fullDesc"
                      rows="4"
                      required
                      class="form-control"
                      placeholder="Detailed explanation of industry solutions and domain expertise..."
                    ></textarea>
                  </div>

                  <div class="mb-3">
                    <label class="form-label">Realistic Use Cases (one per line) *</label>
                    <textarea
                      [(ngModel)]="industryForm.useCases"
                      name="useCases"
                      rows="4"
                      required
                      class="form-control"
                      placeholder="Material Requisition Approval Workflows&#10;Subcontractor Site Progress Logging&#10;Client Payment Milestone Tracking"
                    ></textarea>
                  </div>

                  <div class="grid-2 gap-3 mb-3">
                    <div>
                      <label class="form-label">Meta Title (SEO)</label>
                      <input type="text" [(ngModel)]="industryForm.metaTitle" name="metaTitle" class="form-control" />
                    </div>
                    <div>
                      <label class="form-label">Meta Description (SEO)</label>
                      <input type="text" [(ngModel)]="industryForm.metaDescription" name="metaDescription" class="form-control" />
                    </div>
                  </div>

                  <div class="form-check mb-4">
                    <input
                      type="checkbox"
                      id="isPublishedCheck"
                      [(ngModel)]="industryForm.isPublished"
                      name="isPublished"
                      class="form-check-input"
                    />
                    <label for="isPublishedCheck" class="form-check-label ms-2">Publish Industry (Visible to public)</label>
                  </div>

                  <div class="modal-footer">
                    <button type="button" (click)="closeIndustryModal()" class="btn btn-secondary me-2">Cancel</button>
                    <button type="submit" class="btn btn-primary">
                      {{ editingIndustryId() ? 'Update Industry' : 'Create Industry' }}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <!-- 3. Services Manager Tab -->
        <div *ngIf="activeTab() === 'services'" class="tab-content">
          <h2>Services Management</h2>
          <div class="card table-card mt-3">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Slug</th>
                  <th>Published</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let s of adminServices()">
                  <td><strong>{{ s.title }}</strong></td>
                  <td><code>{{ s.slug }}</code></td>
                  <td><span class="badge" [class.badge-teal]="s.isPublished">{{ s.isPublished ? 'PUBLISHED' : 'DRAFT' }}</span></td>
                  <td>{{ s.displayOrder }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 4. Portfolio Projects Tab -->
        <div *ngIf="activeTab() === 'portfolio'" class="tab-content">
          <h2>Portfolio Projects Management</h2>
          <div class="card table-card mt-3">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Project Title</th>
                  <th>Industry</th>
                  <th>Featured</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let p of adminPortfolio()">
                  <td><strong>{{ p.title }}</strong></td>
                  <td>{{ p.clientIndustry }}</td>
                  <td>{{ p.isFeatured ? '⭐ Yes' : 'No' }}</td>
                  <td><span class="badge badge-teal">{{ p.isPublished ? 'PUBLISHED' : 'DRAFT' }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- 5. Blog Articles Tab -->
        <div *ngIf="activeTab() === 'blog'" class="tab-content">
          <h2>Blog Articles Management</h2>
          <div class="card table-card mt-3">
            <table class="admin-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let b of adminBlog()">
                  <td><strong>{{ b.title }}</strong></td>
                  <td>{{ b.category?.name }}</td>
                  <td>{{ b.authorName }}</td>
                  <td><span class="badge badge-teal">{{ b.isPublished ? 'PUBLISHED' : 'DRAFT' }}</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .admin-header {
      background-color: var(--color-navy-dark);
      color: #ffffff;
      padding: 1rem 0;
      border-bottom: 3px solid var(--color-teal-dark);
    }
    .admin-nav-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 1.25rem;
    }
    .logo-mark {
      width: 32px;
      height: 32px;
      background: var(--color-teal-dark);
      color: #ffffff;
      font-weight: 800;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: var(--radius-sm);
    }
    .user-meta {
      display: flex;
      align-items: center;
      gap: 1rem;
      font-size: 0.875rem;
    }
    .btn-sm { padding: 0.35rem 0.875rem; font-size: 0.8125rem; }
    .btn-xs { padding: 0.25rem 0.6rem; font-size: 0.75rem; }

    .admin-tabs {
      display: flex;
      gap: 0.5rem;
      border-bottom: 2px solid var(--color-border);
      padding-bottom: 0.5rem;
      flex-wrap: wrap;
    }
    .tab-btn {
      padding: 0.6rem 1.25rem;
      font-family: var(--font-family-heading);
      font-weight: 600;
      font-size: 0.9375rem;
      background: none;
      border: none;
      cursor: pointer;
      color: var(--color-charcoal-muted);
      border-radius: var(--radius-md);

      &:hover, &.active {
        background-color: var(--color-teal-light);
        color: var(--color-teal-dark);
      }
    }

    .table-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .action-controls {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      flex-wrap: wrap;
    }
    .search-box {
      display: flex;
      align-items: center;
    }
    .form-control {
      padding: 0.5rem 0.75rem;
      font-size: 0.875rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
      width: 100%;
    }
    .form-control-sm {
      padding: 0.35rem 0.6rem;
      font-size: 0.8125rem;
    }
    .form-select {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
    }
    .form-select-sm {
      padding: 0.35rem 0.6rem;
      font-size: 0.8125rem;
    }
    .form-label {
      display: block;
      font-weight: 600;
      font-size: 0.8125rem;
      margin-bottom: 0.35rem;
    }

    .admin-table {
      width: 100%;
      border-collapse: collapse;

      th, td {
        padding: 0.875rem 1rem;
        text-align: left;
        border-bottom: 1px solid var(--color-border);
        font-size: 0.875rem;
      }
      th {
        background-color: var(--color-bg-surface-elevated);
        font-weight: 700;
        color: var(--color-navy-dark);
      }
    }

    .btn-danger {
      background-color: #ef4444;
      color: #ffffff;
      border: none;
      &:hover { background-color: #dc2626; }
    }
    .btn-group {
      display: flex;
      align-items: center;
    }

    .modal-overlay {
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      background: rgba(11, 25, 44, 0.75);
      backdrop-filter: blur(4px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1.5rem;
    }
    .modal-card {
      width: 100%;
      max-width: 700px;
      max-height: 90vh;
      overflow-y: auto;
      background: #ffffff;
      border-radius: var(--radius-lg);
      padding: 1.5rem;
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-border);
    }
    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding-top: 1rem;
      border-top: 1px solid var(--color-border);
    }
    .close-btn {
      background: none;
      border: none;
      font-size: 1.25rem;
      cursor: pointer;
    }
    .desc-box {
      background: var(--color-bg-surface-elevated);
      padding: 1rem;
      border-radius: var(--radius-md);
      font-size: 0.875rem;
    }
    .notes-list {
      background: var(--color-bg-light);
      border: 1px solid var(--color-border);
      padding: 1rem;
      border-radius: var(--radius-md);
      max-height: 200px;
      overflow-y: auto;
    }
    .note-item {
      margin-bottom: 0.75rem;
      font-size: 0.8125rem;
      border-bottom: 1px dashed var(--color-border);
      padding-bottom: 0.5rem;
      p { margin: 0; color: var(--color-navy-dark); }
    }
    .note-author { font-weight: 700; color: var(--color-teal-dark); }

    .grid-2 { display: grid; grid-template-columns: 1fr 1fr; }
    .gap-3 { gap: 1rem; }
    .mb-3 { margin-bottom: 0.75rem; }
    .mb-4 { margin-bottom: 1.5rem; }
    .mt-2 { margin-top: 0.5rem; }
    .mt-3 { margin-top: 0.75rem; }
    .ms-1 { margin-left: 0.25rem; }
    .ms-2 { margin-left: 0.5rem; }
    .me-2 { margin-right: 0.5rem; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  auth = inject(AuthService);
  private api = inject(ApiService);
  private seo = inject(SeoService);

  activeTab = signal<'enquiries' | 'industries' | 'services' | 'portfolio' | 'blog'>('enquiries');

  // Enquiries State
  enquiries = signal<any[]>([]);
  selectedEnquiry = signal<any | null>(null);
  statusFilter = 'ALL';
  enquirySearchQuery = '';
  newNoteText = '';
  isEnquiryModalOpen = signal<boolean>(false);
  newEnquiryForm = {
    name: '',
    company: '',
    email: '',
    telephone: '',
    country: 'Sri Lanka',
    serviceOfInterest: 'Custom Software Development',
    budgetRange: '$10,000 - $25,000',
    preferredContactMethod: 'Email',
    description: '',
  };

  // Industries State
  adminIndustries = signal<any[]>([]);
  industrySearchQuery = signal<string>('');
  industryStatusFilter = signal<string>('ALL');
  isIndustryModalOpen = signal<boolean>(false);
  editingIndustryId = signal<string | null>(null);
  industryForm = {
    title: '',
    slug: '',
    shortDesc: '',
    fullDesc: '',
    useCases: '',
    icon: 'building',
    isPublished: true,
    displayOrder: 0,
    metaTitle: '',
    metaDescription: '',
  };

  // Other Tab Signals
  adminServices = signal<any[]>([]);
  adminPortfolio = signal<any[]>([]);
  adminBlog = signal<any[]>([]);

  ngOnInit() {
    this.seo.updateMeta({ title: 'Admin Dashboard', description: 'Apex Admin Dashboard' });
    this.loadEnquiries();
    this.loadIndustries();
    this.loadServices();
    this.loadPortfolio();
    this.loadBlog();
  }

  // --- ENQUIRIES METHODS ---
  loadEnquiries() {
    this.api.get<any[]>('enquiries/admin/all', {
      status: this.statusFilter,
      search: this.enquirySearchQuery.trim(),
    }).subscribe({
      next: (data) => this.enquiries.set(data),
      error: () => this.enquiries.set([]),
    });
  }

  selectEnquiry(enquiry: any) {
    this.selectedEnquiry.set(enquiry);
  }

  updateStatus(id: string, newStatus: string) {
    this.api.put<any>(`enquiries/admin/${id}/status`, { status: newStatus }).subscribe({
      next: () => {
        this.loadEnquiries();
        if (this.selectedEnquiry()?.id === id) {
          this.selectedEnquiry.update((e) => ({ ...e, status: newStatus }));
        }
      },
    });
  }

  addNote(id: string) {
    if (!this.newNoteText.trim()) return;

    this.api.post<any>(`enquiries/admin/${id}/notes`, { note: this.newNoteText }).subscribe({
      next: (note) => {
        this.newNoteText = '';
        if (this.selectedEnquiry()) {
          const currentNotes = this.selectedEnquiry().notes || [];
          this.selectedEnquiry.update((e) => ({ ...e, notes: [note, ...currentNotes] }));
        }
      },
    });
  }

  deleteEnquiry(id: string, name: string) {
    if (confirm(`Are you sure you want to delete the inquiry from "${name}"?`)) {
      this.api.delete<any>(`enquiries/admin/${id}`).subscribe({
        next: () => {
          this.loadEnquiries();
          if (this.selectedEnquiry()?.id === id) {
            this.selectedEnquiry.set(null);
          }
        },
      });
    }
  }

  openAddEnquiryModal() {
    this.newEnquiryForm = {
      name: '',
      company: '',
      email: '',
      telephone: '',
      country: 'Sri Lanka',
      serviceOfInterest: 'Custom Software Development',
      budgetRange: '$10,000 - $25,000',
      preferredContactMethod: 'Email',
      description: '',
    };
    this.isEnquiryModalOpen.set(true);
  }

  closeEnquiryModal() {
    this.isEnquiryModalOpen.set(false);
  }

  submitNewEnquiry() {
    if (!this.newEnquiryForm.name || !this.newEnquiryForm.email || !this.newEnquiryForm.company) return;

    this.api.post<any>('enquiries', this.newEnquiryForm).subscribe({
      next: () => {
        this.loadEnquiries();
        this.closeEnquiryModal();
      },
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'NEW': return 'badge-navy';
      case 'IN_REVIEW': return 'badge-teal';
      case 'CONTACTED': return 'badge-teal';
      case 'CLOSED': return 'badge-navy';
      default: return 'badge-navy';
    }
  }

  // --- INDUSTRIES METHODS ---
  loadIndustries() {
    this.api.get<any[]>('industries/admin/all').subscribe({
      next: (data) => this.adminIndustries.set(data),
      error: () => this.adminIndustries.set([]),
    });
  }

  filteredIndustries() {
    const query = this.industrySearchQuery().toLowerCase().trim();
    const status = this.industryStatusFilter();

    return this.adminIndustries().filter((ind) => {
      const matchesSearch = !query ||
        (ind.title && ind.title.toLowerCase().includes(query)) ||
        (ind.slug && ind.slug.toLowerCase().includes(query)) ||
        (ind.shortDesc && ind.shortDesc.toLowerCase().includes(query));

      const matchesStatus = status === 'ALL' ||
        (status === 'PUBLISHED' && ind.isPublished) ||
        (status === 'DRAFT' && !ind.isPublished);

      return matchesSearch && matchesStatus;
    });
  }

  onIndustryTitleChange(title: string) {
    if (!this.editingIndustryId()) {
      this.industryForm.slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-');
    }
  }

  openAddIndustryModal() {
    this.editingIndustryId.set(null);
    this.industryForm = {
      title: '',
      slug: '',
      shortDesc: '',
      fullDesc: '',
      useCases: '',
      icon: 'building',
      isPublished: true,
      displayOrder: this.adminIndustries().length + 1,
      metaTitle: '',
      metaDescription: '',
    };
    this.isIndustryModalOpen.set(true);
  }

  openEditIndustryModal(ind: any) {
    this.editingIndustryId.set(ind.id);
    let parsedUseCases = ind.useCases || '';
    try {
      const arr = JSON.parse(ind.useCases);
      if (Array.isArray(arr)) {
        parsedUseCases = arr.join('\n');
      }
    } catch {
      parsedUseCases = ind.useCases || '';
    }

    this.industryForm = {
      title: ind.title || '',
      slug: ind.slug || '',
      shortDesc: ind.shortDesc || '',
      fullDesc: ind.fullDesc || '',
      useCases: parsedUseCases,
      icon: ind.icon || 'building',
      isPublished: ind.isPublished ?? true,
      displayOrder: ind.displayOrder || 0,
      metaTitle: ind.metaTitle || '',
      metaDescription: ind.metaDescription || '',
    };
    this.isIndustryModalOpen.set(true);
  }

  closeIndustryModal() {
    this.isIndustryModalOpen.set(false);
  }

  saveIndustry() {
    if (!this.industryForm.title || !this.industryForm.slug || !this.industryForm.shortDesc) return;

    let useCasesList: string[] = [];
    if (typeof this.industryForm.useCases === 'string') {
      useCasesList = this.industryForm.useCases
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => line.length > 0);
    }

    const payload = {
      ...this.industryForm,
      useCases: JSON.stringify(useCasesList),
      displayOrder: Number(this.industryForm.displayOrder) || 0,
    };

    if (this.editingIndustryId()) {
      this.api.put<any>(`industries/${this.editingIndustryId()}`, payload).subscribe({
        next: () => {
          this.loadIndustries();
          this.closeIndustryModal();
        },
      });
    } else {
      this.api.post<any>('industries', payload).subscribe({
        next: () => {
          this.loadIndustries();
          this.closeIndustryModal();
        },
      });
    }
  }

  deleteIndustry(id: string, title: string) {
    if (confirm(`Are you sure you want to delete industry "${title}"?`)) {
      this.api.delete<any>(`industries/${id}`).subscribe({
        next: () => this.loadIndustries(),
      });
    }
  }

  // --- OTHER TABS ---
  loadServices() {
    this.api.get<any[]>('services/admin/all').subscribe({
      next: (data) => this.adminServices.set(data),
      error: () => this.adminServices.set([]),
    });
  }

  loadPortfolio() {
    this.api.get<any[]>('portfolio/admin/all').subscribe({
      next: (data) => this.adminPortfolio.set(data),
      error: () => this.adminPortfolio.set([]),
    });
  }

  loadBlog() {
    this.api.get<any[]>('blog/admin/all').subscribe({
      next: (data) => this.adminBlog.set(data),
      error: () => this.adminBlog.set([]),
    });
  }
}
