import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  // Array of color codes
  colors: string[] = ['#eec1ad', '#dbac98', '#d29985', '#c98276', 'wheat'];

  // Current color selected
  currentColor: string = '#eec1ad';

  // Index of the current color in the colors array
  colorIndex: number = 0;

  // Constructor with dependency injection of Router and HttpService
  constructor(private router: Router, private sharedDataService: HttpService) { }

  // Lifecycle hook that is called after data-bound properties are initialized
  ngOnInit(): void {
    this.sharedDataService.data$.subscribe((data:string|null) => {
      if (data) {
        this.currentColor = data;
      }
    });
  }

  // Method to change the color to the next one in the colors array
  changeColor(): void {
    this.colorIndex = (this.colorIndex + 1) % this.colors.length;
    this.currentColor = this.colors[this.colorIndex];
    this.sendData();
  }

  // Method to navigate to the products page
  navigateTo(): void {
    this.router.navigate(['/products']);
  }

  // Method to send the current color to the shared data service
  sendData(): void {
    this.sharedDataService.setData(this.currentColor);
  }
}
