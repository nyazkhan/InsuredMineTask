import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AboutComponent } from './module/about/about.component';
import { GalleryComponent } from './module/gallery/gallery.component';
import { HomeComponent } from './module/home/home.component';
import { SharedModule } from './shared/shared.module';
import { AutocompleteComponent } from './module/autocomplete/autocomplete.component';

@NgModule({
  declarations: [AppComponent,
    HomeComponent,
    AboutComponent,
    GalleryComponent,
    AutocompleteComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
