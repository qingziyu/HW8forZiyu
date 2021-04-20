import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styleUrls: ['./list-page.component.css']
})
export class ListPageComponent implements OnInit {
  public currentList: any = new Array();
  public showItems: boolean = false;

  constructor() { }

  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem("list")))
    if (localStorage.getItem("list") != null) {
      if (localStorage.getItem('list').length != 0){
        this.currentList = JSON.parse(localStorage.getItem("list"));
        this.showItems = true;
      }
    }
    console.log(this.currentList.id);
    // console.log(localStorage.getItem("list").length);
    // console.log(localStorage.getItem("list"));
  }
}
