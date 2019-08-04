import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {
    constructor(public http: HttpClient){}
    InitialDrive(){
        return this.http.get(`http://localhost:3000/`)
        .toPromise();
    }
    GetDirectory(drive:string,param?:string){
        if (param) {
            this.GetDirectoryByParams(drive, param);
        } else {
            return this.http.get(`http://localhost:3000/dir/${drive}`)
            .toPromise();
        }
        
    }
    GetDirectoryByParams(drive:string,param?:string){
        return this.http.get(`http://localhost:3000/dir/${drive}`, {params: {path: param}})
        .toPromise()
    }
    GetDirectoryTree(drive:string){
        this.GetDirectory(drive)
            .then((res:IDirNodeMain[])=>{
                for (let i = 0; i < res.length; i++) {
                    const element = res[i];
                    
                }
            });
    }
}