import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {MatInputModule} from '@angular/material/input'
import { UserService } from '../../../services/user.service';
import { User } from '../../../../models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [MatInputModule, MatButtonModule, ReactiveFormsModule, CommonModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css'
})
export class UserFormComponent {
  public newUserForm: FormGroup;
  public editUserId!: string;

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.newUserForm = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'age': new FormControl(null, [Validators.required]),
      'address': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(8)]),
    })
  }

  ngOnInit(){
    this.editUserId = this.activatedRoute.snapshot.params['id'];
    if(this.editUserId) {
      this.userService.getUser(this.editUserId).subscribe((result) => {
        this.newUserForm.patchValue(result);
      });
    }
  }

  addUser(){
    if(this.newUserForm.invalid) {
      alert('Prašome užpildyti privalomus laukus');
      return;
    }
    const model: User = this.newUserForm.value as User;
    this.userService.addUser(model).subscribe((result) => {
      alert('Vartotojas pridėtas sėkmingai');
      this.router.navigateByUrl('/');
    })
  }

  updateUser(){
    if(this.newUserForm.invalid) {
      alert('Prašome užpildyti privalomus laukus');
      return;
    }
    const model: User = this.newUserForm.value as User;
    this.userService.updateUser(this.editUserId, model).subscribe((result) => {
      alert('Vartotojas atnaujintas sėkmingai');
      this.router.navigateByUrl('/');
    })
  }

}
