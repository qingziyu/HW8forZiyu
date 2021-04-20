import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {HttpClient} from '@angular/common/http';
import {concat} from 'rxjs';

var storage=window.localStorage;
console.log(storage);
// storage.clear();
storage.index=0;


@Component({
  selector: 'app-com-carousel',
  templateUrl: './com-carousel.component.html',
  styleUrls: ['./com-carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class ComCarouselComponent implements  OnInit {
  images: any = [];
  titles: any = [];
  ids: any = [];
  @Input() dataReceived: any = 'Defaultdata';
  // images = [700, 533, 807, 124].map((n) => `https://picsum.photos/id/${n}/900/500`);


  constructor(config: NgbCarouselConfig, public http: HttpClient ) {
    // customize default values of carousels used by this component tree
    config.interval = 9999999;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }
  ngOnInit(): void {
    const weburl = 'https://image.tmdb.org/t/p/w500';
    const type = this.dataReceived[2];
    this.http.get(this.dataReceived[0]).subscribe(data => {
        // console.log(data);
        for (let i = 0; i < 20 ; i++){
          this.images.push(data[i].poster_path);
          if (data[i].title == null){
            this.titles.push(data[i].name);
          }else{
            this.titles.push(data[i].title);
          }
          this.ids.push(data[i].ID);
          this.ids[i] = type.concat(this.ids[i]);
          this.images[i] = weburl.concat(this.images[i]);
        }
        // console.log(this.ids);
        // console.log(typeof this.images[1]);
        // console.log(this.images[1]);
    });
  }
  storeData(id, img, title){
    if(!storage.getItem('history')){
      let history = [];
      // console.log("现在还没有history");
      storage.setItem("history", JSON.stringify(history));
    }
    let currenthistory = JSON.parse(storage.getItem("history"));
    for(let i=0;i<currenthistory.length;i++){
      if(currenthistory[i].id==id) {
        // console.log("该电影已经添加过") ;
        return
      }
    }
    currenthistory.push({ id: id, title: title, img: img });
    storage.setItem("history",JSON.stringify(currenthistory));
  }

  imgError(image){
    image.parentNode.parentNode.style.display = 'none';
  }
}
