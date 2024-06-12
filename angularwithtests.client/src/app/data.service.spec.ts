import { TestBed } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Customer } from './Models/Customer';

const CUSTOMERS: Customer[] = [
  {
    customerID: 1,
    customerFirstName: 'Phillip',
    customerLastName: 'Brown',
    customerPhoneNumber: '3338888'
  },
  {
    customerID: 2,
    customerFirstName: 'Jeffery',
    customerLastName: 'Jones',
    customerPhoneNumber: '8675309'
  }
]

describe('DataService', () => {
  let service: DataService;
  let testingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DataService],
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(DataService);
    testingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get all customers when getAllCustomers is called', () => {
    //Awwange
    
    //Auct
    service.getAllCustomers().subscribe((custarray: Customer[]) => {
      expect(custarray).toBeTruthy();
      expect(custarray.length).toEqual(2);
      const thirdCustomer = custarray.find(c => c.customerID === 2);
      expect(thirdCustomer?.customerFirstName).toBe('Jeffery');
    });

    //Asswert
    const mockRequest = testingController.expectOne('/api/Customers');
    expect(mockRequest.request.method).toEqual('GET');
    mockRequest.flush(CUSTOMERS);
  });

  it('should add a new customer when addCustomers is called', () => {
    const newCustomer: Customer = {
      customerID: 0,
      customerFirstName: "Jimmy",
      customerLastName: 'Wednesday',
      customerPhoneNumber: '9983493'
    }

    service.addCustomer(newCustomer).subscribe((result: Customer) => {
      expect(result).toBeTruthy();
      console.log(result);
      expect(result.customerFirstName).toBe('Jimmy');
    })

    const mockRequest = testingController.expectOne({ url: '/api/Customers', method: 'POST' });
    expect(mockRequest.request.method).toEqual('POST');
    expect(mockRequest.request.body).toBe(newCustomer);
    mockRequest.flush(newCustomer);
  });
});
