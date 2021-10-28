import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { AboutComponent } from './module/about/about.component';
import { GalleryComponent } from './module/gallery/gallery.component';
import { HomeComponent } from './module/home/home.component';
import { LoginComponent } from './shared/login/login.component';
const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'gallery', component: GalleryComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
