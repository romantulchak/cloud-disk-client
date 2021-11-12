import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {ElementAccessDTO} from '../dto/element-access.dto';

const API_URL = environment.api;

@Injectable({
  providedIn: 'root'
})
export class ElementAccessService {

  constructor(private http: HttpClient) {
  }


  public findElementAccess(link: string): Observable<ElementAccessDTO> {
    return this.http.get<ElementAccessDTO>(`${API_URL}access/${link}`)
  }

  public changeAccessType(link: string, type: string): Observable<ElementAccessDTO> {
    return this.http.put<ElementAccessDTO>(`${API_URL}access/change/${link}`, type);
  }

  public findAccessTypes(): Observable<string[]> {
    return this.http.get<string[]>(`${API_URL}access/types`);
  }

  public openAccess(link: string, type: string): Observable<ElementAccessDTO> {
    return this.http.put<ElementAccessDTO>(`${API_URL}access/open/${link}`, type);
  }

  public closeAccess(link: string): Observable<void> {
    return this.http.put<void>(`${API_URL}access/close/${link}`, null);
  }
}
