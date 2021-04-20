import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';



import { AppComponent } from './app.component';
import { CarouselComponent } from './components/home-page/carousel/carousel.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ComCarouselComponent } from './components/com-carousel/com-carousel.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { TvDetailPageComponent } from './components/tv-detail-page/tv-detail-page.component';
import { ContinueCarouselComponent } from './components/home-page/continue-carousel/continue-carousel.component';
import { ShareComponent } from './components/share/share.component';

@NgModule({
  declarations: [
    AppComponent,
    CarouselComponent,
    NavbarComponent,
    ComCarouselComponent,
    FooterComponent,
    HomePageComponent,
    ListPageComponent,
    MovieDetailPageComponent,
    TvDetailPageComponent,
    ContinueCarouselComponent,
    ShareComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    AppRoutingModule,
    RouterModule,
    YouTubePlayerModule,
    CommonModule,
    FontAwesomeModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
