import { Component, OnInit } from '@angular/core';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-continue-carousel',
  templateUrl: './continue-carousel.component.html',
  styleUrls: ['./continue-carousel.component.css'],
  providers: [NgbCarouselConfig]
})
export class ContinueCarouselComponent implements OnInit {
  public checkTwo: boolean = false;
  public checkThree: boolean = false;
  public checkFour: boolean = false;   // 检查轮播图的第二、三、四页是否应该显示
  public timeOne: number = 0;
  public timeTwo: number = 0;
  public timeThree: number = 0;
  public timeFour: number = 0;            // 在第一、二、三、四页的轮播图中应该显示多少张照片
  public cur;           // 当前数组
  public ngLoopTime;    // ul会循环几次
  public cardLoopTime;    // ui会循环几次
  constructor(config: NgbCarouselConfig) {
    // customize default values of carousels used by this component tree
    config.interval = 9999999;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.cur = JSON.parse(window.localStorage.getItem("history"));
    if (this.cur != null){
      this.cur.reverse();
      if (this.cur.length <= 6){
        this.timeOne = this.cur.length;
      }else if ( 7 <= this.cur.length && this.cur.length <= 12){
        this.timeOne = 6;
        this.checkTwo = true;
        this.timeTwo = this.cur.length - 6;
      }else if ( 13 <= this.cur.length && this.cur.length <= 18 ){
        this.timeOne = 6;
        this.timeTwo = 6;
        this.checkTwo = true;
        this.checkThree = true;
        this.timeThree = this.cur.length - 12;
      }else if (19 <= this.cur.length && this.cur.length <= 24){
        this.timeOne = 6;
        this.timeTwo = 6;
        this.timeThree = 6;
        this.checkTwo = true;
        this.checkThree = true;
        this.checkFour = true;
        this.timeFour = this.cur.length - 18;
      }
      else if (this.cur.length > 24){
        this.timeOne = 6;
        this.timeTwo = 6;
        this.timeThree = 6;
        this.timeFour = 6
        this.checkTwo = true;
        this.checkThree = true;
        this.checkFour = true;
      }
    }
  }

  counter(i: number) {
    return new Array(i);
  }

  getindex(x: number, y: number){
    return x + 6*y;
  }

}
