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
          <button (click)="activeTab.set('enquiries')" [class.active]="activeTab() === 'enquiries'" class="tab-btn">Enquiries Manager</button>
          <button (click)="activeTab.set('services')" [class.active]="activeTab() === 'services'" class="tab-btn">Services Manager</button>
          <button (click)="activeTab.set('portfolio')" [class.active]="activeTab() === 'portfolio'" class="tab-btn">Portfolio Projects</button>
          <button (click)="activeTab.set('blog')" [class.active]="activeTab() === 'blog'" class="tab-btn">Blog Articles</button>
        </div>

        <!-- 1. Enquiries Manager Tab -->
        <div *ngIf="activeTab() === 'enquiries'" class="tab-content">
          <div class="table-header">
            <h2>Submitted Consultation Enquiries</h2>
            <div class="filter-controls">
              <select [(ngModel)]="statusFilter" (change)="loadEnquiries()" class="form-select">
                <option value="ALL">All Statuses</option>
                <option value="NEW">NEW</option>
                <option value="IN_REVIEW">IN REVIEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="CLOSED">CLOSED</option>
              </select>
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
                    <button (click)="selectEnquiry(enq)" class="btn btn-secondary btn-xs">View & Notes</button>
                  </td>
                </tr>
                <tr *ngIf="enquiries().length === 0">
                  <td colspan="7" class="text-center p-4">No enquiries found.</td>
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
        </div>

        <!-- 2. Services Manager Tab -->
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

        <!-- 3. Portfolio Projects Tab -->
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

        <!-- 4. Blog Articles Tab -->
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
    }
    .form-select {
      padding: 0.5rem 1rem;
      font-size: 0.875rem;
      border: 1px solid var(--color-border);
      border-radius: var(--radius-md);
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
    }
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-bottom: 1rem;
      border-bottom: 1px solid var(--color-border);
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
    .ms-2 { margin-left: 0.5rem; }
  `]
})
export class AdminDashboardComponent implements OnInit {
  auth = inject(AuthService);
  private api = inject(ApiService);
  private seo = inject(SeoService);

  activeTab = signal<'enquiries' | 'services' | 'portfolio' | 'blog'>('enquiries');
  
  enquiries = signal<any[]>([]);
  adminServices = signal<any[]>([]);
  adminPortfolio = signal<any[]>([]);
  adminBlog = signal<any[]>([]);
  
  selectedEnquiry = signal<any | null>(null);
  statusFilter = 'ALL';
  newNoteText = '';

  ngOnInit() {
    this.seo.updateMeta({ title: 'Admin Dashboard', description: 'Apex Admin Dashboard' });
    this.loadEnquiries();
    this.loadServices();
    this.loadPortfolio();
    this.loadBlog();
  }

  loadEnquiries() {
    this.api.get<any[]>('enquiries/admin/all', { status: this.statusFilter }).subscribe({
      next: (data) => this.enquiries.set(data),
      error: () => this.enquiries.set([]),
    });
  }

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

  selectEnquiry(enquiry: any) {
    this.selectedEnquiry.set(enquiry);
  }

  updateStatus(id: string, newStatus: string) {
    this.api.put<any>(`enquiries/admin/${id}/status`, { status: newStatus }).subscribe({
      next: (updated) => {
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

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'NEW': return 'badge-navy';
      case 'IN_REVIEW': return 'badge-teal';
      case 'CONTACTED': return 'badge-teal';
      case 'CLOSED': return 'badge-navy';
      default: return 'badge-navy';
    }
  }
}
