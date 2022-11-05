import { ChatComponent } from './component/chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([{path: '',component: ChatComponent}])
  ]
})
export class ChatModule { }
