import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HasoneService {

  private baseUrl = `${environment.apiUrl}/author`;

  constructor(private http: HttpClient) {}

  // 🔹 GET ALL
    getAll(): Observable<any[]> {
      return this.http.get<any[]>(this.baseUrl);
    }

  // 🔹 UPDATE LIVRE
  UpdateBook(bookId: number, name: string) {
    return this.http.put(`${this.baseUrl}/update`, {
      id: bookId,
      name: name
    });
  }

     // 🔹 CREATE LIVRE
createLivre(payload: {
  firstName: string;
  lastName: string;
  name: string;
}) {
  return this.http.post(`${this.baseUrl}/create`, payload);
}


  // 🔹 DELETE ALL (ECRIVAIN + LIVRES)
  deleteAll(authorId: number) {
    return this.http.delete(
      `${this.baseUrl}/delete-all/${authorId}`
    );
  }

}
