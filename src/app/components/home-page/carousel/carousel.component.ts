import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent implements OnInit {
  images: any = [];
  titles: any = [];
  ids: any = [];
  paused = false;
  unpauseOnArrow = false;
  pauseOnIndicator = false;
  pauseOnHover = true;
  pauseOnFocus = true;
  defaulturl = 'watch/movie/';
  defaultpicurl = 'https://image.tmdb.org/t/p/w500';
  storeImg: any = [];
  // 用于发送storedata参数
  @ViewChild('carousel', {static : true}) carousel: NgbCarousel;
  togglePaused(): void {
    if (this.paused) {
      this.carousel.cycle();
    } else {
      this.carousel.pause();
    }
    this.paused = !this.paused;
  }
  onSlide(slideEvent: NgbSlideEvent): void {
    if (this.unpauseOnArrow && slideEvent.paused &&
      (slideEvent.source === NgbSlideEventSource.ARROW_LEFT || slideEvent.source === NgbSlideEventSource.ARROW_RIGHT)) {
      this.togglePaused();
    }
    if (this.pauseOnIndicator && !slideEvent.paused && slideEvent.source === NgbSlideEventSource.INDICATOR) {
      this.togglePaused();
    }
  }
  constructor(public http: HttpClient ) { }

  ngOnInit(): void {
    this.http.get('/slideshow').subscribe(data => {
      // console.log(data);
      for (let i = 0; i < 5; i++){
        this.images.push(data[i].backdrop_path);
        this.storeImg.push(data[i].backdrop_path);
        this.titles.push(data[i].title);
        this.ids.push(data[i].ID);
        this.ids[i] = this.defaulturl.concat(this.ids[i]);
        this.storeImg[i] = this.defaultpicurl.concat(this.storeImg[i]);
      }
      // console.log(this.storeImg);
      // console.log(this.titles);
      // console.log(this.ids);
      this.images = [this.images[0], this.images[1], this.images[2], this.images[3], this.images[4]].map((n) => `https://image.tmdb.org/t/p/original${n}`);
    });
    // console.log(localStorage);
  }


  storeData(id, img, title){
    if(!localStorage.getItem('history')){
      let history = [];
      // console.log("现在还没有history");
      localStorage.setItem("history", JSON.stringify(history));
    }
    let currenthistory = JSON.parse(localStorage.getItem("history"));
    for(let i=0;i<currenthistory.length;i++){
      if(currenthistory[i].id==id) {
        // console.log("该电影已经添加过") ;
        return
      }
    }
    currenthistory.push({ id: id, title: title, img: img });
    localStorage.setItem("history",JSON.stringify(currenthistory));
  }


}

