import { tap, catchError, of } from 'rxjs';
import { UserService } from './../../../core/services/user.service';
import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {userDataInt} from "../../../core/interfaces/userDataInt";
import {ProfileService} from "../../../core/services/profile.service";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('SlideOutAnimation', [
      // ...
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.8,
        transform: "translateX(200px)",
        backgroundColor: '#ddff54'
      })),
      transition('open => closed', [
        animate('0.2s')
      ]),
      transition('closed => open', [
        animate('0.5s')
      ]),
    ]),
  ],
})
export class ProfileComponent implements OnInit {
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private _profileService: ProfileService,
              private _change: ChangeDetectorRef) { }

  public faPenToSquare = faPenToSquare;

  private userName!: string;

  public userData!: userDataInt;
  user: userDataInt = JSON.parse(localStorage.getItem('User')!);

  profilePic = new FormData();

  public isOpen = false;
  public errorText !:string

  toggle() {
    this.isOpen = !this.isOpen;
    console.log(this.isOpen)
  }

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
      this._profileService.uploadImg(formData ).pipe(
        catchError(err => {
          this.errorText = err.error;
          this.isOpen = true;
          console.log(this.errorText, err)
          this._change.markForCheck();
          return of([]);
        })
      ).subscribe((value) => {
        if (typeof value === "string") {
          this.userData.profilePicture = value;
        }
        this._change.markForCheck();
      });
    }

  }
}
