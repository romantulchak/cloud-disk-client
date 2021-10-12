import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FileDTO } from '../dto/file.dto';
import { FolderDTO } from '../dto/folder.dto';

const API_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }


  public search(name: string): Observable<FolderDTO[] | FileDTO[]>{
    return this.http.get<FolderDTO[] | FileDTO[]>(`${API_URL}search/${name}`);
  }
}
