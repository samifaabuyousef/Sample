export class ContentTreeStructure{
    id:string;
        type:string;
        name: string;
        children: ContentTreeStructure[];
        firstParentId:string;
        parentId:string
        state: "notChecked" | "indetermine" | "checked" ;
        expanded: false;
        image?:string;
        hasChild?: boolean;
        canNotRemove ?: boolean;


       
}

export interface shortContentTree{
    id:string;
    parentId:string;
    firstPerentId:string;
    type:string ;
    state:"notChecked" | "indetermine" | "checked";
    children: shortContentTree[];
}