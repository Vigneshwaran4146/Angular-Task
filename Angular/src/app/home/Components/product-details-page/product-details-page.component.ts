import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpService } from 'src/app/services/http.service';

export interface Product {
  id: number;
  name: string;
  image: string;
  price: number;
  description: string;
}

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent implements OnInit {

  // Variable to store the details of a single product
  singleProduct: Product={
  id: 0,
  name: '',
  image: '',
  price: 0,
  description: ''
  };

  // Base URL for the image store
  imageStore: string= 'http://localhost:3000';

  // Variable to store the current color
  currentColor: string = '#eec1ad';

  // Constructor with dependency injection of ActivatedRoute, HttpService, and Router
  constructor(
    private route: ActivatedRoute,
    private dataService: HttpService,
    private router: Router
  ) { }

  /**
   * Angular lifecycle hook ngOnInit
   */
  ngOnInit(): void {
    // Subscribe to the shared data service to get the current color
    this.dataService.data$.subscribe((data:string|null) => {
      if (data) {
        this.currentColor = data;
      }
    });

    // Get the ID of the single product from the route parameters
    const singleProductId = this.route.snapshot.paramMap.get('id');

    // Fetch details of the single product from the service
    this.dataService.singleProduct(singleProductId).subscribe((response: Product) => {
      if (response) {
        this.singleProduct = response;
      }
    });
  }

  /**
   * Method to navigate to a specified page
   * @param page - The page to navigate to
   */
  navigateTo(page: string): void {
    this.router.navigate([page]);
  }
}
