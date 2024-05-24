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
  products: any
  currentColor = '#eec1ad'
  imagestore = 'http://localhost:3000'
  snackBarDuration = { duration: 500 }

  constructor(
    private router: Router,
    private dialog: MatDialog,
    private dataService: HttpService,
    private snackBar: MatSnackBar
  ) {
  }
  ngOnInit() {
    this.dataService.data$.subscribe(data => {
      if (data)
        this.currentColor = data;
    });
    this.getProductsData()
  }
  getProductsData() {
    this.dataService.getProducts().subscribe((res: any) => {
      this.products = res
    }
    );
  }
  navigateTo(page: string, id: any) {
    if (page == 'products')
      this.router.navigate(['/products', id]);
    else
      this.router.navigate([page])
  }
  openDialog(operation: string, product: object): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: { operation, product }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { 
        this.getProductsData();
        if (operation == 'edit') this.snackBar.open('Update Product Detail Sucessfully', 'close', this.snackBarDuration)
        else if (operation == 'delete') this.snackBar.open('Product Delete Sucessfully', 'close', this.snackBarDuration)
        else this.snackBar.open('Product Added Sucessfully', 'close', this.snackBarDuration)
      }
    });
  } 
}
