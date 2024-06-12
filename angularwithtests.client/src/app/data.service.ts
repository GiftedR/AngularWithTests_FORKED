import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Customer } from './Models/Customer';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  customers: Customer[] = []

  constructor(private http: HttpClient) { }

  getAllCustomers() : Observable<Customer[]> {
    return this.http.get<Customer[]>(`/api/Customers`);
  }

  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`/api/Customers/${id}`);
  }

  addCustomer(cust: Customer): Observable<Customer> {
    return this.http.post<Customer>(`/api/Customers`, cust);
  }

  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<any>(`/api/Customers/${id}`);
  }
}
