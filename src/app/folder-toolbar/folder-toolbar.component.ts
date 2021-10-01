import { Component, OnInit } from '@angular/core';
import { FunctionService } from '../service/function.service';

@Component({
  selector: 'app-folder-toolbar',
  templateUrl: './folder-toolbar.component.html',
  styleUrls: ['./folder-toolbar.component.scss']
})
export class FolderToolbarComponent implements OnInit {

  constructor(public functionService: FunctionService) { }

  ngOnInit(): void {
  }

  public changeGrid(){

  }
}
