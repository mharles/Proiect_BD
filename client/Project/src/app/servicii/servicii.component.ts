import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicii',
  templateUrl: './servicii.component.html',
  styleUrls: ['./servicii.component.css']
})
export class ServiciiComponent implements OnInit {
  cauza: string = '';
  serviciu: string = '';
  intervalm: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  servicii(e: any) {
    e.preventDefault()
    if ((<HTMLInputElement>document.getElementById('cauza'))!.value ) {
      this.cauza = (<HTMLInputElement>document.getElementById('cauza'))!.value

      location.href=`http://localhost:3000/servicii/${this.cauza}`
    }
  }

  serviciires(e: any) {
    e.preventDefault()
    if ((<HTMLInputElement>document.getElementById('serviciu'))!.value ) {
      this.serviciu = (<HTMLInputElement>document.getElementById('serviciu'))!.value

      location.href=`http://localhost:3000/serviciires/${this.serviciu}`
    }
  }

  top(e: any) {
    e.preventDefault()
    location.href=`http://localhost:3000/top`
  }

  interval(e: any) {
    e.preventDefault()

      location.href=`http://localhost:3000/interval`
  }

  bonus(e: any) {
    e.preventDefault()

      location.href=`http://localhost:3000/durata`
  }
}
