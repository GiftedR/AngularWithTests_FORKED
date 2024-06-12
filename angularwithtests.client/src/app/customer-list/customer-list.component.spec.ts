import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerListComponent } from './customer-list.component';
import { Customer } from '../Models/Customer';
import { DataService } from '../data.service';
import { Observable, of } from 'rxjs';


class MockDataService {
  customers: Customer[] = [
    {
      customerID: 0,
      customerFirstName: 'Jeffery',
      customerLastName: 'Jones',
      customerPhoneNumber: '8675309'
    }];

  addCustomer(customer: Customer): Observable<Customer> {
    this.customers.push(customer)
    return of(customer);
  }

  getAllCustomers(): Observable<Customer[]> {
    return of(this.customers);
  }
}


describe('CustomerListComponent', () => {
  let component: CustomerListComponent;
  let fixture: ComponentFixture<CustomerListComponent>;
  let dataService: MockDataService;
  let customer: Customer;

  // Arrange
  beforeEach(() => {
    dataService = new MockDataService();
    TestBed.configureTestingModule({
      declarations: [CustomerListComponent],
      providers: [{ provide: DataService, useValue: dataService }]
    });
    fixture = TestBed.createComponent(CustomerListComponent);
    component = fixture.componentInstance;

    customer = dataService.customers[0];

    fixture.detectChanges();
  });

  it('should create', () => {
    //Act

    // Assert
    expect(component).toBeTruthy();
  });

  it('should have a customer list', () => {
    expect(component.customers).toBeDefined();
    expect(component.customers).toEqual([customer]);
    expect(component.customers[0].customerFirstName).toEqual("Jeffery");
  });

  it('should add a new customer when addCustomer is fired', () => {
    component.addCustomer();

    expect(component.customers.length).toEqual(3);
  });

  it('should have customer list as the heading', () => {
    const heading: HTMLElement = fixture.nativeElement;
    const h1: HTMLElement = heading.querySelector('h1')!;
    
    expect(h1?.textContent).toEqual('Customer List')
  });
});
