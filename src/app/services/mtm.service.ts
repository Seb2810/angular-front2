import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { FormGroup,  FormBuilder,  Validators, FormControl } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class MtmService {


  private baseUrl = `${environment.apiUrl}/mtm`;

  constructor(private http: HttpClient) {}

  // 🔹 GET ALL
  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl);
  }

  // 🔹 ADD LIVRE
  addLivre(ecrivainId: number, name: string) {
    return this.http.post(`${this.baseUrl}/add`, {
      id: ecrivainId,
      addmylivre: name
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

  // 🔹 UPDATE LIVRE
  updateLivre(livreId: number, name: string) {
    return this.http.put(`${this.baseUrl}/update`, {
      id: livreId,
      name
    });
  }

  // 🔹 DELETE ONE LIVRE
  deleteOne(livreId: number, ecrivainId: number) {
    return this.http.delete(
      `${this.baseUrl}/delete/${livreId}/${ecrivainId}`
    );
  }

  // 🔹 DELETE ALL (ECRIVAIN + LIVRES)
  deleteAll(ecrivainId: number) {
    return this.http.delete(
      `${this.baseUrl}/delete-all/${ecrivainId}`
    );
  }
}

