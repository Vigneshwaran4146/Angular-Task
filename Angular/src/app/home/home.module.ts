import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './Components/home-page/home-page.component';
import { ProductListPageComponent } from './Components/product-list-page/product-list-page.component';
import { ProductDetailsPageComponent } from './Components/product-details-page/product-details-page.component';
import { MaterialsModule } from '../materials/materials.module';
import { DialogComponent } from './Components/dialog/dialog.component';
import { PageNotFoundComponent } from './Components/page-not-found/page-not-found.component';   
import { NumberToWordsPipe } from './pipes/number-to-words.pipe';
import { ChangeBackgroundDirective } from './directives/change-background.directive';


@NgModule({
  declarations: [
    HomePageComponent,
    ProductListPageComponent,
    ProductDetailsPageComponent,
    DialogComponent,
    PageNotFoundComponent, 
    NumberToWordsPipe, 
    ChangeBackgroundDirective
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
