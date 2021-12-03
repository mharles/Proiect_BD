import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servicii',
  templateUrl: './servicii.component.html',
  styleUrls: ['./servicii.component.css']
})
export class ServiciiComponent implements OnInit {
  cauza: string = '';

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

  top(e: any) {
    e.preventDefault()
    location.href=`http://localhost:3000/top`
  }

}
