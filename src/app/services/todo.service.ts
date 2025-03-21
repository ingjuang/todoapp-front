import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../../interfaces/task';
import { PetitionResponse } from '../../interfaces/petitionResponse';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = `${environment.apiUrl}/Task`;
  private http = inject(HttpClient);

  getAll(): Observable<PetitionResponse> {
    return this.http.get<PetitionResponse>(this.apiUrl);
  }

  getById(id: string): Observable<PetitionResponse> {
    return this.http.get<PetitionResponse>(`${this.apiUrl}/${id}`);
  }

  create(task: Task): Observable<PetitionResponse> {
    return this.http.post<PetitionResponse>(this.apiUrl, task);
  }

  update(task: Task): Observable<PetitionResponse> {
    return this.http.put<PetitionResponse>(this.apiUrl, task);
  }

  delete(id: string): Observable<PetitionResponse> {
    return this.http.delete<PetitionResponse>(`${this.apiUrl}/${id}`);
  }
}
