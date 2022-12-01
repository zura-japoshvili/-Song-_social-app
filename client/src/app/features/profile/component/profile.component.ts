import { tap, catchError, of } from 'rxjs';
import { UserService } from './../../../core/services/user.service';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {userDataInt} from "../../../core/interfaces/userDataInt";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent implements OnInit {
  private userName!: string;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private _change: ChangeDetectorRef) { }

  public userData!: userDataInt;

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('username')!;

    this.userService.loadUser(this.userName).subscribe(
      (value) => {
        this.userData = value;

        this._change.markForCheck();
      }
    );
  }

}
