import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { RefreshService } from '../services/refresh.service';
import { HasoneService } from '../services/hasone.service';

@Component({
   standalone: false, // 👈 force Angular
  selector: 'app-inserthasone',
  templateUrl: './inserthasone.component.html',
  styleUrls: ['./inserthasone.component.css']
})
export class InserthasoneComponent {
  title = 'Add book + author';
  angForm!: FormGroup;



  constructor( private refreshService: RefreshService ,
    private hasoneService: HasoneService ){

    this.angForm = new FormGroup({
        firstName: new FormControl('' , [
          Validators.required,
          Validators.minLength(3)]),
        lastName: new FormControl('' , [
          Validators.minLength(4)]),
          name: new FormControl('' , [
            Validators.required,
            Validators.minLength(3)]),
      });


      }

      ngOninit(){


      }


    updateName() {


    console.log('🔥🔥 sumbitted');

    console.log('🔥🔥🔥data' ,JSON.stringify(this.angForm.value))


    this.hasoneService.createLivre(this.angForm.value).subscribe( {

   // this.http.post(this.configUrls, this.angForm.value).subscribe({
      next: () => {
        this.refreshService.trigger(); // ✅ APRES succès
        this.angForm.reset();
      },
      error: err => console.error(err)
    });

    }
}
