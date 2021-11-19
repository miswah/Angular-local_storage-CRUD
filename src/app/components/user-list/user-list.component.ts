import { Component, OnInit } from '@angular/core';
import { UserManagementService } from 'src/app/services/user-management/user-management.service';
import { User } from 'src/app/shared/user';

//npm packages
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  term: string;
  constructor(
    private userService: UserManagementService,
    private modalService: NgbModal,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.users = this.userService.fetchAllUsers();
  }

  deleteUser(user: User) {
    if (confirm(`Are you sure you want to delete ${user.title}`)) {
      this.userService.deleteUser(user);
      this.toastr.success('User deleted successfully!!');
    }
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }

  updateUser(
    newTitle: HTMLInputElement,
    newUserName: HTMLInputElement,
    newEmail: HTMLInputElement,
    newAddress: HTMLInputElement,
    newPhone: HTMLInputElement
  ) {
    let user: User = {
      title: newTitle.value,
      username: newUserName.value,
      email: newEmail.value,
      address: newAddress.value,
      phone: newPhone.value,
    };

    this.userService.editUser(user);
    this.toastr.success('User updated successfully!!');
  }
}
