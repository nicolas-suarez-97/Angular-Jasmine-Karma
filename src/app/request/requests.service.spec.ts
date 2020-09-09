import { TestBed } from '@angular/core/testing';

import { RequestsService } from './requests.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Employe } from '../models/employe';
import { environment } from 'src/environments/environment';

describe('RequestsService', () => {
  let service: RequestsService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers:[RequestsService]
    });
    service = TestBed.inject(RequestsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  afterEach(()=>{
    httpMock.verify();
  });

  it('Get Employes', () => {
    const dummy: Employe[] = [
      { "id": "89RIb3QBi70rwxUHwttH", "name": "Jorge", "email": "jor@gmail.com" }, 
      { "id": "N9SQbnQBi70rwxUHY9sq", "name": "Juan ", "email": "j@gmail.com" }, 
      { "id": "wNREbnQBi70rwxUHgdog", "name": "Nicolas", "email": "nicolas@gmail.com" }
    ];

    service.get<Employe[]>(`${environment.baseUrl}/api/employe`)
      .subscribe( employes => {
        expect(employes.length).toBe(3);
        expect(employes).toEqual(dummy);
      });
    
      const request = httpMock.expectOne(`${environment.baseUrl}/api/employe`);

      expect(request.request.method).toBe('GET');

      request.flush(dummy);
  });


  it('Get Employe By Id', () => {
    const dummy: Employe = { "id": "wNREbnQBi70rwxUHgdog", "name": "Nicolas", "email": "nicolas@gmail.com" };

    service.get(`${environment.baseUrl}/api/employe/wNREbnQBi70rwxUHgdog`)
      .subscribe( employe => {
        expect(employe).toEqual(dummy);
      });
    
      const request = httpMock.expectOne(`${environment.baseUrl}/api/employe/wNREbnQBi70rwxUHgdog`);

      expect(request.request.method).toBe('GET');

      request.flush(dummy);
  });
});
