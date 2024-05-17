import { Component, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-product-list-page',
  templateUrl: './product-list-page.component.html',
  styleUrls: ['./product-list-page.component.scss']
})
export class ProductListPageComponent {
  @ViewChild('noProducts') noProducts: TemplateRef<any> | undefined;
  products=[
    {
       id:1,
       name:"product-1",
       price:"₹100.00",
       image:"assets/sample.png"
    },
    {
      id:1,
      name:"product-2",
      price:"₹200.00",
      image:"assets/sample.png"
   },
   {
    id:1,
    name:"product-3",
    price:"₹300.00",
    image:"assets/giftframe.jpeg"
 },
 {
  id:1,
  name:"product-1",
  price:"₹100.00",
  image:"assets/sample.png"
},
{
 id:1,
 name:"product-2",
 price:"₹200.00",
 image:"assets/sample.png"
},
{
id:1,
name:"product-3",
price:"₹300.00",
image:"assets/giftframe.jpeg"
},
{
  id:1,
  name:"product-1",
  price:"₹100.00",
  image:"assets/sample.png"
},
{
 id:1,
 name:"product-2",
 price:"₹200.00",
 image:"assets/sample.png"
},
{
id:1,
name:"product-3",
price:"₹300.00",
image:"assets/giftframe.jpeg"
},
{
  id:1,
  name:"product-1",
  price:"₹100.00",
  image:"assets/sample.png"
},
{
 id:1,
 name:"product-2",
 price:"₹200.00",
 image:"assets/sample.png"
},
{
id:1,
name:"product-3",
price:"₹300.00",
image:"assets/giftframe.jpeg"
}
  ]
  constructor(
    private router: Router,
    private dialog: MatDialog
  ){ 
  }
  ngOnInit(){

  }
  navigateTo(page:string){
    this.router.navigateByUrl('/'+page)
  }
  addProduct( option :string,template:string){
    this.dialog.open(DialogComponent,{ 
    })
    
  }
}
