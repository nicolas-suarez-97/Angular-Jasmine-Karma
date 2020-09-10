import { Component, OnInit } from '@angular/core';
import { EmployeService } from 'src/app/services/Employe/employe.service';
import { Employe } from 'src/app/models/employe';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {
  employes : Employe[] = [];
  employe : Employe = new Employe(
    undefined,
    undefined,
    undefined
  );
  modify = false;
  message: string = "";
  constructor(
    private employeService: EmployeService
  ) {
    this.getEmployes();
  }

  ngOnInit(): void {
    this.getEmployes();
  }

  getEmployes(){
    let result = '';
    this.employeService.findAll()
      .subscribe(res => {
        this.employes = res;
        result='ok';
      }),
      error => {
        console.log(error)
      }
    console.log(result);
  }

  createEmploye(){
    console.log(this.employe);
    this.employeService.create(this.employe)
      .subscribe( res => {
        console.log(res);
        
        this.employe = new Employe(
          undefined,
          undefined,
          undefined
        );
        this.message = "Creado Correctamente"
        this.employeService.findAll()
        .subscribe(res => {
          this.employes = res;
          this.modify = false;
          alert('Creado Correctamente');
        });

      }),
      error => {
        console.log(error)
      }
  }

  deleteMessage(){
    this.message = "";
  }

  setEmployeForUpdate(employe: Employe){
    console.log(employe);
    this.modify = true;
    this.employe = employe;
    this.message = "";
  }
  cancelUpdate(){
    this.modify = false;
    this.employe = new Employe(
      undefined,
      undefined,
      undefined
    );
  }

  updateEmploye(){
    console.log(this.employe);
    this.employeService.update(this.employe)
      .subscribe(res => {
        console.log(res);
        
        this.employe = new Employe(
          undefined,
          undefined,
          undefined
        );
        this.employeService.findAll()
        .subscribe(res => {
          this.employes = res;
          // this.message = "Actualizado Correctamente"
          this.modify = false;  
          alert('Actualizado Correctamente');
        });
       
      }),
      error => {
        console.log(error);
      }
  }

  deleteEmploye(employe: Employe){
    this.employeService.delete(employe)
      .subscribe(res => {
        this.employeService.findAll()
        .subscribe(res => {
          this.employes = res;
          // this.message = "Eliminado Correctamente"
          alert('Actualizado Correctamente');  
        });
        
      });
  }

}
