import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home/Components/home-page/home-page.component';
import { ProductListPageComponent } from './home/Components/product-list-page/product-list-page.component';
import { ProductDetailsPageComponent } from './home/Components/product-details-page/product-details-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'products', component: ProductListPageComponent },
  { path: 'productsdetails', component: ProductDetailsPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
