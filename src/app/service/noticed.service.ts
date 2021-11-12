import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {FileDTO} from '../dto/file.dto';
import {FolderDTO} from '../dto/folder.dto';

const API_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class NoticedService {

  constructor(private http: HttpClient) {
  }

  public getNoticedElements(): Observable<FolderDTO[] | FileDTO[]> {
    return this.http.get<FolderDTO[] | FileDTO[]>(`${API_URL}notice/get-noticed-elements`);
  }

  public addElementToNoticed(link: string): Observable<void> {
    return this.http.put<void>(`${API_URL}notice/set-noticed/${link}`, null);
  }

  public removeFromStarred(link: string): Observable<void> {
    return this.http.put<void>(`${API_URL}notice/remove-from-noticed/${link}`, null);
  }
}
