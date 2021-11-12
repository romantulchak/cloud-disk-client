import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FileDTO} from '../dto/file.dto';
import {FolderDTO} from '../dto/folder.dto';
import {ElementService} from '../service/element.service';

@Component({
  selector: 'app-rename-dialog',
  templateUrl: './rename-dialog.component.html',
  styleUrls: ['./rename-dialog.component.scss']
})
export class RenameDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public element: FileDTO | FolderDTO,
              private elementService: ElementService) {
  }

  ngOnInit(): void {
  }

  public rename(): void {
    this.elementService.renameElement(this.element.name, this.element.link).subscribe(
      () => {
        console.log("Renamed");
      }
    );
  }
}
