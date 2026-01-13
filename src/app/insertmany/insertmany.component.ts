import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
import { RefreshService } from '../services/refresh.service';
import { OnetomanyService } from '../services/onetomany.service';

@Component({
   standalone: false, // 👈 force Angular
  selector: 'app-insertmany',
  templateUrl: './insertmany.component.html',
  styleUrls: ['./insertmany.component.css']
})



export class InsertmanyComponent {



  title = 'Insert one to many';
  angForm!: FormGroup;


  constructor(private refreshService: RefreshService,
     private onetomanyService: OnetomanyService)
     {

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


      updateName() {

          console.log('🔥🔥 sumbitted');

         console.log('🔥🔥🔥data' ,JSON.stringify(this.angForm.value))

         this.onetomanyService.createLivre(this.angForm.value).subscribe(() => {


        this.refreshService.trigger(); // NOTIFIE LES AUTRES
        this.angForm.reset();

        })

}






  ngOnInit() {
}

}
