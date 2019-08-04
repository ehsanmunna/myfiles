import { ApiService } from "src/app/Services/apiService";
import { OnInit, Component } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";

@Component({
    selector: 'app-dirve-pannel-inside',
    templateUrl: './DriveInside.html',
    providers: [ApiService]
})
export class DrivePannelInsideComponent implements OnInit{
    driveList:IDirNodeMain[]
    currentDrive:string;
    constructor(
        public api: ApiService
        , public route: ActivatedRoute
        , public routes: Router
        ){}
    // driveDetails:IDriveList;
    // mountPoints:IMountpoints[];
    ngOnInit(){
        this.route.params.subscribe((p)=>{
            this.currentDrive = p.id;

            this.route.queryParams.subscribe((params)=>{
                if (params.path) {
                    this.api.GetDirectoryByParams(this.currentDrive, params.path)
                    .then((res:IDirNodeMain[])=>{
                        this.driveList = res;
                    })
                }else{
                    this.api.GetDirectory(p.id)
                    .then((res:IDirNodeMain[])=>{
                        this.driveList = res;
                    })
                }
                
            })
            
                
            })
        // this.api.InitialDrive()
        //     .then((item:IDriveList)=>{
        //         this.driveDetails = item[0];
        //         this.mountPoints = this.driveDetails.mountpoints;
        //     })
    }

    GoTo(node:IDirNodeMain){
        // // this.api.GetDirectoryByParams(this.currentDrive, name);
        // //this.route.data

        this.route.queryParams.subscribe((p)=>{
            console.log(p.path)
            debugger
            let str = "";
            if (p.path) {
                str = p.path + "/" + node.name
            } else {
                str = node.name
            }
            
            this.routes.navigate(['/d/' + this.currentDrive], { queryParams: {path: str}})
        });
        
        // // let nameOnly = name.split(":")[0];
        //this.routes.navigate(['/d/' + this.currentDrive + '?path=' + node.name])
        // console.log(node);
    }
}