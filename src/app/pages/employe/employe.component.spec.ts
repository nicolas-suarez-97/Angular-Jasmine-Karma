import { ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';

import { EmployeComponent } from './employe.component';
import { EmployeService } from 'src/app/services/Employe/employe.service';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { RequestsService } from 'src/app/request/requests.service';
import { Employe } from 'src/app/models/employe';
import {of} from 'rxjs';
import {delay} from 'rxjs/operators';


describe('EmployeComponent', () => {
  let component: EmployeComponent;
  let fixture: ComponentFixture<EmployeComponent>;
  let employes: Employe[];
  let employeService: EmployeService;
  let e: Employe;
  

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, FormsModule],
      declarations: [EmployeComponent],
      providers: [EmployeService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeComponent);
    component = fixture.componentInstance;
    // fixture.detectChanges();
    employeService = TestBed.get(EmployeService);
    employes = [];
    e = new Employe( undefined,undefined,undefined);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('Check Title', () => {
    expect(document.getElementById('mytitle').innerHTML).toBe('Sistema de Empleados');
  });

  it('Get Employes',  async () => {
    component.getEmployes();
    fixture.detectChanges();
    spyOn(component,'getEmployes');

    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      // expect(component.employes.length).toBeGreaterThan(0);
    });
  });

  it('Create Employe', async () => {
    component.employe.name = 'Test';
    component.employe.email = 't@mail.com';
    component.createEmploye();
    fixture.detectChanges();
    spyOn(component,'createEmploye');

    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      // expect(component.message).toBe('Creado Correctamente');
    });
  });
  
  
  it('Update Employe', ()=>{
    component.employe.name = 'Test';
    component.employe.email = 't@mail.com';
    component.employe.id = 'wNREbnQBi70rwxUHgdog';
    component.updateEmploye();
    
    fixture.detectChanges();
    spyOn(component,'updateEmploye');

    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      expect(component.message).toBe('Actualizado Correctamente');
    });
  });

  it('Delete Employe', ()=>{
    component.employe.name = 'Test';
    component.employe.email = 't@mail.com';
    component.employe.id = 'wNREbnQBi70rwxUHgdog';
    component.deleteEmploye(component.employe);
    
    fixture.detectChanges();
    spyOn(component,'deleteEmploye');

    fixture.whenStable().then(()=>{
      fixture.detectChanges();
      expect(component.message).toBe('Eliminado Correctamente');
    });
  });

  it('Toggle Options', () => {
    component.employe.name = 'Test';
    component.employe.email = 't@mail.com';
    component.setEmployeForUpdate(component.employe);
    fixture.detectChanges();
    expect(component.modify).toBe(true);

    component.cancelUpdate();
    expect(component.modify).toBe(false);

  });
  it('Delete Message', () => {
    component.message = 'Creado Correctamente';
    component.deleteMessage();
    expect(component.message).toBe('');
  });

  it('Update Error', ()=>{
    component.updateEmploye();
  });

});
