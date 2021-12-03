import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-apeluri',
  templateUrl: './apeluri.component.html',
  styleUrls: ['./apeluri.component.css']
})
export class ApeluriComponent implements OnInit {

  nume: string = '';
  prenume: string = '';
  data: string = '';

  constructor() { }

  ngOnInit(): void {


  }

  apeluri(e: any) {
    e.preventDefault()
    if ((<HTMLInputElement>document.getElementById('nume'))!.value && (<HTMLInputElement>document.getElementById('prenume'))!.value) {
      this.nume = (<HTMLInputElement>document.getElementById('nume'))!.value
      this.prenume = (<HTMLInputElement>document.getElementById('prenume'))!.value
      console.log(this.nume)
      location.href=`http://localhost:3000/apeluri/${this.nume}/${this.prenume}`
    }
  }

  apelurio(e: any) {
    e.preventDefault()
    if ((<HTMLInputElement>document.getElementById('numeo'))!.value && (<HTMLInputElement>document.getElementById('prenumeo'))!.value) {
      this.nume = (<HTMLInputElement>document.getElementById('numeo'))!.value
      this.prenume = (<HTMLInputElement>document.getElementById('prenumeo'))!.value
      console.log(this.nume)
      location.href=`http://localhost:3000/apelurio/${this.nume}/${this.prenume}`
    }
  }

  urgente(e: any) {
    e.preventDefault()
    location.href=`http://localhost:3000/urgente`
  }

}
