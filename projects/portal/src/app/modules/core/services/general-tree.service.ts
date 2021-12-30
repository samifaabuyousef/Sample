import { NestedTreeControl } from '@angular/cdk/tree';
import {EventEmitter, Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import { TreeModel } from '../components/general-tree/general-tree.component';
import { ContentTreeStructure, shortContentTree } from '../models/general-tree-model';



@Injectable()
export class GeneralTreeService {
  
  
  expandElement = new EventEmitter<any>();
  addElementToNode = new EventEmitter<any>();
  

  constructor() {
  }

  buildShortElement(element :ContentTreeStructure, parentElement?: shortContentTree):shortContentTree{
    
   if(element){
    let modifiedElement:shortContentTree ={
      id:element.id,
      type :element.type,
      state: element.state,
      children:[],
      parentId: element.parentId,
      firstPerentId : element.firstParentId


    }
    if(parentElement){
      parentElement.children.push(modifiedElement);
    }
    if(element.children && element.children.length >0){
      element.children.forEach((childElement) => {
        if(childElement.state != 'notChecked'){
          this.buildShortElement(childElement,modifiedElement)
        }
        
      })

    }
    return modifiedElement;
   }
  }


    changeChildren(element: TreeModel) {
      
    if (element.state === 'checked') {

      element.children.forEach((child) => {
        child.state = 'checked';
       
        child= this.changeChildren(child);
      })
    } else if (element.state === 'notChecked') {
      element.children.forEach((child) => {
        child.state = 'notChecked';
        
        child= this.changeChildren(child);
      })
    }
    return element;
  }


  changeElementStateWithChildren(element, newState: 'notChecked' | 'checked') {
    this.changeElementState(element,newState)
    
    this.changeChildren(element);
  
  }
  changeElementState(element: GeneralContentTreeModel, newState: 'notChecked'| 'indetermine' | 'checked'){
    element.state =newState;
  }
 
  buildTreeLists(tree:ContentTreeStructure[],IncludeExcludeTree){
  
    tree.filter((element) =>{
      if(!element.canNotRemove){
        const modifiedElement= this.buildShortElement(element);

        if(element.state === 'notChecked'){
        
          IncludeExcludeTree.excludeListArray.push(
            modifiedElement
          );
  
        }
        else if(element.state === 'checked'){
          IncludeExcludeTree.includeListArray.push(
            modifiedElement
          );
  
        }
        else{
          this.buildTreeLists(element.children,IncludeExcludeTree);
        }
  
        return modifiedElement
      }
     
    })



  }
}