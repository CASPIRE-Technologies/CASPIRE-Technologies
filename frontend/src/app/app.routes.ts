import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ServicesComponent } from './features/services/services.component';
import { ServiceDetailComponent } from './features/services/service-detail.component';
import { IndustriesComponent } from './features/industries/industries.component';
import { IndustryDetailComponent } from './features/industries/industry-detail.component';
import { SolutionsComponent } from './features/solutions/solutions.component';
import { DeliveryProcessComponent } from './features/delivery/delivery.component';
import { PortfolioComponent } from './features/portfolio/portfolio.component';
import { InsightsComponent } from './features/insights/insights.component';
import { InsightDetailComponent } from './features/insights/insight-detail.component';
import { ContactComponent } from './features/contact/contact.component';
import { LegalComponent } from './features/legal/legal.component';
import { NotFoundComponent } from './features/error/not-found.component';
import { AdminLoginComponent } from './features/admin/admin-login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Apex Software Engineering | Sri Lanka' },
  { path: 'about', component: AboutComponent, title: 'About Us | Apex Software Engineering' },
  { path: 'services', component: ServicesComponent, title: 'Services Catalog | Apex Software Engineering' },
  { path: 'services/:slug', component: ServiceDetailComponent },
  { path: 'industries', component: IndustriesComponent, title: 'Industry Solutions | Apex Software Engineering' },
  { path: 'industries/:slug', component: IndustryDetailComponent },
  { path: 'solutions', component: SolutionsComponent, title: 'Solution Blueprints | Apex Software Engineering' },
  { path: 'delivery-process', component: DeliveryProcessComponent, title: '9-Step Delivery Process | Apex Software Engineering' },
  { path: 'portfolio', component: PortfolioComponent, title: 'Case Studies | Apex Software Engineering' },
  { path: 'blog', component: InsightsComponent, title: 'Blog | Apex Software Engineering' },
  { path: 'blog/:slug', component: InsightDetailComponent },
  { path: 'insights', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'insights/:slug', redirectTo: 'blog/:slug' },
  { path: 'contact', component: ContactComponent, title: 'Request Consultation | Apex Software Engineering' },
  { path: 'privacy-policy', component: LegalComponent },
  { path: 'cookie-policy', component: LegalComponent },
  { path: 'terms-of-service', component: LegalComponent },
  { path: 'admin/login', component: AdminLoginComponent, title: 'Admin Login | Apex Software Engineering' },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard], title: 'Admin Dashboard | Apex' },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent, title: 'Page Not Found | Apex Software Engineering' },
  { path: '**', redirectTo: '404' }
];
