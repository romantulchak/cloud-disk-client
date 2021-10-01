import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../service/loader.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss']
})
export class NavTopComponent implements OnInit {

  constructor(private loaderService: LoaderService) { }
  public isLoading: boolean;

  ngOnInit(): void {
    this.loading();
  }

  private loading(){
    this,this.loaderService.isLoading.subscribe(
      res=>{
        this.isLoading = res;
      }
    );
  }

}
