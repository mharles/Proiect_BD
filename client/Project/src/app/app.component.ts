import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
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

  apeluri(e: any) {
    e.preventDefault()
    if ((<HTMLInputElement>document.getElementById('nume'))!.value && (<HTMLInputElement>document.getElementById('prenume'))!.value) {
      this.nume = (<HTMLInputElement>document.getElementById('nume'))!.value
      this.prenume = (<HTMLInputElement>document.getElementById('prenume'))!.value
      console.log(this.nume)
      location.href=`http://localhost:3000/apeluri/${this.nume}/${this.prenume}`
    }
  }
}


