import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { RefreshService } from '../services/refresh.service';
import { MtmService } from '../services/mtm.service';

@Component({
   standalone: false, // 👈 force Angular
  selector: 'app-insertmtom',
  templateUrl: './insertmtom.component.html',
  styleUrls: ['./insertmtom.component.css']
})
export class InsertmtomComponent {

  title = 'Insert many to many';
  angForm!: FormGroup;

  constructor( private refreshService: RefreshService,
    private mtmService: MtmService
){

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
       // this.updateName()

      }

      updateName() {

        if (this.angForm.invalid) return;

        console.log('🔥🔥 sumbitted');

        console.log('🔥🔥🔥data' ,JSON.stringify(this.angForm.value))

        this.mtmService.createLivre(this.angForm.value).subscribe(() => {

        this.refreshService.trigger(); // NOTIFIE LES AUTRES

        this.angForm.reset();

        })
        this.angForm.reset();

        }

}
