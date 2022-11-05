import { NotFoundComponent } from './shared/not-found/not-found.component';
import { NgModule } from '@angular/core';
import {Routes, RouterModule,} from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './features/login/login.component';


const routes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'profile/:username',
        loadChildren: () => 
            import('./features/profile/profile.module').then(
                (res) => res.ProfileModule
            )
    },
    {
        path: 'chat',
        loadChildren: () => 
            import('./features/chat/chat.module').then(
                (res) => res.ChatModule
            )
    },
    { 
        path: '**',
        component: NotFoundComponent
    }
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes),
    ],
    exports: [RouterModule]
  })
  
  
  export class AppRoutingModule { }