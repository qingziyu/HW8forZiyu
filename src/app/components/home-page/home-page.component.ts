import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  public popMovMessage: string[] = ['/popMov', 'Popular Movies', 'watch/movie/'];
  public ratedMovMessage: string[] = ['/ratedMov', 'Top Rated Movies', 'watch/movie/'];
  public trendingMovMessage: string[] = ['/trendingMov', 'Trending Movies', 'watch/movie/'];
  public popTVMessage: string[] = ['/popTV', 'Popular TV Shows', 'watch/tv/'];
  public ratedTVMessage: string[] = ['/ratedTV', 'Top Rated TV Shows', 'watch/tv/'];
  public trendingTVMessage: string[] = ['/trendingTV', 'Trending TV Shows', 'watch/tv/'];
  constructor() { }

  ngOnInit(): void {
  }

}
