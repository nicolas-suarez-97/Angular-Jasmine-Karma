import { TestBed, inject } from '@angular/core/testing';
import { of } from 'rxjs'; // Add import
import { EmployeService } from './employe.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RequestsService } from 'src/app/request/requests.service';
import { Employe } from 'src/app/models/employe';
import { environment } from 'src/environments/environment';

describe('EmployeService', () => {
  let service: EmployeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeService]
    });
    service = TestBed.inject(EmployeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(()=>{
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('Get Employes', () => {
    const dummy: Employe[] = [
      { "id": "89RIb3QBi70rwxUHwttH", "name": "Jorge", "email": "jor@gmail.com" }, 
      { "id": "N9SQbnQBi70rwxUHY9sq", "name": "Juan ", "email": "j@gmail.com" }, 
      { "id": "wNREbnQBi70rwxUHgdog", "name": "Nicolas", "email": "nicolas@gmail.com" }
    ];

    service.findAll()
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

    service.findById(dummy.id)
      .subscribe( employe => {
        expect(employe).toEqual(dummy);
      });
    
    const request = httpMock.expectOne(`${environment.baseUrl}/api/employe/wNREbnQBi70rwxUHgdog`);

    expect(request.request.method).toBe('GET');

    request.flush(dummy);
  });

  it('Delete Employe By Id', () => {
    const dummy: Employe = { "id": "wNREbnQBi70rwxUHgdog", "name": "Nicolas", "email": "nicolas@gmail.com" };
    let response = {
      "_index": "employe",
      "_type": "_doc",
      "_id": "wNREbnQBi70rwxUHgdog",
      "_version": 3,
      "result": "deleted",
      "_shards": {
          "total": 2,
          "successful": 1,
          "failed": 0
      },
      "_seq_no": 56,
      "_primary_term": 1
    }
    service.delete(dummy)
      .subscribe( res => {
        expect(res).toEqual(response);
      });
    const request = httpMock.expectOne(`${environment.baseUrl}/api/employe/wNREbnQBi70rwxUHgdog`);
    expect(request.request.method).toBe('DELETE');
    request.flush(response);
  });

  it('Post Employe By Id', () => {
    const dummy: Employe = { "id": "wNREbnQBi70rwxUHgdog", "name": "Nicolas", "email": "nicolas@gmail.com" };
    let response = {
      "name": "Nicolas", "email": "nicolas@gmail.com"
    }
    service.create(dummy)
      .subscribe( res => {
        expect(res).toEqual(response);
      });
    const request = httpMock.expectOne(`${environment.baseUrl}/api/employe`);
    expect(request.request.method).toBe('POST');
    request.flush(response);
  });

  it('Put Employe By Id', () => {
    const dummy: Employe = { "id": "wNREbnQBi70rwxUHgdog", "name": "Nicolas", "email": "nicolas@gmail.com" };
    let response = {
      "id": "wNREbnQBi70rwxUHgdog","name": "Nicolas", "email": "nicolas@gmail.com"
    }
    service.update(dummy)
      .subscribe( res => {
        expect(res).toEqual(response);
      });
    const request = httpMock.expectOne(`${environment.baseUrl}/api/employe/wNREbnQBi70rwxUHgdog`);
    expect(request.request.method).toBe('PUT');
    request.flush(response);
  });


});
