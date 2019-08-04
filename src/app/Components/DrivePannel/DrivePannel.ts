import { Component, OnInit } from "@angular/core";
import { ApiService } from "src/app/Services/apiService";
import { IDriveList, IMountpoints } from "src/app/Interfaces/IDriveList";
import { Router } from "@angular/router";
@Component({
    selector: 'app-dirve-pannel',
    templateUrl: './drive-pannel.html',
    providers: [ApiService]
})
export class DrivePannelComponent implements OnInit{
    constructor(
        public api: ApiService
        , public route: Router
        ){}
    driveDetails:IDriveList;
    mountPoints:IMountpoints[];
    ngOnInit(){
        this.api.InitialDrive()
            .then((item:IDriveList)=>{
                this.driveDetails = item[0];
                this.mountPoints = this.driveDetails.mountpoints;
            })
    }

    GoToDrive(name:string){
        let nameOnly = name.split(":")[0];
        this.route.navigate(['/d/' + nameOnly])
    }
}