import { Component } from '@angular/core';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent {

  constructor(private http: HttpClient) {}

  title = 'Proiect';

  nume: string = '';
  prenume: string = '';
  data: string = '';

  pers(e: any) {
    e.preventDefault()
      //location.href=`http://localhost:3000/persoana/${this.nume}/${this.prenume}`
      location.href=`http://localhost:3000/persoane`

  }

  date(e: any) {
    e.preventDefault()
    location.href=`http://localhost:3000/operatori`
      //location.href=`http://localhost:3000/apel/${this.data}`
  }

  cauze(e: any) {
    e.preventDefault()
    if ((<HTMLInputElement>document.getElementById('nume'))!.value && (<HTMLInputElement>document.getElementById('prenume'))!.value) {
      this.nume = (<HTMLInputElement>document.getElementById('nume'))!.value
      this.prenume = (<HTMLInputElement>document.getElementById('prenume'))!.value
      console.log(this.nume)
      location.href=`http://localhost:3000/cauze/${this.nume}/${this.prenume}`
    }
  }

  postReq() {
    return this.http.post("http://localhost:3000/operatori", {nume: 'Test', prenume: 'Test', dataAngajare: "2021-09-08", uid: '111112'})
    .subscribe(responseData => {
      console.log(responseData)
    })
  }

  getReq() {
    return this.http.get("http://localhost:3000/test")
    .subscribe(responseData => {
      console.log(responseData)
    })
  }

}


