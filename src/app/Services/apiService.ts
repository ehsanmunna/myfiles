import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable()
export class ApiService {
    constructor(public http: HttpClient){}
    GetDirectory(drive:string){
        return this.http.get(`http://localhost:3000/dir/${drive}`)
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