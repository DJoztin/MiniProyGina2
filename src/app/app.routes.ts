import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { ExtraviosComponent } from './components/extravios/extravios.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { CreditsComponent } from './components/credits/credits.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full',
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'extravios',
    component: ExtraviosComponent,
  },
  {
    path: 'credits',
    component: CreditsComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'logout',
    component: LoginComponent,
  },
  {
    path: 'hotels',
    component: HotelsComponent,
  },
  {
    path: 'hotel/:id',
    component: HotelComponent,
  },
  {
    path: 'admin',
    component: AdminPanelComponent,
  }
];
