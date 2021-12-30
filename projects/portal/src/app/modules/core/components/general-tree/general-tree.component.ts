import {Component, EventEmitter, Injectable, Input, OnInit, Output, ViewChild} from '@angular/core';
// import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import {MatTree, MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource} from '@angular/material';
import {FlatTreeControl, NestedTreeControl} from '@angular/cdk/tree';
import {GeneralTreeService} from '../../services/general-tree.service';
import { type } from 'os';

export class TreeModel {
  children: Array<TreeModel>;
  name: string;
  level:number;
  expandable: boolean;
  canNotRemove?:boolean;
  id:string;
  type:string;
  video_url?:string;

  firstParentId:string;
  parentId:string
  state: "notChecked" | "indetermine" | "checked" ;
  expanded: false;
  image?:string;
  hasChild?: boolean;
}

export class FinalListElement {
  id: string;
  type: string;
  parentId:string;
  firstPerentId:string;
  state: string;
  children:FinalListElement[];
}

export class IncludeExcludeLists {
  _includeListArray: FinalListElement[] = [];
  set includeListArray(array: FinalListElement[]) {
    this._includeListArray = array;
  }

  get includeListArray(): FinalListElement[] {
    return this._includeListArray
  }

  _excludeListArray: FinalListElement[] = [];
  set excludeListArray(array: FinalListElement[]) {
    this._excludeListArray = array;
  }

  get excludeListArray(): FinalListElement[] {
    return this._excludeListArray
  }



  _sponsorArray: FinalListElement[] = [];
  set sponsorArray(array: FinalListElement[]) {
    this._sponsorArray = array;
  }

  get sponsorArray(): FinalListElement[] {
    return this._sponsorArray
  }


  _fullSponsorArray: any[] = [];
  set fullSponsorArray(array: any[]) {
    this._fullSponsorArray = array;
  }

  get fullSponsorArray(): any[] {
    return this._fullSponsorArray
  }

  removeElementFromArray(elementList: FinalListElement[], elementID: string) {
    const elementIndex = elementList.findIndex(x => x.id === elementID);
    if(elementIndex> -1){
      elementList.splice(elementIndex, 1);
    }
 
  }

  addElementToArray(elementList: FinalListElement[], element: FinalListElement) {
    const previousIndex = elementList.findIndex(x => x.id === element.id)
    if(previousIndex > -1){
      elementList.splice(previousIndex,1)
    }

    elementList.push(element)
  }
  reset(elementList: FinalListElement[]){
 
  
   elementList.splice(0,elementList.length)

  }
}

@Component({
  selector: 'app-general-tree',
  templateUrl: './general-tree.component.html',
  styleUrls: ['./general-tree.component.scss'],

})
export class GeneralTreeComponent implements OnInit {
  @ViewChild("tree", {static: false}) tree: MatTree<any>;
  @Input() treeData : TreeModel[]= [];
  @Input() includeExcludeObject: IncludeExcludeLists;

  subscription;
  count = 0;
  nestedTreeControl= new FlatTreeControl<TreeModel>(
    node => node.level, node => node.expandable
  );
 
  
  inputValue;
  determinecount: number;
  notChecked: number;
  @Output() treeChanged = new EventEmitter();
  expandedElement: TreeModel;
  @Output() elementExpanded = new EventEmitter();
  selectAll: boolean;

  @ViewChild('videoModal', {static: true}) videoModal;
  videoModalTitle: string;
  loadingVideoModal: boolean = true;
  currentVideo: any;
  transformer = (node: TreeModel, level: number) => {
    return {
      expandable: !!node.children && node.children.length > 0,
      name: node.name,
      level: level,
      
  id:node.id,
  type:node.type,
  canNotRemove : node.canNotRemove,
  children: node.children,
  firstParentId:node.firstParentId,
  parentId:node.parentId,
  state:node.state ,
  expanded: node.expanded,
  image:node.image,
  hasChild: node.hasChild,
  video_url:node.video_url

      
    };
  }

  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

    nestedDataSource = new MatTreeFlatDataSource(this.nestedTreeControl, this.treeFlattener);
  expandedNodes: TreeModel[];
  parentElement: string;
    
  constructor(private generalService: GeneralTreeService) {
   
  }

  getSelectAll() {
    return  this.includeExcludeObject.excludeListArray.length===0 && this.selectAll;
  }

