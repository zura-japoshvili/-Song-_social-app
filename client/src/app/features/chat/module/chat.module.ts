import { NavigationModule } from '../../../shared/navigation/navigation.module';
import { ChatComponent } from '../chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import {MessageChatComponent} from "../message-chat/message-chat.component";


@NgModule({
  declarations: [ChatComponent, MessageChatComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NavigationModule,
    RouterModule.forChild([{path: '',component: ChatComponent}, {path: '', component: MessageChatComponent}])
  ]
})
export class ChatModule { }
