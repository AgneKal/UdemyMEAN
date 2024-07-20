import { Component } from '@angular/core';
import { User } from '../../../models/user';
import { UserService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, MatButtonModule, RouterLink],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  public users: User[] = [];

  private loadUsers(){
    this.userService.getUsers().subscribe({
      next:(data) => {
        this.users = data;
      }
    })
  }

  constructor(private userService: UserService){
    this.loadUsers();
  }

  public deleteUser(id: string){
    const ok = confirm("Ar tikrai norite ištrinti vartotoją?")
    if (ok) {
      this.userService.deleteUser(id).subscribe({
        next: (result) => {
          this.loadUsers();
          alert('Vartotojas sėkmingai ištrintas')
        }
      })
    }
  }
  
}
