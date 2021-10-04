import { Component, HostListener, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { Router } from '@angular/router';
import { FolderDTO } from '../dto/folder.dto';
import { FileType } from '../model/enum/fileType.enum';
import { SizeType } from '../model/enum/sizeType.enum';
import { IStore } from '../model/interface/store.interface';
import { FolderService } from '../service/folder.service';

@Component({
  selector: 'app-folder-table',
  templateUrl: './folder-table.component.html',
  styleUrls: ['./folder-table.component.scss']
})
export class FolderTableComponent implements OnInit {
  constructor(private router: Router,
              private folderService: FolderService) { }

  @HostListener('contextmenu', ['$event'])
  onRightClick(event) {
    event.preventDefault();
  }
  @ViewChild(MatMenuTrigger, {static: true}) matMenuTrigger: MatMenuTrigger; 

  public menuTopLeftPosition =  {x: '0', y: '0'} 
  public currentFolderId: number;
  public isSelected: boolean = false;
  public displayedColumns: string[] = ['name', 'owner', 'lastChanged', 'size'];

  @Input("source") source: FolderDTO[];

  ngOnInit(): void {
  }

  public open(element: any){
    if(element.context == "FOLDER"){
      this.router.onSameUrlNavigation = 'reload';
      this.router.navigateByUrl(`drive/folders/${element.link}`);
    }else{
      console.log('FILE');
      
    }
  }
 
   public selectElement(element: FolderDTO){
     this.currentFolderId = element.id;
     this.isSelected = true;
   }

   public openContextMenu(event: MouseEvent, folder: FolderDTO){
      event.preventDefault();
      this.menuTopLeftPosition.x = event.clientX + 'px'; 
      this.menuTopLeftPosition.y = event.clientY + 'px'; 
      this.matMenuTrigger.menuData = {folder: folder};
      this.matMenuTrigger.openMenu(); 
   }

   public removeFolder(folder:any){
     this.folderService.removeFolder(folder.link).subscribe(
       res=>{
         this.source = this.source.filter(f => f.id !== folder.id);
       }
     );
   }
   
   public getSize(size: number): string{
     if(size > SizeType.B_MIN && size < SizeType.B_MAX){
      return this.convertBytes(size, SizeType.B_MIN) + " B";
     }else if(size > SizeType.KB_MIN && size < SizeType.KB_MAX){
          return this.convertBytes(size, SizeType.KB_MIN) + " KB";
      }else if(size > SizeType.MB_MIN && size < SizeType.MB_MAX){
         return this.convertBytes(size, SizeType.MB_MIN) + " MB";
      }else if(size > SizeType.GB_MIN && size < SizeType.GB_MAX){
        return this.convertBytes(size, SizeType.GB_MIN) + " GB";
      }
      return "";
   }

   private convertBytes(size: number, divied: number): string{
     return (size / divied).toPrecision(3);
   }
}
