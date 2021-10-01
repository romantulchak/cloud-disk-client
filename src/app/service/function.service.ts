import { Injectable } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { CreateFolderDialogComponent } from "../create-folder-dialog/create-folder-dialog.component";

@Injectable({
    providedIn:'root'
})
export class FunctionService{
    
    constructor(private dialog: MatDialog){
    }

    public createFolder(){
        this.dialog.open(CreateFolderDialogComponent, {
          panelClass: 'create__folder_container',
        });
      }
}