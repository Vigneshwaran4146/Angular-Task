import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductListPageComponent } from './Components/product-list-page/product-list-page.component';
import { ProductDetailsPageComponent } from './Components/product-details-page/product-details-page.component';
import { MaterialsModule } from '../materials/materials.module';
import { DialogComponent } from './Components/dialog/dialog.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';  


@NgModule({
  declarations: [
    HomePageComponent,
    ProductListPageComponent,
    ProductDetailsPageComponent,
    DialogComponent,
    PageNotFoundComponent, 
  ],
  imports: [
    CommonModule,
    MaterialsModule, 
  ],
  exports:[
    HomePageComponent,
    ProductListPageComponent,
    ProductDetailsPageComponent,
    DialogComponent
  ]
})
export class HomeModule { }
