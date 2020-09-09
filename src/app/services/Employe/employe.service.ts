import { Injectable } from '@angular/core';
import { RequestsService } from 'src/app/request/requests.service';
import { environment } from 'src/environments/environment';
import { Employe } from 'src/app/models/employe';

@Injectable({
  providedIn: 'root'
})
export class EmployeService {
  endpoint:string = 'employe';
  constructor(private request:RequestsService) { }

 findById(id: string) {
    const url = `${environment.baseUrl}/api/${this.endpoint}/${id}`;
    return this.request.get<Employe>(url);
  }

  findAll() {
    const url = `${environment.baseUrl}/api/${this.endpoint}`;
    return this.request.get<Employe[]>(url);
  }

  update(employe: Employe) {
    const url = `${environment.baseUrl}/api/${this.endpoint}/${employe.id}`;
    return this.request.put(url, {
      id: employe.id,
      name: employe.name,
      email: employe.email
    });
  }

  create(employe: Employe) {
    const url = `${environment.baseUrl}/api/${this.endpoint}`;
    return this.request.post(url, {
      name: employe.name,
      email: employe.email
    });
  }

  delete(employe: Employe) {
    const url = `${environment.baseUrl}/api/${this.endpoint}/${employe.id}`;
    return this.request.delete(url, {
    
    });
  }

}
