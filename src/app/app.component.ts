import { Component, OnInit } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { HttpClient } from '@angular/common/http';
import { DynamicDatabase, DynamicFlatNode, DynamicDataSource } from 'src/app/Services/DynamicDatasource';


interface IDirNode {
  name: string;
  children?: IDirNode[];
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [HttpClient, DynamicDatabase]
})
export class AppComponent {
  title = 'myfiles';

  // ngOnInit(){
  //   this.http.get('http://localhost:3000/dir/D')
  //     .toPromise()
  //     .then((res:IDirNodeMain[])=> {
  //       console.log(res);
  //       let node:IDirNode[] = [];
  //       for (let i = 0; i < res.length; i++) {
  //         const element = res[i];
  //         if (element.isDirectory) {
  //           node.push({
  //             name: element.name
  //           })
  //         }
          
  //       }
  //       return node;
  //     })
  //     .then((res:IDirNode[])=>{
  //       this.dataSource.data = res;
  //     })
  // }

  constructor(database: DynamicDatabase) {
    this.treeControl = new FlatTreeControl<DynamicFlatNode>(this.getLevel, this.isExpandable);
    this.dataSource = new DynamicDataSource(this.treeControl, database);

    this.dataSource.data = database.initialData();
  }

  treeControl: FlatTreeControl<DynamicFlatNode>;

  dataSource: DynamicDataSource;

  getLevel = (node: DynamicFlatNode) => node.level;

  isExpandable = (node: DynamicFlatNode) => node.expandable;

  hasChild = (_: number, _nodeData: DynamicFlatNode) => _nodeData.expandable;
  
}
