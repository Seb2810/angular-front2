import { Component , ViewChild, ElementRef } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { FormControl, FormGroup, Validators ,FormsModule  } from '@angular/forms';
import { RefreshService } from '../services/refresh.service';
import { MtmService } from '../services/mtm.service';



@Component({
   standalone: false, // 👈 force Angular
  selector: 'app-getmtom',
  templateUrl: './getmtom.component.html',
  styleUrls: ['./getmtom.component.css']
})
export class GetmtomComponent {

  id: string = '';
  title ='Request from json url'


  client: any[] = [];

  angForm = new FormGroup({
    id: new FormControl('', Validators.required),
    idecrivain: new FormControl('', Validators.required)
  });

  constructor(
    private mtmService: MtmService,
    private refreshService: RefreshService
  ) {}

  ngOnInit() {
    this.loadData();

    this.refreshService.refresh$.subscribe(() => {
      this.loadData();
    });
  }

  identify(index: number, client: any): number {
  return client.id;
}

  loadData() {
    this.mtmService.getAll().subscribe(data => {
      console.log('DATA MTM  ', data);
      this.client = data;
    });
  }

  onSubmit(nameInput: HTMLInputElement, clientId: number) {

    const name = nameInput.value.trim();

    console.log(' 👉 add to mtm livre  : name ' , name ,'clientId ' , clientId)

    if (!name) return;

    this.mtmService.addLivre(clientId, name)
      .subscribe((newRoman: any) => {

        const client = this.client.find(c => c.id === clientId);
        if (client) {
          client.livres = [...client.livres, newRoman];
        }

        nameInput.value = '';
      });
  }

  updateLivre(livreId: number, newName: string, ecrivainId: number) {
    if (!newName.trim()) return;

    this.mtmService.updateLivre(livreId, newName)
      .subscribe((updatedLivre: any) => {

        const client = this.client.find(c => c.id === ecrivainId);
        if (!client) return;

        const index = client.livres.findIndex(
          (l: any) => l.id === livreId
        );

        if (index !== -1) {
          client.livres[index] = updatedLivre;
        }
      });
  }

  onDeletemanytomany(ecrivainId: number, livreId: number) {
    this.mtmService.deleteOne(livreId, ecrivainId)
      .subscribe(() => {

        const client = this.client.find(c => c.id === ecrivainId);
        if (!client) return;

        client.livres = client.livres.filter(
          (l: any) => l.id !== livreId
        );
      });
  }

  onDeletAllmany(ecrivainId: number) {
    this.mtmService.deleteAll(ecrivainId)
      .subscribe(() => {
        this.client = this.client.filter(c => c.id !== ecrivainId);
      });
  }


}
