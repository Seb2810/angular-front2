import { Component , ViewChild, ElementRef } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { FormControl, FormGroup, Validators ,FormsModule  } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RefreshService } from '../services/refresh.service';
import { OnetomanyService } from '../services/onetomany.service';


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


