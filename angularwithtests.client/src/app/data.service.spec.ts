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
    const mockRequest = testingController.expectOne({ url: '/api/Customers', method: 'GET' });
    //expect(mockRequest.request.method).toEqual('GET');
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
      expect(result.customerFirstName).toBe('Jimmy');
    })

    const mockRequest = testingController.expectOne({ url: '/api/Customers', method: 'POST' });
    //expect(mockRequest.request.method).toEqual('POST');
    expect(mockRequest.request.body).toBe(newCustomer);
    mockRequest.flush(newCustomer);
  });

  it('should delete a customer when deleteCustomer is called', () => {
    service.deleteCustomer(1).subscribe(result => {
      expect(result).toBeNull();
    })


    const mockRequest = testingController.expectOne({ url: `/api/Customers/1`, method: 'DELETE' });
    mockRequest.flush(null);
  });

  it('should get one by id when getByID is called', () => {
    let cust: Customer = {
        customerID: 3,
        customerFirstName: 'Kyle',
        customerLastName: 'Garbo',
        customerPhoneNumber: '0001111'
    }

    service.getCustomerById(cust.customerID).subscribe((result: Customer) => {
      expect(result).toBeTruthy();
      expect(result.customerFirstName).toBe(cust.customerFirstName);
      expect(result.customerID).toBe(cust.customerID)
    })

    const mockRequest = testingController.expectOne({ url: `/api/Customers/${cust.customerID}`, method: 'GET' });
    mockRequest.flush(cust);
  });
});
