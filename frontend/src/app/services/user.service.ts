import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  public apiUrl = "http://localhost:3000";
  constructor(private http: HttpClient) { }

  public getUsers() {
    return this.http.get<User[]>(this.apiUrl + '/users')
  }

  public getUser(id: string) {
    return this.http.get<User>(this.apiUrl + '/users/' + id)
  }

  public addUser(model: User){
    return this.http.post<User>(this.apiUrl + '/users', model)
  }

  public updateUser(id: string, model: User){
    return this.http.put<User>(this.apiUrl + '/users/' + id, model)
  }

  public deleteUser(id: string){
    return this.http.delete(this.apiUrl + '/users/' + id)
  }

}
