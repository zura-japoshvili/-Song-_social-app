import { Router } from '@angular/router';
import { userDataInt } from './../../core/interfaces/userDataInt';
import { loginInt } from './../../core/interfaces/loginInt';
import { UserService } from './../../core/services/user.service';
import { ChangeDetectionStrategy, Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { faIdCard, faEnvelope, faKey, faUser } from '@fortawesome/free-solid-svg-icons';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { userRegInt } from 'src/app/core/interfaces/userRegInt';
import { tap, catchError, of, delay } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
  // For FontAwesome Icons
  faIdCard = faIdCard
  faEnvelope = faEnvelope
  faKey = faKey
  faUser = faUser
  
  logEmailAlert = false;
  logPassAlert = false;

  login: boolean = false;

  
  
  public regForm = new FormGroup(
    {
      username: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    }
  ) 

  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(
    private _userService: UserService, 
    private _change: ChangeDetectorRef,
    private _router: Router
    ) { }

  ngOnInit(): void {
  }

  public clickForm(){
    this.login ? this.login =  false :  this.login = true;
    console.log(this.login);
  }

  public onRegister(){
    this._userService.postUser(this.regForm.value as userRegInt).pipe( 
      tap((data) => {
        
      }),
      catchError(err => {
        console.log('Whoops ://');
        return of([]);
      })
    ).subscribe();
  }

  public onLogin(){
    this._userService.getUser(this.loginForm.value as loginInt).pipe(
      tap((data) => {
        localStorage.setItem("User", JSON.stringify(data));
        this._router.navigateByUrl('/chat').then();
      }),
      catchError(err => {
        err.error == 'Email not found' ? this.logEmailAlert = true : this.logEmailAlert = false;
        err.error == 'Wrong password' ? this.logPassAlert = true : this.logPassAlert = false;
        this._change.markForCheck();
        return of ([]);
      })
    ).subscribe()
  }
  
}
