import { Router } from '@angular/router';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { userDataInt } from 'src/app/core/interfaces/userDataInt';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavigationComponent implements OnInit {

  constructor(private _router: Router) { }
  user: userDataInt = JSON.parse(localStorage.getItem('User')!);

  ngOnInit(): void {
  }

  public onLogOut(){
    localStorage.clear()
    this._router.navigateByUrl('/').then()
  }
}
