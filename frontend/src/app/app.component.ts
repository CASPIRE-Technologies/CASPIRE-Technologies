import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { CookieBannerComponent } from './shared/components/cookie-banner/cookie-banner.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CookieBannerComponent],
  template: `
    <app-header></app-header>
    <main id="main-content" role="main">
      <router-outlet></router-outlet>
    </main>
    <app-footer></app-footer>
    <app-cookie-banner></app-cookie-banner>
  `,
  styles: [`
    #main-content {
      min-height: calc(100vh - 72px - 350px);
    }
  `]
})
export class AppComponent {}
