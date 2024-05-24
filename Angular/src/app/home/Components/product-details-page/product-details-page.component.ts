import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-product-details-page',
  templateUrl: './product-details-page.component.html',
  styleUrls: ['./product-details-page.component.scss']
})
export class ProductDetailsPageComponent {
  singleProduct!: any
  imagestore = 'http://localhost:3000'
  currentColor = '#eec1ad'
  constructor(
    private route: ActivatedRoute,
    private dataService: HttpService,
    private router: Router
  ) { }
  ngOnInit(): void {
    this.dataService.data$.subscribe(data => {
      if (data)
        this.currentColor = data;
    });
    const singleProductId = this.route.snapshot.paramMap.get('id')
    console.log(singleProductId)
    this.dataService.singleProduct(singleProductId).subscribe((response) => {
      if (response) {
        this.singleProduct = response
      }
    })
  }
  navigateTo(page: string) {
    this.router.navigate([page])
  }
}
