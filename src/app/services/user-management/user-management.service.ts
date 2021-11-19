import { Injectable } from '@angular/core';
import { User } from 'src/app/shared/user';

@Injectable({
  providedIn: 'root',
})
export class UserManagementService {
  public users: User[] = [];
  constructor() {
    this.users = JSON.parse(localStorage.getItem('users') || '{}');
  }

  //Create a new user and store it in localstorage
  createNewUser(user: User) {
    this.users.push(user);
    let users = [];
    if (localStorage.getItem('users') == null) {
      users = [];
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    } else {
      users = JSON.parse(localStorage.getItem('users') || '{}');
      users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    }
  }

  //fetch user from localstorage
  fetchAllUsers() {
    if (localStorage.getItem('users') == null) {
      this.users = [];
    } else {
      this.users = JSON.parse(localStorage.getItem('users') || '{}');
    }
    return this.users;
  }

  //edit user from localstorage
  editUser(user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (user.username == this.users[i].username) {
        this.users.splice(i, 1, user);
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }
  }

  //deleting user from localstorage
  deleteUser(user: User) {
    for (let i = 0; i < this.users.length; i++) {
      if (user == this.users[i]) {
        this.users.splice(i, 1);
        localStorage.setItem('users', JSON.stringify(this.users));
      }
    }
  }
}
