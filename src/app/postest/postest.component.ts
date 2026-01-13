import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
@Component({
  selector: 'app-postest',
  templateUrl: './postest.component.html',
  styleUrls: ['./postest.component.css']
})
export class PostestComponent {

  title = 'Add book + author';

  angForms =  {'heelopost' :'posetdvalues'};
  private configUrls = 'http://localhost:3000/tester';

  constructor(private http: HttpClient){


    this.http.post(this.configUrls, { name: 'pizzatest' , description:'menutest' ,price:'22'}).subscribe({
      next: data => {

        console.log(data)
      },
      error: error => {

          console.error('There was an error!', error);
      }
    })



    }

/*
  this.http.post(this.configUrls, this.angForms)
  .subscribe(data=>console.log(data) ,  err => console.log(err));
*/

  }



