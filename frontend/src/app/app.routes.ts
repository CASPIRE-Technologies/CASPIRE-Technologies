import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { AboutComponent } from './features/about/about.component';
import { ServicesComponent } from './features/services/services.component';
import { ServiceDetailComponent } from './features/services/service-detail.component';
import { IndustriesComponent } from './features/industries/industries.component';
import { IndustryDetailComponent } from './features/industries/industry-detail.component';
import { SolutionsComponent } from './features/solutions/solutions.component';
import { DeliveryProcessComponent } from './features/delivery/delivery.component';
import { InsightsComponent } from './features/insights/insights.component';
import { InsightDetailComponent } from './features/insights/insight-detail.component';
import { ContactComponent } from './features/contact/contact.component';
import { LegalComponent } from './features/legal/legal.component';
import { NotFoundComponent } from './features/error/not-found.component';
import { AdminLoginComponent } from './features/admin/admin-login.component';
import { AdminDashboardComponent } from './features/admin/admin-dashboard.component';
import { authGuard } from './core/guards/auth.guard';
import { ProjectsComponent } from './features/projects/projects.component';
import { LoginComponent } from './features/auth/loging.component';
import { RegisterComponent } from './features/auth/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'CASPIRE Software Engineering | Sri Lanka' },
  { path: 'auth/signin', component: LoginComponent, title: 'Login | CASPIRE Software Engineering' },
  { path: 'auth/signup', component: RegisterComponent, title: 'Register | CASPIRE Software Engineering' },
  { path: 'about', component: AboutComponent, title: 'About Us | CASPIRE Software Engineering' },
  { path: 'services', component: ServicesComponent, title: 'Services Catalog | CASPIRE Software Engineering' },
  { path: 'services/:slug', component: ServiceDetailComponent },
  { path: 'industries', component: IndustriesComponent, title: 'Industry Solutions | CASPIRE Software Engineering' },
  { path: 'industries/:slug', component: IndustryDetailComponent },
  { path: 'solutions', component: SolutionsComponent, title: 'Solution Blueprints | CASPIRE Software Engineering' },
  { path: 'delivery-process', component: DeliveryProcessComponent, title: '9-Step Delivery Process | CASPIRE Software Engineering' },
  { path: 'projects', component: ProjectsComponent, title: 'Case Studies | CASPIRE Software Engineering' },
  { path: 'blog', component: InsightsComponent, title: 'Blog | CASPIRE Software Engineering' },
  { path: 'blog/:slug', component: InsightDetailComponent },
  { path: 'insights', redirectTo: 'blog', pathMatch: 'full' },
  { path: 'insights/:slug', redirectTo: 'blog/:slug' },
  { path: 'contact', component: ContactComponent, title: 'Request Consultation | CASPIRE Software Engineering' },
  { path: 'privacy-policy', component: LegalComponent },
  { path: 'cookie-policy', component: LegalComponent },
  { path: 'terms-of-service', component: LegalComponent },
  { path: 'admin/login', component: AdminLoginComponent, title: 'Admin Login | CASPIRE Software Engineering' },
  { path: 'admin/dashboard', component: AdminDashboardComponent, canActivate: [authGuard], title: 'Admin Dashboard | CASPIRE' },
  { path: 'admin', redirectTo: 'admin/dashboard', pathMatch: 'full' },
  { path: '404', component: NotFoundComponent, title: 'Page Not Found | CASPIRE Software Engineering' },
  { path: '**', redirectTo: '404' }
];
