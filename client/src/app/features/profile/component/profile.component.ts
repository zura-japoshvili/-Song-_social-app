import { tap, catchError, of } from 'rxjs';
import { UserService } from './../../../core/services/user.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  private userName!: string;
  constructor(private route: ActivatedRoute,
    private userService: UserService) { }

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('username')!;
    
    // this.userService.loadUser(this.userName).pipe(
    //   tap((data) => {

    //   }),
    //   catchError(err => {
                
    //     return of([]);
    //   })
    // ).subscribe();
  }

}
