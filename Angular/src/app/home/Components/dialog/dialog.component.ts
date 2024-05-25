import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  // Form group for product details
  product!: FormGroup;

  // File object for the uploaded image
  file!: File;

  // Source for the image preview
  imageSrc: any;

  // Array containing dialog configurations for different operations
  dialogChanges: { dialogHeading: string, save: string, cancel: string }[] = [
    {
      dialogHeading: 'Add Product Detail',
      save: 'Upload',
      cancel: 'Cancel'
    },
    {
      dialogHeading: 'Update Product Detail',
      save: 'Update',
      cancel: 'Cancel'
    },
    {
      dialogHeading: 'Delete Product',
      save: 'Yes',
      cancel: 'No'
    }
  ];

  // Constructor with dependency injection of MatDialogRef, HttpService, and MAT_DIALOG_DATA
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private dataService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  /**
   * Angular lifecycle hook ngOnInit
   */
  ngOnInit(): void {
    this.formInitialize();
  }

  /**
   * Method to initialize the form for adding or updating a product
   */
  formInitialize(): void {
    this.product = new FormGroup({
      id: new FormControl(this.data?.product?.id ? this.data.product.id : null),
      name: new FormControl(this.data?.product?.name ? this.data.product.name : null, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]),
      price: new FormControl(this.data?.product?.price ? this.data.product.price : null, Validators.pattern("^[0-9]*$")),
      description: new FormControl(this.data?.product?.description ? this.data.product.description : null, [Validators.required]),
    });

    if (this.data?.product?.image) {
      this.file = this.data.product.image;
    }
  }

  /**
   * Method to handle file input changes
   * @param event - The file input change event
   */
  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imageSrc = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  /**
   * Method to handle the upload operation for adding, updating, or deleting a product
   * @param operation - The type of operation ('delete', 'update', or 'add')
   * @param id - The product ID
   */
  onUpload(operation: string, id: number): void {
    if (operation === 'delete') {
      this.dataService.deleteProduct(id).subscribe((response: any) => {
        this.dialogRef.close(response);
      });
    } else if (this.product.valid && this.file) {
      const productData = new FormData();
      productData.append('image', this.file);
      productData.append('name', this.product.get('name')?.value);
      productData.append('price', this.product.get('price')?.value);
      productData.append('description', this.product.get('description')?.value);

      if (this.product.get('id')?.value) {
        productData.append('id', this.product.get('id')?.value);
        this.dataService.editProduct(productData).subscribe((response: any) => {
          this.dialogRef.close(response);
        });
      } else {
        productData.append('id', Date.now().toString());
        this.dataService.addProduct(productData).subscribe((response: any) => {
          this.dialogRef.close(response);
        });
      }
    }
  }
}