  ngOnInit() {
    this.selectAll = true;
    const data = this.treeData;
    this.nestedDataSource = new MatTreeFlatDataSource(this.nestedTreeControl, this.treeFlattener);
    this.nestedDataSource.data = this.treeData;

    this.generalService.addElementToNode.subscribe((element ) => {

      
      if (this.expandedElement.children.length === 0 && this.expandedElement.hasChild) {
      
        
  
        element.children.forEach(child => {
          
          let newChild ={
            ...child,
            parentId : element.id,
            firstParentId : this.expandedElement.firstParentId,
            children : [],
            type:'content'
            
          }
        
          // newChild.state =this.expandedElement.state === 'notChecked'? 'notChecked': 'notChecked'
          if(this.expandedElement.state === 'notChecked'){
            newChild.state = 'notChecked'
          }
          if(this.expandedElement.state === 'checked'){
            newChild.state = 'checked'
          }
          this.expandedElement.children.push(newChild);
        });
   
        let parentElem = this.treeData.find(x => x.id === this.expandedElement.firstParentId);
       
       
        
        parentElem = this.changeElementChildren(this.expandedElement, parentElem);
        if(parentElem){
          const index = this.treeData.findIndex(x => x.id === this.expandedElement.firstParentId);
          this.treeData[index] = parentElem;
          
          this.updateIncludeExcludeList(parentElem);
        }
        else{
    
          const index = this.treeData.findIndex(x => x.id === this.expandedElement.id);
            this.treeData[index] = this.expandedElement;
    
          this.updateIncludeExcludeList(this.expandedElement)
        }
      

        this.saveExpandedNodes();
    
        this.nestedDataSource.data = this.treeData;
        this.restoreExpandedNodes();
        const expandNode= this.nestedTreeControl.dataNodes.find
        (n => n.id === this.expandedElement.id && n.parentId=== this.expandedElement.parentId 
          && n.firstParentId=== this.expandedElement.firstParentId)
        this.nestedTreeControl.expand(expandNode);
      
      }

    });
  }

  
  changeSelectAll() {
 
    var element = <HTMLInputElement> document.getElementById("selectAll-input");

    this.selectAll = element.checked;
   
    const checkedAll = this.selectAll ? 'checked' : 'notChecked';
    let i =0;
    this.treeData.forEach(element => {
      element.state = checkedAll;
      const newElement = this.generalService.changeChildren(element);
      this.treeData[i] = newElement;
      i++;

    });

    this.includeExcludeObject.fullSponsorArray.forEach((sponsorElement) =>{
   
      sponsorElement.state='checked';
      this.changeFullSponsoredParentAndChildren(sponsorElement);
     

    });
    this.saveExpandedNodes();

    this.nestedDataSource.data = this.treeData;
    this.restoreExpandedNodes();
    this.includeExcludeObject.reset(this.includeExcludeObject.includeListArray);
    this.includeExcludeObject.reset(this.includeExcludeObject.excludeListArray);

    const newel=this.generalService.buildTreeLists(this.treeData,this.includeExcludeObject);
  

  }

  /** Checks if datasource for material tree has any child groups */
  hasNestedChild = (_: number, nodeData: TreeModel) =>
    nodeData.children.length > 0;


    hasChild = (_: number, node: TreeModel) => node.expandable;
  /** Returns child groups from security group */
  private _getChildren = (node: TreeModel) => node.children;

