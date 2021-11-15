import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FileDTO} from '../dto/file.dto';
import {FolderDTO} from '../dto/folder.dto';
import {ContextType} from '../model/enum/contextType.enum';
import {LoaderService} from '../service/loader.service';
import {SearchService} from '../service/search.service';

@Component({
  selector: 'app-nav-top',
  templateUrl: './nav-top.component.html',
  styleUrls: ['./nav-top.component.scss'],
})
export class NavTopComponent implements OnInit {


  public isLoading: boolean;
  public value: string = "";
  public searchResult: FolderDTO[] | FileDTO[];
  public isSearchBlockShow: boolean = false;
  public context = ContextType;

  constructor(private loaderService: LoaderService,
              private searchService: SearchService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.loading();
  }

  private loading(): void {
    this.loaderService.isLoading.subscribe(
      res => {
        setTimeout(() => {
          this.isLoading = res;
        }, 1);
      }
    );
  }

  public search(): void {
    if (this.value.length > 0) {
      this.searchService.search(this.value).subscribe(
        res => {
          this.searchResult = res;
        }
      );
    }
  }

  public showSearchBlock(): void {
    this.isSearchBlockShow = true;
  }

  public hideSearchBlock(): void {
    setTimeout(() => {
      this.isSearchBlockShow = false;
    }, 300);
  }

  public openFolder(element: FolderDTO | FileDTO): void {
    if(element.context === ContextType.FOLDER){
      this.router.navigateByUrl(`drive/folders/${element.link}`);
    }
  }

}
