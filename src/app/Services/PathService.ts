export class PathService{
    RemoveUrlSegment(url:string, removeItem:string):string{
        var nUrl = "";
        var splitUrl = url.split("/");
        var indexOfRemovableItem = splitUrl.indexOf(removeItem);
        if(indexOfRemovableItem != -1){
          splitUrl.splice(indexOfRemovableItem, 1);
          for (let i = 0; i < splitUrl.length; i++) {
            const element = splitUrl[i];
            if (i != 0) {
              nUrl += "/"+ element;
            } else {
              nUrl = element;
            }
          }
          return nUrl;
        } else {
          return "not found";
        }
      }

    AddPath(paramPath:string, newPath:string):string{
        if (paramPath) {
            paramPath  = paramPath + "/" + newPath;
          } else {
            paramPath = newPath;
          }
        return paramPath;
    }
}