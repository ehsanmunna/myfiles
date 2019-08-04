import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, merge } from "rxjs";
import { FlatTreeControl } from "@angular/cdk/tree";
import { CollectionViewer, SelectionChange } from "@angular/cdk/collections";
import {map} from 'rxjs/operators';
import { ApiService } from "./apiService";

export class DynamicFlatNode {
    constructor(public item: string, public level = 1, public expandable = false,
                public isLoading = false) {}
  }

  export class DynamicDatabase {
    constructor(){}
    dataMap = new Map<string, string[]>([
      ['D', ['Apple', 'Orange', 'Banana']],
      ['E', ['Tomato', 'Potato', 'Onion']],
      //['Apple', ['Fuji', 'Macintosh']],
      //['Onion', ['Yellow', 'White', 'Purple']]
    ]);
  
    // rootLevelNodes: string[] = ['Fruits', 'Vegetables'];
    rootLevelNodes: string[] = ['D', 'E'];
  
    /** Initial data from database */
    initialData(): DynamicFlatNode[] {
      return this.rootLevelNodes.map(name => new DynamicFlatNode(name, 0, true));
    }
  
    // getChildren(node: string){
    //   return this.serv.GetDirectory(node)
    //     .then(res=> {return res})
    //   // return this.dataMap.get(node);
    // }
  
    isExpandable(node: string): boolean {
      return this.dataMap.has(node);
    }
  }

@Injectable()
export class DynamicDataSource {

  dataChange = new BehaviorSubject<DynamicFlatNode[]>([]);

  get data(): DynamicFlatNode[] { return this.dataChange.value; }
  set data(value: DynamicFlatNode[]) {
    this._treeControl.dataNodes = value;
    this.dataChange.next(value);
  }

  constructor(private _treeControl: FlatTreeControl<DynamicFlatNode>,
              private _database: DynamicDatabase, public serv:ApiService) {}

  connect(collectionViewer: CollectionViewer): Observable<DynamicFlatNode[]> {
    this._treeControl.expansionModel.onChange.subscribe(change => {
      if ((change as SelectionChange<DynamicFlatNode>).added ||
        (change as SelectionChange<DynamicFlatNode>).removed) {
        this.handleTreeControl(change as SelectionChange<DynamicFlatNode>);
      }
    });

    return merge(collectionViewer.viewChange, this.dataChange).pipe(map(() => this.data));
  }

  /** Handle expand/collapse behaviors */
  handleTreeControl(change: SelectionChange<DynamicFlatNode>) {
    if (change.added) {
      change.added.forEach(node => this.toggleNode(node, true));
    }
    if (change.removed) {
      change.removed.slice().reverse().forEach(node => this.toggleNode(node, false));
    }
  }

  /**
   * Toggle the node, remove from display list
   */
  toggleNode(node: DynamicFlatNode, expand: boolean) {
      // debugger
    let children:IDirNodeMain[] = [];
    //this._database.getChildren(node.item)
    this.serv.GetDirectory(node.item)
      .then((res:IDirNodeMain[])=> {
        children = res
      })
    const index = this.data.indexOf(node);
    if (!children || index < 0) { // If no children, or cannot find the node, no op
      return;
    }

    node.isLoading = true;

    setTimeout(() => {
      if (expand) {
        const nodes = children.map(item =>
          new DynamicFlatNode(item.name, node.level + 1, this._database.isExpandable(item.name))
          );
        this.data.splice(index + 1, 0, ...nodes);
      } else {
        let count = 0;
        for (let i = index + 1; i < this.data.length
          && this.data[i].level > node.level; i++, count++) {}
        this.data.splice(index + 1, count);
      }

      // notify the change
      this.dataChange.next(this.data);
      node.isLoading = false;
    }, 300);
  }
}