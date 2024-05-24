import { Component } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {
  currentColor = '#eec1ad'
  constructor(private dataService: HttpService) { }
  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data)
        this.currentColor = data;
    });
  }
}
