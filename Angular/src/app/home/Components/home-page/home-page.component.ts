import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  constructor(private router: Router, private sharedDataService: HttpService) { }
  colors: string[] = ['#eec1ad', '#dbac98', '#d29985', '#c98276', 'wheat', 'red', 'blue'];
  currentColor = '#eec1ad'
  colorIndex: number = 0;
  ngOnInit() {
    this.sharedDataService.data$.subscribe(data => {
      console.log("d", data)
      if (data) {
        this.currentColor = data;
      }
    });
  }
  changeColor() {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    this.currentColor = this.colors[this.colorIndex];
    this.sendData()
  }
  navigateTo() {
    this.router.navigate(['/products'])
  }
  sendData() {
    this.sharedDataService.setData(this.currentColor);
  }
}
