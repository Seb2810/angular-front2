import { Component } from '@angular/core';
import axios from 'axios';
import { AxiosInstance } from "axios";
import { Observable } from 'rxjs';
interface User {
  name: { first: string; last: string; };
  picture: { large: string; };
}
@Component({
  selector: 'app-axiopost',
  templateUrl: './axiopost.component.html',
  styleUrls: ['./axiopost.component.css']
})
export class AxiopostComponent {
  user: User | null = null;

  constructor(){
this.random()
    this.random2()
  }


  async random() {
    const instance = axios.create()
    const url = 'http://localhost:3000'

   // const resp = await axios.post('http://localhost:3000');
    //const data = await resp.json();
   // console.log(data)
    //const { results: [user] } = data;
    //return user;
    return new Observable<any>((obs) => {
      axios.post(
       url,
       {
        firstName: 'Fred',
        lastName: 'Pierrafeu'
      }

     ).then((res: any) =>{
       console.log(res) ;
       obs.next(res);
     }).catch((err: any) => {
       console.log(err) ;
       obs.next(err);
     });
  })
}

async random2() {
  const instance = axios.create()
  const url = 'http://localhost:3000'

 // const resp = await axios.post('http://localhost:3000');
  //const data = await resp.json();
 // console.log(data)
  //const { results: [user] } = data;
  //return user;
  return new Observable<any>((obs) => {
    axios.get(
     url


   ).then((res: any) =>{
     console.log(res) ;
     obs.next(res);
   }).catch((err: any) => {
     console.log(err) ;
     obs.next(err);
   });
})
}
}
