import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
export interface product {
  id?: number;
  name: string;
  image?: string;
  price: number;
}
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private apiUrl = 'http://localhost:3000/products';
  private dataSubject = new BehaviorSubject<any>(null);
  data$ = this.dataSubject.asObservable();

  setData(data: string) {
    this.dataSubject.next(data);
  }

  getData() {
    return this.dataSubject.value;
  }

  constructor(private http: HttpClient) { }
  /**
   * Method is used to get all Products
   * @returns  To return respective apirul
   */
  getProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
  /**
  * Method is used to add Products
  * @returns  To return respective apirul
  */
  addProduct(productData: FormData): Observable<product> {
    return this.http.post<product>(this.apiUrl, productData);
  }
  /**
  * Method is used to get single Products
  * @returns  To return respective apirul
  */
  singleProduct(id: any): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/' + id)
  }
  /**
  * Method is used to edit Products
  * @returns  To return respective apirul
  */
  editProduct(productData: FormData): Observable<product> {
    const id = productData?.get('id');
    return this.http.put<product>(this.apiUrl + '/' + id, productData);
  }
  /**
  * Method is used to delete Products
  * @returns  To return respective apirul
  */
  deleteproduct(id: number): Observable<void> {
    return this.http.delete<void>(this.apiUrl + '/' + id);
  };
}
