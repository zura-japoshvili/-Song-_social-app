import { NavigationComponent } from './component/navigation.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [NavigationComponent],
    imports: [
        CommonModule,
        RouterLink
    ],
  exports: [NavigationComponent]
})
export class NavigationModule { }
