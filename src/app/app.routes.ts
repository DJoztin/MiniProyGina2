import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';

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
