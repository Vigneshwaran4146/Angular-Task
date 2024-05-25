import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpService } from 'src/app/services/http.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent {

  @ViewChild('noProducts') noProducts: TemplateRef<any> | undefined;
  
  // Array to store product data
  products!:Array<any>;

  // Current color selected
  currentColor: string = '#eec1ad';

  // Base URL for the image store
  imageStore: string = 'http://localhost:3000';

  // Duration configuration for snackbar messages
  snackBarDuration = { duration: 500 };

  // Constructor with dependency injection of Router, MatDialog, HttpService, and MatSnackBar
  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dataService: HttpService,
    private snackBar: MatSnackBar
  ) {}

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
    // Fetch products data
    this.getProductsData();
  }

  /**
   * Method to fetch products data from the server
   */
  getProductsData(): void {
    this.dataService.getProducts().subscribe((res: any) => {
      this.products = res;
    });
  }

  /**
   * Method to navigate to a specified page
   * @param page - The page to navigate to
   * @param id - The ID of the product (if applicable)
   */
  navigateTo(page: string, id: any): void {
    if (page === 'products') {
      this.router.navigate(['/products', id]);
    } else {
      this.router.navigate([page]);
    }
  }

  /**
   * Method to open a dialog for adding, updating, or deleting a product
   * @param operation - The operation to perform ('add', 'edit', 'delete')
   * @param product - The product object (if applicable)
   */
  openDialog(operation: string, product: object): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { operation, product }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.getProductsData();
        if (operation === 'edit') {
          this.snackBar.open('Update Product Detail Successfully', 'close', this.snackBarDuration);
        } else if (operation === 'delete') {
          this.snackBar.open('Product Deleted Successfully', 'close', this.snackBarDuration);
        } else {
          this.snackBar.open('Product Added Successfully', 'close', this.snackBarDuration);
        }
      }
    });
  } 
}
