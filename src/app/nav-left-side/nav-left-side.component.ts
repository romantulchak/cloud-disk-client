import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateFolderDialogComponent } from '../create-folder-dialog/create-folder-dialog.component';
import { FunctionService } from '../service/function.service';

@Component({
  selector: 'app-nav-left-side',
  templateUrl: './nav-left-side.component.html',
  styleUrls: ['./nav-left-side.component.scss']
})
export class NavLeftSideComponent implements OnInit {

  constructor(public functionService: FunctionService) { }

  ngOnInit(): void {
    
  }

 
}
