import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResponseInterface } from '../../../interfaces';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

  constructor(private http: HttpClient) {
  }

  fetchUsers(page): Observable<any> {
    return this.http.get('https://reqres.in/api/users?page=' + page).pipe(map(response => response));
  }

  fetchUserById(id: number): Observable<UserResponseInterface> {
    return this.http.get(`https://reqres.in/api/users/${id}`).pipe(map(response => response));
  }
}
