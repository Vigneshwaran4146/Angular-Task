import { Component, Inject, TemplateRef, ViewChild, } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'; 
import { HttpService } from 'src/app/services/http.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent {
  product!: FormGroup
  file!: File
  imageSrc!: any;
  dialogChanges = [{
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
    save: 'yes',
    cancel: 'No'
  }
  ] 
  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private dataService: HttpService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  /**
   * Angular life cycle ngOnInit
   */
  ngOnInit(): void {
    this.formIntilize()
  } 
  /**
   * Method is used to initilize  form for update and add the product
   */
  formIntilize() {
    this.product = new FormGroup({
      id: new FormControl(this.data?.product?.id ? this.data?.product?.id : null),
      name: new FormControl(this.data?.product?.name ? this.data?.product?.name : null, [Validators.required,Validators.pattern('^[a-zA-Z ]*$')]),
      price: new FormControl(this.data?.product?.price ? this.data?.product?.price : null, Validators.pattern("^[0-9]*$")),
      description: new FormControl(this.data?.product?.description ? this.data?.product?.description : null,[Validators.required]),
    })
    if (this.data?.product?.image) {
      this.file = this.data?.product?.image
    }
  } 
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
  onUpload(operation: string, id: number): void {
    if (operation == 'delete') {
      this.dataService.deleteproduct(id).subscribe((response) => {
        this.dialogRef.close(response);
      })
    }
    else if (this.product.valid && this.file) {
      const productData = new FormData();
      productData.append('image', this.file);
      productData.append('name', this.product.get('name')?.value);
      productData.append('price', this.product.get('price')?.value);
      productData.append('description',this.product.get('description')?.value)
      if (this.product?.get('id')?.value) {
        productData.append('id', this.product?.get('id')?.value)
        this.dataService.editProduct(productData).subscribe((response) => {
          this.dialogRef.close(response);
        });
      }
      else {
        productData.append('id', Date.now().toString());
        this.dataService.addProduct(productData).subscribe((response) => {
          this.dialogRef.close(response);
        });
      }
    }
  }
}
