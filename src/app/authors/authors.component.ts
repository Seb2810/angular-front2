import { Component, OnInit } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable, delay, map } from 'rxjs';
import { RefreshService } from '../services/refresh.service';
import { HasoneService } from '../services/hasone.service';

interface Clients {

  id : number;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;
  book :Book;

}

interface  Book{
  id : number;
 name: string;
  createdAt: Date;
  updatedAt: Date;

}

@Component({
  standalone: false,
  selector: 'app-authors',
  templateUrl: './authors.component.html',
  styleUrls: ['./authors.component.css']
})


export class AuthorsComponent implements OnInit {

  client: Clients[] = [];

  constructor(
    private hasoneService: HasoneService,
    private refreshService: RefreshService
  ) {}

  /* ===================== INIT ===================== */

  ngOnInit(): void {
    this.loadData();

    this.refreshService.refresh$.subscribe(() => {
      this.loadData();
    });
  }

  /* ===================== DATA ===================== */

  loadData(): void {
    this.hasoneService.getAll().subscribe({
      next: (data) => {
        console.log('📦 HAS ONE DATA', data);
        this.client = data;
      },
      error: (err) => {
        console.error('❌ loadData error', err);
      }
    });
  }

  trackById(index: number, client: Clients): number {
    return client.id;
  }

  /* ===================== UPDATE BOOK ===================== */

  onSubmit(
    input: HTMLInputElement,
    clientId: number
  ): void {

    const name = input.value.trim();
    if (!name) return;

    this.hasoneService.UpdateBook(clientId, name)
      .subscribe({
        next: (updatedBook) => {

          const client : any = this.client.find(a => a.id === clientId);

          if (client) {
            client.book = updatedBook; // 🔥 HAS ONE update UI
          }
          input.value = '';
        },
        error: (err) => {
          console.error('❌ updateBook error', err);
        }
      });
  }

  /* ===================== DELETE AUTHOR + BOOK ===================== */

  onDeleteAll(authorId: number): void {
    this.hasoneService.deleteAll(authorId)
      .subscribe({
        next: () => {
          this.client = this.client.filter(a => a.id !== authorId);
        },
        error: (err) => {
          console.error('❌ deleteAuthor error', err);
        }
      });
  }
}

