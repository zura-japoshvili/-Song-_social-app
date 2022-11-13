import {ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef} from '@angular/core';
import {conversationInt} from "../../../core/interfaces/conversationInt";
import {ChatService} from "../../../core/services/chat.service";
import {userDataInt} from "../../../core/interfaces/userDataInt";
import {IoUserInt} from "../../../core/interfaces/ioUserInt";
import {UserService} from "../../../core/services/user.service";
import {faCircle} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersListComponent implements OnInit {
  public faCircle = faCircle;

  @Input() currentUserId!: string

  IoActiveUsers!: IoUserInt[]
  newList: userDataInt[] = [];


  constructor(private _chatService: ChatService,
              private _change: ChangeDetectorRef,
              private _userService: UserService) { }

  ngOnInit(): void {
    this._chatService.addUser(this.currentUserId).subscribe((data) => {
      this.IoActiveUsers = data;
      this.setUsers()
    });


  }
  public setUsers(){
    this._userService.getAllUsers().subscribe((value: userDataInt[]) => {
      for (let i = 0; i <= this.IoActiveUsers.length; i++){
        const user = value.find((value) => value._id === this.IoActiveUsers[0].userId && value._id !== this.currentUserId);
        if (user)
          this.newList.push(user)
      }
      this._change.markForCheck();
    })
  }

}
