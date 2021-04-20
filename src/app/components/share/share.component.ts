import { Component, OnInit, Input } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.css']
})
export class ShareComponent implements OnInit {
  public TWurl: any;
  public FBurl: any;
  public shareContent: any;
  public youtubeUrl: any;

  constructor() { }

  ngOnInit(): void {
  }

}
