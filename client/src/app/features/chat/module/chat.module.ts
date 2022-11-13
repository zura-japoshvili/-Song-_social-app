import { NavigationModule } from '../../../shared/navigation/navigation.module';
import { ChatComponent } from '../chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import {MessageChatComponent} from "../message-chat/message-chat.component";
import {UsersListComponent} from "../users-list/users-list.component";


@NgModule({
  declarations: [ChatComponent, MessageChatComponent, UsersListComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NavigationModule,
    RouterModule.forChild([{path: '',component: ChatComponent},])
  ]
})
export class ChatModule { }
