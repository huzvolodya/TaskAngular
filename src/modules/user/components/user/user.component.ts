import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserResponseInterface } from '../../../../interfaces';
import { ApiService } from '../../../core/services';
import { map } from 'rxjs/operators';
import { User } from 'src/models';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: User;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    const userId: number = this.activatedRoute.snapshot.params['id'];

    this.apiService.fetchUserById(userId)
      .pipe(
        map((res: UserResponseInterface) => res.data)
      )
      .subscribe((user) => {
        this.user = new User(user);
      });
  }

  back(): void {
    this.router.navigate(['./users']);
  }
}
