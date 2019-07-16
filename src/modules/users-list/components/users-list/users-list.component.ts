import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { User, Pagination } from '../../../../models';
import { UserInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
    paginationInfo: Pagination = {} as Pagination;
    subscriptions: Subscription[] = [];
    users: User[] = [];

    columns = [ 'firstName', 'lastName', 'email' ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.onRouteChange();
    this.onRouteDataRedraw();
  }

  pageChanged(event: PageEvent): void {
      this.paginationInfo.activePage = (event.pageIndex > event.previousPageIndex) ? ++this.paginationInfo.activePage : --this.paginationInfo.activePage;
      this.router.navigate(['./'], { queryParams: { page: this.paginationInfo.activePage } });
  }

  userSelected(user: UserInterface): void {
    this.router.navigate(['./user', user.id]);
  }

  private onRouteDataRedraw(): void {
    this.subscriptions.push(
      this.activatedRoute.data
        .pipe(
          map(response => {
            this.paginationInfo = new Pagination(response.users);
            return response.users.data;
          })
        )
        .pipe(
          map(users => users.map(user => new User(user)))
        )
        .subscribe((users: User[]) => {
          this.users = users;
        })
    );
  }

  private onRouteChange() {
    this.subscriptions.push(
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd)
        ).subscribe(() => {
          this.apiService.fetchUsers(this.paginationInfo.activePage)
            .pipe(
              map(response => {
                this.paginationInfo = new Pagination(response);
                return response.data;
              })
            )
            .pipe(
              map(users => users.map(user => new User(user)))
            )
            .subscribe(users => this.users = users);
        })
    );
  }
}
