import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Product {
  id?: number;
  name: string;
  image?: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'https://express-backend-v421.onrender.com/products';
  
  // BehaviorSubject to emit and subscribe to data changes
  private dataSubject = new BehaviorSubject<string | null>(null);
  data$ = this.dataSubject.asObservable();

  /**
   * Method to set data in the BehaviorSubject
   * @param data - The data to set
   */
  setData(data: string): void {
    this.dataSubject.next(data);
  }

  /**
   * Method to get data from the BehaviorSubject
   * @returns The current value of the BehaviorSubject
   */
  getData(): string | null {
    return this.dataSubject.value;
  }

  constructor(private http: HttpClient) { }

  /**
   * Method to get all products
   * @returns An observable of product data
   */
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  /**
   * Method to add a product
   * @param productData - The data of the product to add
   * @returns An observable of the added product
   */
  addProduct(productData: FormData): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, productData);
  }

  /**
   * Method to get a single product
   * @param id - The ID of the product to retrieve
   * @returns An observable of the single product
   */
  singleProduct(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  /**
   * Method to edit a product
   * @param productData - The data of the product to edit
   * @returns An observable of the edited product
   */
  editProduct(productData: FormData): Observable<Product> {
    const id = productData?.get('id');
    return this.http.put<Product>(`${this.apiUrl}/${id}`, productData);
  }

  /**
   * Method to delete a product
   * @param id - The ID of the product to delete
   * @returns An observable representing the deletion operation
   */
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
