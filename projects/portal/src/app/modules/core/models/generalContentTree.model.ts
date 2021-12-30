 class GeneralContentTreeModel{
    id:string;
    type:string;
    name: string;
    children: GeneralContentTreeModel[];
    firstParentId:string;
    parentId:string
    state: "notChecked" | "indetermine" | "checked" ;
    expanded: false;
    image?:string;
    hasChild?: boolean;
 }