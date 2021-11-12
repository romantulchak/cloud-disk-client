import {Component, OnInit} from '@angular/core';
import {Context} from '../model/context.model';
import {DriveService} from '../service/drive.service';
import {FunctionService} from '../service/function.service';

@Component({
  selector: 'app-nav-left-side',
  templateUrl: './nav-left-side.component.html',
  styleUrls: ['./nav-left-side.component.scss']
})
export class NavLeftSideComponent implements OnInit {

  public context: Context;

  constructor(public functionService: FunctionService,
              private driveService: DriveService) {
  }

  ngOnInit(): void {
    this.driveService.contextSubject.subscribe(
      res => {
        this.context = res;
      }
    );
  }

}
