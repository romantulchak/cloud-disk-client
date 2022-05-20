import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthComponent} from './components/auth/auth.component';
import {AvailableComponent} from './components/available/available.component';
import {ComputerComponent} from './components/computer/computer.component';
import {DriveComponent} from './components/drive/drive.component';
import {FolderDetailsComponent} from './components/folder/folder-details/folder-details.component';
import {AuthGuard} from './guard/auth-guard.guard';
import {MyDiskComponent} from './components/my-disk/my-disk.component';
import {NoticedComponent} from './components/noticed/noticed.component';
import {RecentComponent} from './components/recent/recent.component';
import {TrashComponent} from './components/trash/trash.component';
import {LoginComponent} from "./components/auth/login/login.component";
import {SignupComponent} from "./components/auth/signup/signup.component";

const routes: Routes = [
  {
    path: 'auth', component: AuthComponent, canActivate: [AuthGuard], children: [
      {path: '', redirectTo: 'login', pathMatch: 'full'},
      {path: 'signup', component: SignupComponent},
      {path: 'login', component: LoginComponent},
    ]
  },
  {
    path: 'drive', component: DriveComponent, children: [
      {path: '', redirectTo: 'my-drive', pathMatch: 'full'},
      {path: 'my-drive', component: MyDiskComponent},
      {path: 'folders/:link', component: FolderDetailsComponent},
      {path: 'computer', component: ComputerComponent},
      {path: 'shared-with-me', component: AvailableComponent},
      {path: 'recent', component: RecentComponent},
      {path: 'noticed', component: NoticedComponent},
      {path: 'trash', component: TrashComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
