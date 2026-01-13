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

/*
 private baseUrl = 'http://localhost:3000/mtm';

   private configUrl =`${this.baseUrl}/`;
   private configUrls =`${this.baseUrl}/add`;
   private configUrls2= `${this.baseUrl}/delete-all`;
   private configUrls4=`${this.baseUrl}/delete`;
   private updateLivreUrl =`${this.baseUrl}/update`;




  angForm!: FormGroup;
  client!: any[];


  constructor(private http: HttpClient , private refreshService: RefreshService) {
    // console.log('json connect loaded ::');
     this.getJSON().subscribe((data: Clients[]) => {
      //Faire passer l'interface au data pour la sortie html boucle for sur client
      this.client= data;
     console.log( 'client',this.client);

     });
     this.angForm = new FormGroup({
      id: new FormControl('' , [
        Validators.required]),
        idecrivain: new FormControl('' , [
          Validators.required]),

    });

    }

     public getJSON(): Observable<Clients[]> {
      //Ajout de l'interface Clients[] dans la requet get http pour mapper sur response:Clients[]
      //La reponse passe par pipe -> map -> subscribe
      //La reponse ne peut pas être mappée directement elle doit avant passer par le pipe
      //impossibilité d'utiliser tap sur ce type d'objet
      //ajouter delay pour mimer un temps de chargement
       return this.http.get<Clients[]>(this.configUrl)
       .pipe(delay(1000),

         map((response:Clients[]) => response)) ;

     }

     public decode(content: string){
      return decodeURIComponent(content);
    }


    loadData() {
    this.getJSON().subscribe(data => {
     this.client = data;
        });
          }

    identify(index: number, client: any): number {
        return client.id;
      }

   onSubmit(nameInput: HTMLInputElement, clientId: number) {
    const name = nameInput.value.trim();
    if (!name) return;
    this.http.post(this.configUrls, {
    addmylivre: name,
    id: clientId
  }).subscribe((newRoman: any) => {

    // 🔁 mise à jour locale
    const client = this.client.find(c => c.id === clientId);
    console.log('id found --- ' , client)
    if (client) {
      client.mylivres = [...client.mylivres, newRoman];
    }

    // ✅ vider l’input
    nameInput.value = '';
  });

    }


    updateLivre(
  livreId: number,
  newName: string,
  ecrivainId: number
) {

  console.log('✅ livreId ' , livreId)
 console.log('✅ newName ' , newName)
  console.log('✅ ecrivainId ' , ecrivainId)

  if (!newName.trim()) return;

  this.http.put(this.updateLivreUrl, {
    id: livreId,
    name: newName
  }).subscribe((updatedLivre: any) => {

    const client = this.client.find(c => c.id === ecrivainId);
    if (!client) return;

    const index = client.mylivres.findIndex(
      (l: any) => l.id === livreId
    );

    if (index !== -1) {
      client.mylivres[index] = updatedLivre; // 🔥 UI MAJ
    }
  });
}



    onDeletemanytomany(idecrivain: number, livreid: number) {

    //this.http.post(this.configUrls4, { "id": livreid , "idecrivain" : idecrivain }).subscribe(() => {

   this.http.delete(`${this.configUrls4}/${livreid}/${idecrivain}`).subscribe(() => {

    const client = this.client.find(c => c.id === idecrivain);
    if (!client) return;

    client.mylivres = client.mylivres.filter(
    (mylivres: any) => mylivres.id !== livreid
    );
  });

    }


    onDeletAllmany(clientId: number) {


  console.log('🔥 delete auteur and livres mtm', clientId);

  this.http.delete(`${this.configUrls2}/${clientId}`).subscribe(() => {

  console.log('before', this.client);

  this.client = this.client.filter(c => c.id !== clientId);

  console.log('after', this.client);

  })



    }

      ngOnInit() {
this.loadData();

  this.refreshService.refresh$.subscribe(() => {
    this.loadData(); // 🔥 recharge la liste
  });

      }

      */
}
