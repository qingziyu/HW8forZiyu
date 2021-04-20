import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomePageComponent } from './components/home-page/home-page.component';
import { ListPageComponent } from './components/list-page/list-page.component';
import { MovieDetailPageComponent } from './components/movie-detail-page/movie-detail-page.component';
import { TvDetailPageComponent } from './components/tv-detail-page/tv-detail-page.component';

const routes: Routes = [
  {
    path: '', component: HomePageComponent
  },
  {
    path: 'mylist', component: ListPageComponent
  },
  {
    path: 'watch/movie/:aid', component: MovieDetailPageComponent
  },
  {
    path: 'watch/tv/:aid', component: TvDetailPageComponent
  },
  {
    path: '**', redirectTo: ''
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
