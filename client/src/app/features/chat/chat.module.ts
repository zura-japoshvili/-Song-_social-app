import { NavigationModule } from './../../shared/navigation/navigation.module';
import { ChatComponent } from './component/chat.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ChatComponent],
  imports: [
    CommonModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    NavigationModule,
    RouterModule.forChild([{path: '',component: ChatComponent}])
  ]
})
export class ChatModule { }
