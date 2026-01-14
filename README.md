## &#127808; Angrest Front-end 

→ Complete CRUD FRONT for express sequelize server avaiable at  https://github.com/Seb2810/express-server2

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.


## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.


## &#128165; Backend du projet 

https://github.com/Seb2810/express-server2


## Installer Tailwind (manuellement)

npm install -D tailwindcss postcss autoprefixer

## Initialiser Tailwind → créer le  tailwind.config.js

npx tailwindcss init

## Configurer Tailwind pour Angular

Dans `tailwind.config.js` :

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

```
⚠️ Très important sinon Tailwind ne génère aucun style.

## Ajouter Tailwind dans les styles globaux

Dans src/styles.css (ou styles.scss) :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

Vérifier angular.json

Dans la section "styles" :

"styles": [
  "src/styles.css"
]
```
## Lancer l'application

cd C:/ angular-front2

ng serve

> [!NOTE]
>Résolution des doublons en *ngFor

&#128477; Utiliser trackBy

Dans le composant.html

| `<div *ngFor="let vals of clt.romans; trackBy: trackByRomanId">` |

Dans ton composant .ts
```js
trackByClientId(index: number, item: any) {
  return item.id;
}

trackByRomanId(index: number, item: any) {
  return item.id;
}
```
-----

## Fonctionnement du component one to many

A la racine environment/environment.ts configuré en local
```ts
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000'
};
```
## Creation du service pour se connecter au server express sur le port 3000
```ts
 interface Roman {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

 interface AuthorMany {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  romans: Roman[];
}

@Injectable({
  providedIn: 'root'
})
export class OnetomanyService {

 private baseUrl = `${environment.apiUrl}/auteurmany`;

  constructor(private http: HttpClient) {}

  /* ===================== GET ===================== */

  getAll(): Observable<AuthorMany[]> {
    return this.http.get<AuthorMany[]>(`${this.baseUrl}`);
  }

  /* ===================== CREATE ===================== */

  addRoman(authorId: number, name: string): Observable<Roman> {
    return this.http.post<Roman>(`${this.baseUrl}/add-one`, {
      idval: authorId,
      nameval: name
    });
  }

  /* ===================== UPDATE ===================== */

  updateRoman(romanId: number, name: string): Observable<Roman> {
    return this.http.put<Roman>(`${this.baseUrl}/update`, {
      id: romanId,
      name
    });
  }

  createLivre(payload: {
  firstName: string;
  lastName: string;
  name: string;
}) {
  return this.http.post(`${this.baseUrl}/add`, payload);
}

  /* ===================== DELETE ONE ===================== */

  deleteRoman(romanId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/delete/${romanId}`
    );
  }

  /* ===================== DELETE ALL ===================== */

  deleteAuthor(authorId: number): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/delete-all/${authorId}`
    );
  }
}
```
## Le component getmany.component.ts
```ts
interface Clients {

  id : number;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  romans :Romans[];

}

interface  Romans{
  id : number;
 name: string;
  createdAt: Date;
  updatedAt: Date;

}

@Component({
   standalone: false, // 👈 force Angular
  selector: 'app-getmany',
  templateUrl: './getmany.component.html',
  styleUrls: ['./getmany.component.css'],


})
export class GetmanyComponent {

  client: Clients[] = [];

  constructor(
    private authorManyService: OnetomanyService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.refreshService.refresh$.subscribe(() => {
      this.loadData();
    });
  }

  /* ===================== LOAD ===================== */

  loadData(): void {
    this.authorManyService.getAll().subscribe(data => {
      this.client = data;
    });
  }

  identify(index: number, client: Clients): number {
    return client.id;
  }

  /* ===================== CREATE ===================== */

  onSubmit(nameInput: HTMLInputElement, authorId: number): void {
    const name = nameInput.value.trim();
    if (!name) return;

    this.authorManyService.addRoman(authorId, name)
      .subscribe(newRoman => {
        const author = this.client.find(a => a.id === authorId);
        if (author) {
          author.romans = [...author.romans, newRoman];
        }
        nameInput.value = '';
      });
  }

  /* ===================== UPDATE ===================== */

  updateRoman(romanId: number, newName: string, authorId: number): void {
    if (!newName.trim()) return;

    this.authorManyService.updateRoman(romanId, newName)
      .subscribe(updatedRoman => {
        const author = this.client.find(a => a.id === authorId);
        if (!author) return;

        const index = author.romans.findIndex(r => r.id === romanId);
        if (index !== -1) {
          author.romans[index] = updatedRoman;
        }
      });
  }

  /* ===================== DELETE ONE ===================== */

onDeletemany(romanId: number , authorId: number,): void {

    console.log('♣ authorId ' , authorId);
    console.log('♠ romanId ' , romanId);

 this.authorManyService.deleteRoman(romanId)
    .subscribe(() => {
      const author = this.client.find(a => a.id === authorId);
      if (!author) return;

      author.romans = author.romans.filter(r => r.id !== romanId);
    });
  }

  /* ===================== DELETE ALL ===================== */

  onDeleteAllMany(authorId: number): void {

    console.log('♣ authorId ' , authorId);

    this.authorManyService.deleteAuthor(authorId)
      .subscribe(() => {
        this.client = this.client.filter(a => a.id !== authorId);
      });
  }
}
```
## Communication avec le server 

L'url private  :

```ts
baseUrl = `${environment.apiUrl}/auteurmany`;
```
fait reference au serveur express plus précisément la route auteurmany du fichier routes/auteurmany.route.js

sur cette route router.post('/add', createManyTodos);

createManyTodos est une fonction du controller appelé quand la route add est atteinte

Le refresh service : rafraichit la liste des ecrvains après ajout  d'un ecrivain + un livre

```ts
@Injectable({ providedIn: 'root' })
export class RefreshService {
  private refreshSource = new Subject<void>();
  refresh$ = this.refreshSource.asObservable();

  trigger() {
    this.refreshSource.next();
  }
}
```

## On rafraichit la liste dans le component
```ts
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

```

## Dans le component qui affiche la liste, on sousrcit à l'observable et ses changements et si il y en a on reload la liste 

```ts
export class GetmanyComponent {

  client: Clients[] = [];

  constructor(
    private authorManyService: OnetomanyService,
    private refreshService: RefreshService
  ) {}

  ngOnInit(): void {
    this.loadData();

    this.refreshService.refresh$.subscribe(() => {
      this.loadData();
    });
  }
```
&#128736; Le private refreshService: RefreshService doit se trouver dans les 2 classes celle qui souscrit à lobserveur et celle qui observe ce service est la liaison entre ces classes


