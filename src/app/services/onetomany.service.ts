import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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


       // 🔹 CREATE LIVRE
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



