import { conversationInt } from './../../../core/interfaces/conversationInt';
import { UserService } from './../../../core/services/user.service';
import { userDataInt } from './../../../core/interfaces/userDataInt';
import { getConvInt } from './../../../core/interfaces/getConvInt';
import { combineLatest, forkJoin, map, Observable, tap } from 'rxjs';
import { ChatService } from './../../../core/services/chat.service';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService,
    private userService: UserService,
    private _change: ChangeDetectorRef) { }

  currentUser = "63612d68c7f18ca0d1cf5d73";
  public data!: conversationInt[]
  ngOnInit(): void {
    forkJoin({
      conversations: this.chatService.getConversations(this.currentUser),
      users: this.userService.getAllUsers(),
    }).pipe(map((value) => {
      
      let convUsers: any  = []
      value.conversations.forEach((param, index) => {
        if(param.members[0] !== this.currentUser){
          convUsers.push( {
            conversationId: param._id, 
            user: value.users.find(value => value._id === param.members[0])
          })
        }else{
          convUsers.push( {
            conversationId: param._id, 
            user: value.users.find(value => value._id === param.members[1])
          })
        }
      })
      return convUsers
    })).subscribe((value: conversationInt[]) => {    
      console.log(value);
        
      this.data = value;
      this._change.markForCheck();
    })
  }
public z(data: any){
  console.log(data);
  
}
  // setConv(): Observable<getConvInt []>{
  //   return this.chatService.getConversations("63612d68c7f18ca0d1cf5d73").pipe((data) => data);
  // }
  
  // openConv(data: userDataInt){
  //   this.chatService.getUserMessage(this.currentUser, data._id)
  // }
}
