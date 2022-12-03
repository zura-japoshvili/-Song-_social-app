import { tap, catchError, of } from 'rxjs';
import { UserService } from './../../../core/services/user.service';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {userDataInt} from "../../../core/interfaces/userDataInt";
import {ProfileService} from "../../../core/services/profile.service";

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
              private _profileService: ProfileService,
              private _change: ChangeDetectorRef) { }

  public userData!: userDataInt;
  user: userDataInt = JSON.parse(localStorage.getItem('User')!);

  profilePic = new FormData();

  ngOnInit(): void {
    this.userName = this.route.snapshot.paramMap.get('username')!;
    this.userService.loadUser(this.userName).subscribe(
      (value) => {
        this.userData = value
        this._change.markForCheck();
      }
    );
  }

  uploadPic(event: Event){
    const img: File = (event.target as HTMLInputElement).files![0];
    let formData = new FormData
    if (img){
      formData.set("image", img)
      formData.set("id", this.user._id)
      this._profileService.uploadImg(formData ).subscribe((value) => {
        console.log(value)
      });
    }

  }
}
