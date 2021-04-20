import { Component, OnInit, Injectable, ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, OperatorFunction } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, tap, switchMap } from 'rxjs/operators';

const url = '/search';


const PARAMS = new HttpParams({
  fromObject: {
    action: 'opensearch',
    format: 'json',
    origin: '*',
  }
});


@Injectable()
export class WikipediaService {
  constructor(private http: HttpClient) { }

  search(term: string) {
    if (term === '') {
      return of([]);
    }

    return this.http
      .get<[any, string[]]>(url, { params: PARAMS.set('search', term) }).pipe(
        map(response => {
          return response
        })
      );
  }

}


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  providers: [WikipediaService],
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  model: any;
  searching = false;
  searchFailed = false;
  searchResult: Array<any> = [];

  constructor(private _service: WikipediaService) { }

  search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.searching = true),

      switchMap(term =>
        this._service.search(term).pipe(
          tap((a) => {
            this.searchFailed = false
          }
          ),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          }))
      ),
      tap(() => this.searching = false)
    )

  ngOnInit(): void {
  }


  formatter = (x: { name: string }) => x.name;

}
