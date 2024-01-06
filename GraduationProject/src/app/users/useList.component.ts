import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';

import { AccountService } from '@app/_services';

@Component({ templateUrl: 'useList.component.html' })
export class UserListComponent implements OnInit {
    users = null;
    currentUser=null;
    constructor(private accountService: AccountService) {}

    ngOnInit() {
      this.accountService.user.subscribe(x => this.currentUser = x);

        this.accountService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    deleteUser(id: string) {
        const user = this.users.find(x => x.id === id);
        user.isDeleting = true;
        this.accountService.delete(id)
            .pipe(first())
            .subscribe(() => this.users = this.users.filter(x => x.id !== id));
    }
}
