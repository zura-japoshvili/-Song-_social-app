import { conversationInt } from './../../../core/interfaces/conversationInt';
import { UserService } from './../../../core/services/user.service';
import { userDataInt } from './../../../core/interfaces/userDataInt';
import { getConvInt } from './../../../core/interfaces/getConvInt';
import { combineLatest, Observable, tap } from 'rxjs';
import { ChatService } from './../../../core/services/chat.service';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatComponent implements OnInit {

  constructor(private chatService: ChatService,
    private userService: UserService) { }

  currentUser = "63612d68c7f18ca0d1cf5d73";
  public data!: conversationInt;
  ngOnInit(): void {
    combineLatest({
      conversations: this.chatService.getConversations(this.currentUser),
      users: this.userService.getAllUsers()
    }).pipe(tap((value) => {
      
      let convUsers: any = []
      value.conversations.forEach((param, index) => {
        if(param.members[0] !== this.currentUser){
          convUsers.push( {
            conversationId: param._id, 
            users: value.users.find(value => value._id === param.members[0])
          })
        }else{
          convUsers.push( {
            conversationId: param._id, 
            users: value.users.find(value => value._id === param.members[1])
          })
        }
      })
      
      value.users = convUsers;
    })).subscribe((value) => {
      console.log(value);
      
      this.data = value;
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
