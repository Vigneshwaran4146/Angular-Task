import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {

  // Variable to store the current color
  currentColor: string = '#eec1ad';

  // Constructor with dependency injection of HttpService
  constructor(private dataService: HttpService) { }

  /**
   * Angular lifecycle hook ngOnInit
   */
  ngOnInit(): void {
    this.dataService.data$.subscribe((data:string|null) => {
      if (data) {
        this.currentColor = data;
      }
    });
  }
}
