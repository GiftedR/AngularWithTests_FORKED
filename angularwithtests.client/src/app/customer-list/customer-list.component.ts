import { Component } from '@angular/core';
import { Customer } from '../Models/Customer';
import { DataService } from '../data.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  customers: Customer[] = [];

  constructor(private data: DataService) {

    this.data.getAllCustomers().subscribe(result => {
      this.customers = result;
    });
  }

  addCustomer() {
    let mrOoga: Customer = {
        customerID: 0,
        customerFirstName: '',
        customerLastName: '',
        customerPhoneNumber: ''
    }
    // Do thing here
    this.data.addCustomer(mrOoga).subscribe(result => {
      this.customers.push(result);
    });
  }
}
