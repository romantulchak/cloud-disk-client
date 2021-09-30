import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { AvailableComponent } from './available/available.component';
import { ComputerComponent } from './computer/computer.component';
import { DriveComponent } from './drive/drive.component';
import { AuthGuard } from './guard/auth-guard.guard';
import { MyDiskComponent } from './my-disk/my-disk.component';
import { NoticedComponent } from './noticed/noticed.component';
import { RecentComponent } from './recent/recent.component';
import { TrashComponent } from './trash/trash.component';

const routes: Routes = [
  {path:'auth', component: AuthComponent, canActivate: [AuthGuard]},
  {path: 'drive', component: DriveComponent, children: [
    {path: 'my-drive', component: MyDiskComponent},
    {path: 'computer', component: ComputerComponent},
    {path: 'shared-with-me', component: AvailableComponent},
    {path: 'recent', component: RecentComponent},
    {path: 'noticed', component: NoticedComponent},
    {path: 'trash', component: TrashComponent},
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