  clickedActive(element: TreeModel) {
   
    
    element.state =
      element.state === "notChecked" || element.state === "indetermine" ? "checked" : "notChecked";
    const newElm={
      ...element
    }
    this.changeParentAndChildren(newElm);
  
    this.includeExcludeObject.fullSponsorArray.forEach((sponsorElement) =>{
   
     
      if(sponsorElement.firstParentId === this.parentElement){
     
        sponsorElement.state='checked';
        this.changeFullSponsoredParentAndChildren(sponsorElement);
      }
     

    });

    this.saveExpandedNodes();

    this.nestedDataSource.data = this.treeData;

    this.restoreExpandedNodes();
    this.treeChanged.emit(this.treeData);


  }
  // allParents
  changeParentFullSponsor( parentElement: TreeModel,parentArr){
    parentElement.state = parentElement.state ==='notChecked'? 'indetermine': parentElement.state;
    if(parentElement.children && parentElement.children.length>0){
      const secondParentIndex = parentElement.children.findIndex(x => x.id === parentArr[1]);
      if(secondParentIndex >-1)
     {
      parentElement.children[secondParentIndex].state=parentElement.children[secondParentIndex].state==='notChecked'?
       'indetermine': parentElement.children[secondParentIndex].state;
      //  this.generalService.changeChildren(element);
      const secondParent =parentElement.children[secondParentIndex];
      const secondParentIndex1 = secondParent.children.findIndex(x => x.id === parentArr[2]);
      if(secondParentIndex1 >-1)
     {
      secondParent.children[secondParentIndex1].state='checked';
       this.generalService.changeChildren(secondParent.children[secondParentIndex1]);
     }
     }
    }
    
   

    return parentElement
  }
  changeFullSponsoredParentAndChildren(element: any){
    
    let parentElem = this.treeData.find(x => x.id === element.firstParentId);
    
     
    
    parentElem = this.changeParentFullSponsor( parentElem,element.allParents);
    if(parentElem){
      const index = this.treeData.findIndex(x => x.id === element.firstParentId);
      this.treeData[index] = parentElem;
      
      this.updateIncludeExcludeList(parentElem);
    }
    else{

      const index = this.treeData.findIndex(x => x.id === element.id);
        this.treeData[index] = element;
      this.updateIncludeExcludeList(element)
    }
   
  }
  changeParentAndChildren(element: TreeModel){
    //  = element.firstParentId;
    let parentElem = this.treeData.find(x => x.id === element.firstParentId);

    element=this.generalService.changeChildren(element);
    
    parentElem = this.changeParent(element, parentElem);
    if(parentElem){
      const index = this.treeData.findIndex(x => x.id === element.firstParentId);
      this.treeData[index] = parentElem;
      this.parentElement = parentElem.id;
      this.updateIncludeExcludeList(parentElem);
    }
    else{

      const index = this.treeData.findIndex(x => x.id === element.id);
        this.treeData[index] = element;
        this.parentElement=element.id
      this.updateIncludeExcludeList(element)
    }
    this.saveExpandedNodes();

    this.nestedDataSource.data = this.treeData;
    this.restoreExpandedNodes();
  }
  removeChildElement(element : GeneralContentTreeModel){
    let includeArray= this.includeExcludeObject.includeListArray.
    filter(x =>( x.parentId === element.id && element.firstParentId=== x.firstPerentId)
     || x.firstPerentId=== element.id);
    if(includeArray.length>0){
      includeArray.forEach(child => {
       let index= this.includeExcludeObject.includeListArray.findIndex(x=> x.id === child.id);
       if(index > -1){
        this.includeExcludeObject.includeListArray.splice(index,1)
       }
      });
    }

    let excludeArray= this.includeExcludeObject.excludeListArray.
    filter(x =>( x.parentId === element.id && element.firstParentId=== x.firstPerentId) || x.firstPerentId=== element.id);
    if(excludeArray.length>0){
      excludeArray.forEach(child => {
        let index= this.includeExcludeObject.excludeListArray.findIndex(x=> x.id === child.id);
        if(index > -1){
         this.includeExcludeObject.excludeListArray.splice(index,1)
        }
       });
    }
  }
  updateIncludeExcludeList(element : any) {
  
    if(!element.canNotRemove){
    
      const modifiedElement= this.generalService.buildShortElement(element);
    if (element.state === 'notChecked') {
 
      this.removeChildElement(element)
      this.includeExcludeObject.removeElementFromArray(this.includeExcludeObject.includeListArray, element.id);
     
      this.includeExcludeObject.addElementToArray(this.includeExcludeObject.excludeListArray, modifiedElement);
    } else  if (element.state === 'checked'){
 
      this.removeChildElement(element)
        this.includeExcludeObject.removeElementFromArray(this.includeExcludeObject.excludeListArray, element.id);
        
        this.includeExcludeObject.addElementToArray(this.includeExcludeObject.includeListArray, modifiedElement);
      
    }
    else{
  
      let includeIndex = this.includeExcludeObject.includeListArray.findIndex(x => x.id === element.id);
      let excludeIndex = this.includeExcludeObject.excludeListArray.findIndex(x => x.id === element.id);
      if(includeIndex > -1){
        
        this.includeExcludeObject.includeListArray.splice(includeIndex,1)
      }

      if(excludeIndex > -1){
        this.includeExcludeObject.excludeListArray.splice(excludeIndex,1)
      }
      element.children.forEach(child => {
        this.updateIncludeExcludeList(child)
      });
    }
    }
   

 }



