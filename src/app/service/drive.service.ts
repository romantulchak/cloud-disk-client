import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { DriveDTO } from "../dto/drive.dto";
import { Context } from "../model/context.model";
import { ContextEnum } from "../model/enum/context.enum";

const API_URL = environment.api;

@Injectable({
    providedIn: 'root'
})
export class DriveService{

    public contextSubject: BehaviorSubject<Context> = new BehaviorSubject(null);

    constructor(private http: HttpClient){

    }

    private getUserDrive(): Observable<DriveDTO>{
        return this.http.get<DriveDTO>(`${API_URL}my-drive`);
    }

    private storeDrive(drive: string){
        localStorage.setItem('drive', drive);
    }

    public async getDrive(): Promise<string>{
        let drive = localStorage.getItem('drive');
        if(drive == null){
           drive = (await this.getUserDrive().toPromise()).name;
           this.storeDrive(drive);
        }
        return new Promise(resolve =>{
            resolve(drive);
        });
    }

}