import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './app.component';
import {NavLeftSideComponent} from './components/nav/nav-left-side/nav-left-side.component';
import {NavTopComponent} from './components/nav/nav-top/nav-top.component';
import {MyDiskComponent} from './components/my-disk/my-disk.component';
import {ComputerComponent} from './components/computer/computer.component';
import {AvailableComponent} from './components/available/available.component';
import {RecentComponent} from './components/recent/recent.component';
import {NoticedComponent} from './components/noticed/noticed.component';
import {TrashComponent} from './components/trash/trash.component';
import {DriveComponent} from './components/drive/drive.component';
import {AuthComponent} from './components/auth/auth.component';
import {authInterceptorProviders} from './helper/auth.interceptor';
import {MatDialogModule} from '@angular/material/dialog';
import {MatMenuModule} from '@angular/material/menu';
import {CreateFolderDialogComponent} from './components/dialog/create-folder-dialog/create-folder-dialog.component';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatTableModule} from '@angular/material/table';
import {FolderDetailsComponent} from './components/folder/folder-details/folder-details.component';
import {FolderToolbarComponent} from './components/folder/folder-toolbar/folder-toolbar.component';
import {FolderTableComponent} from './components/folder/folder-table/folder-table.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {loaderInterceptorProviders} from './helper/loader.interceptor';
import {UploadDialogComponent} from './components/dialog/upload-dialog/upload-dialog.component';
import {FileIconComponent} from './components/file-icon/file-icon.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {ContextMenuComponent} from './components/context-menu/context-menu.component';
import {DownloadDialogComponent} from './components/dialog/download-dialog/download-dialog.component';
import {FileExtensionPipe} from './pipe/file-extension.pipe';
import {DialogHeaderUploadDownloadComponent} from './components/dialog/dialog-header-upload-download/dialog-header-upload-download.component';
import {FileSizePipe} from './pipe/file-size.pipe';
import {SvgStylePipe} from './pipe/svg-style.pipe';
import {AccessDialogComponent} from './components/dialog/access-dialog/access-dialog.component';
import {RenameDialogComponent} from './components/dialog/rename-dialog/rename-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {MatSidenavModule} from '@angular/material/sidenav';
import {HistoryComponent} from './components/history/history.component';
import {PropertySidenavComponent} from './components/property/property-sidenav/property-sidenav.component';
import {PropertyComponent} from './components/property/property.component';
import {MatTabsModule} from '@angular/material/tabs';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {FilePreviewDialogComponent} from './components/dialog/file-preview-dialog/file-preview-dialog.component';
import {LoginComponent} from './components/auth/login/login.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";

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
    InfiniteScrollModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  providers: [authInterceptorProviders, loaderInterceptorProviders, FileExtensionPipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