 changeElementChildren(element, parentElement: TreeModel) {

  if (parentElement) {
    const index =parentElement.children.findIndex(x => x.id === element.id && parentElement.id === element.parentId);
     
    if (element.parentId === parentElement.id && index>-1) {
 
      parentElement.children[index]=element;
      
  
    
      
    } else {
      
      if (parentElement.children.length > 0) {
        const imidiatParent = parentElement.children.find(x => x.id === element.parentId);
        if (imidiatParent) {
             this.changeParent(element, imidiatParent);
          
            this.changeParent(imidiatParent, parentElement);
          
        } else {
          parentElement.children.forEach((parentChild) => {
              this.changeParent(element, parentChild);
            
               this.changeParent(parentChild, parentElement);
            
          })
        }
      }
    }
  }
  return parentElement;

}
isSponserdElement(data){
return data.canNotRemove ? true : false;
}
  changeParent(element, parentElement: TreeModel) {

    if (parentElement) {
      const index =parentElement.children.findIndex(x => x.id === element.id && parentElement.id === element.parentId);
       
      if (element.parentId === parentElement.id && index>-1) {
   
        parentElement.children[index]=element;
        this.getCheckedAmount(parentElement.children);
    
        if (this.determinecount > 0 || (this.notChecked > 0 && this.count > 0)) {
        
          parentElement.state = 'indetermine';
          
        } else if (this.notChecked > 0) {
          
          parentElement.state = 'notChecked';
          
        } else if (this.count > 0 && this.determinecount === 0 && this.notChecked === 0) {
      
          parentElement.state = 'checked';
         
        }
        
      } else {
        
        if (parentElement.children.length > 0) {
          const imidiatParent = parentElement.children.find(x => x.id === element.parentId);
          if (imidiatParent) {
               this.changeParent(element, imidiatParent);
            
              this.changeParent(imidiatParent, parentElement);
            
          } else {
            parentElement.children.forEach((parentChild) => {
                this.changeParent(element, parentChild);
              
                 this.changeParent(parentChild, parentElement);
              
            })
          }
        }
      }
    }
    return parentElement;

  }
  getCheckedAmount(data) {
    this.count = 0; 
    this.determinecount = 0;
    this.notChecked = 0;
    this.loopData(data);
  }

  loopData(data: GeneralContentTreeModel[]) {
    data.forEach(d => {
      if (d.state === "checked") {
        this.count += 1;
      }
      if (d.state === "indetermine") {
        this.determinecount += 1;
      }
      if (d.state === "notChecked") {
        this.notChecked += 1;
      }
    
    });
  }

  loopData1(data : GeneralContentTreeModel[]) {
    data.forEach(d => {
      if (d.state === "checked") {
        this.count += 1;
      }
      if (d.state === "indetermine") {
        this.determinecount += 1;
      }
      if (d.state === "notChecked") {
        this.notChecked += 1;
      }
      if (d.children && d.children.length > 0) {
        this.loopData(d.children);
      }
    });
  }

  getcheckedValue(data : GeneralContentTreeModel) {
    if (data.state === "checked") {
      return true;
    } else {
      this.count = 0; // resetting count
      this.determinecount = 0;
      this.notChecked = 0;
      this.loopData1(data.children);
      return this.determinecount > 0
        ? false
        : this.notChecked === 0
          ? this.count
          : false;
    }
  }

  changeState(data) {
    this.expandedElement=null;
    data.expanded = !data.expanded;
    if (data.expanded) {

      this.expandedElement = data;
      this.elementExpanded.emit({'data': data, 'tree': this.treeData})
    }
  }
  getEmptyImagePhrase(type){
    if(type === 'speciality')
    {return 'S'}
    if(type === 'content_class')
    {return 'C'}

    if(type === 'topic')
    {return 'T'}

    if(type === 'video')
    {return 'V'}
    
    
  }

  playVideo(video) {
    this.currentVideo = video;
    this.videoModal.open();
    this.loadingVideoModal = false;
    this.videoModalTitle = video.name+' video';
  }

  onPercentageChanged(e) {

  }

 
  initPlayer(e){

    
  }
  onPlayChanged(e){}

  closeVideoModal(){}
  hasNoChild(data){
  
    return data.hasChild? false : true
  }
  saveExpandedNodes() {
    this.expandedNodes = new Array<TreeModel>();
    this.nestedTreeControl.dataNodes.forEach(node => {
        if (node.expandable && this.nestedTreeControl.isExpanded(node)) {
            this.expandedNodes.push(node);
            if(node.children && node.children.length > 0){
              node.children.forEach(child => {
                this.pushElemenetInExpandNodes(child)
              });
            }
        }
    });

}
pushElemenetInExpandNodes(node){
 
  node.children.forEach(element => {
    if (element.expandable && this.nestedTreeControl.isExpanded(element)) {
      this.expandedNodes.push(node);
      if(element.children && element.children.length > 0){
        element.children.forEach(child => {
            this.pushElemenetInExpandNodes(child)
          });
      }
    }
  });
}
restoreExpandedNodes() {

  this.expandedNodes.forEach(node => {
   const expandNode= this.nestedTreeControl.dataNodes.find(n => n.id === node.id && n.parentId=== node.parentId)
 
      this.nestedTreeControl.expand(expandNode);
  });
}
}



