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
  response: any;
  constructor(
    public employeService: EmployeService
  ) {
    this.getEmployes();
  }

  ngOnInit(): void {
    this.getEmployes();
  }

  async getEmployes(){
    this.employeService.findAll()
      .subscribe(res => {
        this.employes = res;
        this.response = res;
      });
  }

  createEmploye(){
    console.log(this.employe);
    this.employeService.create(this.employe)
      .subscribe( res => {
        this.employe = new Employe(
          undefined,
          undefined,
          undefined
        );
        this.message = "Creado Correctamente";
        this.response = res;
      });
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
       
        this.message = "Actualizado Correctamente"
        this.modify = false;  
        alert('Actualizado Correctamente');
        this.response = res;
       
      });
  }

  deleteEmploye(employe: Employe){
    this.employeService.delete(employe)
      .subscribe(res => {
        
        this.message = "Eliminado Correctamente"
        alert('Actualizado Correctamente');  
        this.response = res;
      });
  }

}
