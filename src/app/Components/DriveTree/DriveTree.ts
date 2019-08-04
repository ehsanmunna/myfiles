import { Component, OnInit } from "@angular/core";
import { DynamicDatabase, DynamicFlatNode, DynamicDataSource } from "src/app/Services/DynamicDatasource";
import { ApiService } from "src/app/Services/apiService";
import { FlatTreeControl } from "@angular/cdk/tree";
import { HttpClient } from "@angular/common/http";
import { IDriveList } from "src/app/Interfaces/IDriveList";
@Component({
    selector: 'app-drive-tree',
    templateUrl: './DriveTree.html',
    providers: [HttpClient, DynamicDatabase, ApiService]
})
export class DriveTreeComponent{
    constructor(database: DynamicDatabase, public serv:ApiService) {
        this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new DynamicDataSource(this.treeControl, database, serv);
    
        this.dataSource.data = database.initialData();

        //   this.serv.InitialDrive()
        // .then((res:IDriveList[])=>{
        //   let mountpoints = res[0].mountpoints;
        //   let list = [];
        //   for (let i = 0; i < mountpoints.length; i++) {
        //     const element = mountpoints[i];
        //     list.push(element.path);
        //   }
        //   debugger
        //   this.dataSource.data = list;
        // })
      }
    
      treeControl: FlatTreeControl<DynamicFlatNode>;
    
      dataSource: DynamicDataSource;
    
      getLevel = (node: DynamicFlatNode) => node.level;
    
      isExpandable = (node: DynamicFlatNode) => node.expandable;
    
      hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
      
      ClickOnTreeFolder = (item) => {
        console.log(item);
      }
}