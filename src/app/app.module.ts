import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {NavLeftSideComponent} from './nav-left-side/nav-left-side.component';
import {NavTopComponent} from './nav-top/nav-top.component';
import {MyDiskComponent} from './my-disk/my-disk.component';
import {ComputerComponent} from './computer/computer.component';
import {AvailableComponent} from './available/available.component';
import {RecentComponent} from './recent/recent.component';
import {NoticedComponent} from './noticed/noticed.component';
import {TrashComponent} from './trash/trash.component';
import {DriveComponent} from './drive/drive.component';
import {AuthComponent} from './auth/auth.component';
import {authInterceptorProviders} from './helper/auth.interceptor';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {CreateFolderDialogComponent} from './create-folder-dialog/create-folder-dialog.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {FolderDetailsComponent} from './folder-details/folder-details.component';
import {FolderToolbarComponent} from './folder-toolbar/folder-toolbar.component';
import {FolderTableComponent} from './folder-table/folder-table.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {loaderInterceptorProviders} from './helper/loader.interceptor';
import {UploadDialogComponent} from './upload-dialog/upload-dialog.component';
import {FileIconComponent} from './file-icon/file-icon.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ContextMenuComponent} from './context-menu/context-menu.component';
import {DownloadDialogComponent} from './download-dialog/download-dialog.component';
import {FileExtensionPipe} from './pipe/file-extension.pipe';
import {DialogHeaderUploadDownloadComponent} from './dialog-header-upload-download/dialog-header-upload-download.component';
import {FileSizePipe} from './pipe/file-size.pipe';
import {SvgStylePipe} from './pipe/svg-style.pipe';
import {AccessDialogComponent} from './access-dialog/access-dialog.component';
import {RenameDialogComponent} from './rename-dialog/rename-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {HistoryComponent} from './history/history.component';
import {PropertySidenavComponent} from './property-sidenav/property-sidenav.component';
import {PropertyComponent} from './property/property.component';
import {MatTabsModule} from '@angular/material/tabs';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FilePreviewDialogComponent} from './file-preview-dialog/file-preview-dialog.component';
import {LoginComponent} from './auth/login/login.component';
import {SignupComponent} from './auth/signup/signup.component';

@NgModule({
  declarations: [
    AppComponent,
    NavLeftSideComponent,
    NavTopComponent,
    MyDiskComponent,
    ComputerComponent,
    AvailableComponent,
    RecentComponent,
    NoticedComponent,
    TrashComponent,
    DriveComponent,
    AuthComponent,
    CreateFolderDialogComponent,
    FolderDetailsComponent,
    FolderToolbarComponent,
    FolderTableComponent,
    UploadDialogComponent,
    FileIconComponent,
    ContextMenuComponent,
    DownloadDialogComponent,
    FileExtensionPipe,
    DialogHeaderUploadDownloadComponent,
    FileSizePipe,
    SvgStylePipe,
    AccessDialogComponent,
    RenameDialogComponent,
    HistoryComponent,
    PropertySidenavComponent,
    PropertyComponent,
    FilePreviewDialogComponent,
    LoginComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    MatDialogModule,
    MatMenuModule,
    DragDropModule,
    MatTableModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSidenavModule,
    MatTabsModule,
    InfiniteScrollModule
  ],
  providers: [authInterceptorProviders, loaderInterceptorProviders, FileExtensionPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
