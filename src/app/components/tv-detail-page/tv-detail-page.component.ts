import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NgbCarouselConfig, NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {of} from 'rxjs';
import {buildMonth} from '@ng-bootstrap/ng-bootstrap/datepicker/datepicker-tools';


@Component({
  selector: 'app-tv-detail-page',
  templateUrl: './tv-detail-page.component.html',
  styleUrls: ['./tv-detail-page.component.css'],
  providers: [NgbCarouselConfig]
})
export class TvDetailPageComponent implements OnInit {
  // 电影信息
  public listMember: boolean = false;   // 判断电影是否在list内
  public showAddedPopup: boolean;
  public showRemovedPopup: boolean;     // 判断加列表弹窗是否出现
  public videoKey: string;
  public name: string;
  public tagline: string;
  public yearetc: any = new Array();  // 包含年份，评分以及时长
  public genres: any = new Array();
  public language: any = new Array();
  public overview: string;
  public duration: string;
  public poster_path: string;
  // 演员信息
  public castProfile: any = new Array();
  public castIDs: any = new Array();
  public castNames: any = new Array();
  public castCharacter: any = new Array();
  public id: any;
  // 演员详情
  public showDetail: boolean = false;
  public castBirthday: any;
  public castBirthPlace: any;
  public castGender: any;
  public castName: any;
  public castHomepage: any;
  public castOtherName: any = new Array();
  public castTalents: any;
  public castBiography: any;
  public castDetailProfile: any;
  public castWebsite: any;
  // 演员社交账号
  public castImdbid: any;
  public castFBid: any;
  public castInsid: any;
  public castTWid: any;
  // 评论信息
  public author: any = new Array();
  public content: any = new Array();
  public reviewDate: any = new Array();
  public reviewUrl: any = new Array();
  public rating: any = new Array();
  public avatar: any = new Array();
  public showReview: boolean = true;
  // 推荐电影
  public recTitles: any = [];
  public recIds: any = [];
  public recImgs: any = [];
  // 相似电影
  public simTitles: any = [];
  public simIds: any = [];
  public simImgs: any = [];
  // mylist列表
  public list: any = [];
  // 地址前缀
  public url = '/tv/';
  public defaulturl = 'https://image.tmdb.org/t/p/w500/';
  public avatarUrl = 'https://image.tmdb.org/t/p/original';
  constructor(public route: ActivatedRoute, public http: HttpClient, config: NgbCarouselConfig) {
    config.interval = 999999;
    config.wrap = false;
    config.keyboard = false;
    config.pauseOnHover = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe((data) => {
      this.id = data.aid;
      this.url = this.url.concat(this.id);
      // console.log(this.url);
    });


    this.http.get(this.url).subscribe(data => {
      // console.log(data);
      // 处理视频信息
      if (data[0][0] == null){
        this.videoKey = 'tzkWB85ULJY';
      }else {
        this.videoKey = data[0][0].key;
      }
      //处理详情信息
      this.poster_path = data[1].poster_path;
      this.name = data[1].name;
      this.tagline = data[1].tagline;
      this.overview = data[1].overview;
      this.yearetc.push(data[1].first_air_date.substring(0, 4), data[1].vote_average, data[1].episode_run_time);
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data[1].genres.length; i++){
        this.genres.push(data[1].genres[i]);
      }
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data[1].spoken_languages.length; i++){
        this.language.push(data[1].spoken_languages[i]);
      }
      this.duration = (this.yearetc[2] - this.yearetc[2] % 60) / 60 + 'hrs ' + this.yearetc[2] % 60 + 'mins';
      this.yearetc[2] = this.duration;
      // 处理演员信息
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data[2].cast.length; i++){
        if (data[2].cast[i].profile_path == null){
          continue;
        }
        this.castProfile.push(data[2].cast[i].profile_path);
        this.castIDs.push(data[2].cast[i].id);
        this.castNames.push(data[2].cast[i].name);
        this.castCharacter.push(data[2].cast[i].character);
        this.castProfile[i] = this.defaulturl.concat(this.castProfile[i]);
      }
      // 处理评论信息
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < data[3].length; i++){
        this.author.push(data[3][i].author);
        this.content.push(data[3][i].content);
        this.reviewDate.push(data[3][i].created_at);
        this.reviewUrl.push(data[3][i].url);
        this.rating.push(data[3][i].author_details.rating);
        this.avatar.push(data[3][i].author_details.avatar_path);
        console.log(this.avatar[i]);
        this.avatar[i] = this.avatarUrl.concat(this.avatar[i]);
        // 防止评分为空
        if (this.rating[i] == null){
          this.rating[i] = 0;
        }
      }
      console.log(this.showReview);
      // 处理推荐、相似电影数据
      for (let i = 0; i < 20 ; i++){
        // 推荐
        this.recImgs.push(data[4][i].poster_path);
        this.recTitles.push(data[4][i].name);
        this.recIds.push(data[4][i].id);
        this.recIds[i] = 'watch/tv/'.concat(this.recIds[i]);
        this.recImgs[i] = this.defaulturl.concat(this.recImgs[i]);
        // 相似
        this.simImgs.push(data[5][i].poster_path);
        this.simTitles.push(data[5][i].name);
        this.simIds.push(data[5][i].id);
        this.simIds[i] = 'watch/tv/'.concat(this.simIds[i]);
        this.simImgs[i] = this.defaulturl.concat(this.simImgs[i]);
      }
      // console.log(this.simImgs);
      // console.log(this.simIds);
      // console.log(this.simTitles);
    });

    this.list = JSON.parse(localStorage.getItem("list"));
    if (this.list != null){
      for(let i = 0; i<this.list.length; i++){
        if (this.list[i].id == this.url){
          this.listMember = true;
        }
      }
    }
    console.log(this.reviewDate);

  }
  // 关闭演员详情窗口
  closeDetail(){
    this.showDetail = false;
  }

  // 获取演员的详情信息
  getCastDetail(id){
    this.showDetail = true;
    this.http.get('/cast/' + id).subscribe((data) => {
      // console.log(data);
      this.castBirthday = data[0].birthday;
      this.castBirthPlace = data[0].place_of_birth;
      if(data[0].gender == 2){
        this.castGender = 'Male';
      }else{
        this.castGender = 'Female';
      }
      this.castName = data[0].name;
      this.castHomepage = data[0].homepage;
      this.castOtherName = data[0].also_known_as;
      this.castTalents = data[0].known_for_department;
      this.castBiography = data[0].biography;
      this.castDetailProfile = data[0].profile_path;
      this.castWebsite = data[0].homepage;
      this.castImdbid = data[1].imdb_id;
      console.log(this.castImdbid);
      if (this.castImdbid != null){
        this.castImdbid = 'https://www.imdb.com/name/'.concat(this.castImdbid);
        this.castImdbid = this.castImdbid + '/';
      }
      this.castFBid = data[1].facebook_id;
      if (this.castFBid != null){
        this.castFBid = 'https://www.facebook.com/'.concat(this.castFBid);
      }
      this.castInsid = data[1].instagram_id;
      if (this.castInsid != null){
        this.castInsid = 'https://www.instagram.com/'.concat(this.castInsid);
        this.castInsid = this.castInsid + '/';
      }
      this.castTWid = data[1].twitter_id;
      if (this.castTWid != null){
        this.castTWid = 'https://twitter.com/'.concat(this.castTWid);
      }
      this.castDetailProfile = this.defaulturl.concat(this.castDetailProfile);
      // console.log(this.castBirthday);
    });
  }

  addToList(id, img, title){
    this.showAddedPopup = true;
    this.listMember = true;
    img = this.defaulturl.concat(img);
    if(!localStorage.getItem('list')){
      let list = [];
      localStorage.setItem("list", JSON.stringify(list));
    }
    let currentlist = JSON.parse(localStorage.getItem("list"));
    currentlist.push({id: id, img: img, title: title})
    localStorage.setItem("list", JSON.stringify(currentlist));
  }

  removeFromList(id){
    this.showRemovedPopup = true;
    console.log(localStorage.getItem('list'));
    console.log("删除");
    this.listMember = false;
    let currentlist = JSON.parse(localStorage.getItem('list'));
    for (let i = 0; i<currentlist.length; i++){
      if (currentlist[i].id == id){
        currentlist.splice(i, 1);
        break;
      }
    }
    localStorage.setItem("list", JSON.stringify(currentlist));
    // console.log(localStorage.getItem('list'));
    if (JSON.parse(localStorage.getItem("list")).length == 0){
      localStorage.removeItem("list");
    }
  }

  // 改变弹窗状态
  changeAddPopup(){
    this.showAddedPopup = false;
  }

  changeRemovePopup(){
    this.showRemovedPopup = false;
  }

  imgError(image){
    image.parentNode.parentNode.style.display = 'none';
  }

  getDate(time):any{
    let tmp;
    let timestr;
    tmp = time.slice(5, 7);
    if (tmp == "01"){
      timestr = "January "
    }else if (tmp == "02"){
      timestr = "February "
    }else if (tmp == "03"){
      timestr = "March "
    }else if (tmp == "04"){
      timestr = "April "
    }else if (tmp == "05"){
      timestr = "May "
    }else if (tmp == "06"){
      timestr = "June "
    }else if (tmp == "07"){
      timestr = "July "
    }else if (tmp == "08"){
      timestr = "August "
    }else if (tmp == "09"){
      timestr = "September "
    }else if (tmp == "10"){
      timestr = "October "
    }else if (tmp == "11"){
      timestr = "November "
    }else{
      timestr = "December "
    }
    tmp = time.slice(8, 10);
    if (tmp == "01" || tmp == "02" || tmp == "03" || tmp == "04" || tmp == "05" || tmp == "06" || tmp == "07" || tmp == "08" || tmp == "09"){
      tmp = tmp.slice(1, 2);
    }
    timestr = timestr.concat(tmp) + ", ";
    tmp = time.slice(0, 4);
    timestr = timestr.concat(tmp) + ", ";
    tmp = tmp = time.slice(11, 19);
    timestr = timestr.concat(tmp) + " ";
    if(parseInt(tmp.slice(0, 2))<=11){
      tmp = "AM";
    }else{
      tmp = "PM";
    }
    timestr = timestr.concat(tmp);
    return timestr;
  }

}
