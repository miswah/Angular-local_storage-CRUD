import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { UserManagementService } from 'src/app/services/user-management/user-management.service';
import { User } from 'src/app/shared/user';

@Component({
  selector: 'app-user-operations',
  templateUrl: './user-operations.component.html',
  styleUrls: ['./user-operations.component.scss'],
})
export class UserOperationsComponent implements OnInit {
  title: string;
  constructor(
    private userService: UserManagementService,
    private toastr: ToastrService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  addUser(
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
    this.userService.createNewUser(user);
    this.toastr.success('New user added !!');
    newTitle.value = '';
    newUserName.value = '';
    newEmail.value = '';
    newAddress.value = '';
    newPhone.value = '';
  }

  //modal
  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {},
        (reason) => {}
      );
  }
}
