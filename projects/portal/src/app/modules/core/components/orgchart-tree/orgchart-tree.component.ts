import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  AfterViewInit,
  ViewChild,
  ElementRef,
  Renderer2
} from '@angular/core';
import {NodeTreeConfig, NodeTreeOptions} from '../../models/node-tree-model';
import {OrgChartService} from '../../services/orgcharts.service';

@Component({
  selector: 'app-orgchart-tree',
  templateUrl: './orgchart-tree.component.html',
  styleUrls: ['./orgchart-tree.component.scss']
})
export class OrgchartTreeComponent implements OnInit, AfterViewInit {
  @Input() tree: NodeTreeConfig;
  @Input() treeChanged: boolean;
  @Output() treeChange = new EventEmitter();
  @Output() onChildUpdate = new EventEmitter();
  @Output() elementCoordinations = new EventEmitter();
  @Output() onAdd = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  @Output() onTreeChange = new EventEmitter();
  firstElement = 0;
  lastElement = 0;
  editableNode: any;
  appearMenuAction = false;
  bottomClick = false;

  @ViewChild('toggleAddButton', {static: false}) toggleAddButton: ElementRef;
  @ViewChild('toggleEditButton', {static: false}) toggleEditButton: ElementRef;
  @ViewChild('toggleDeleteButton', {static: false}) toggleDeleteButton: ElementRef;
  @ViewChild('threeDots', {static: false}) threeDots: ElementRef;

  constructor(private orgChartServ: OrgChartService, private renderer: Renderer2,) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (typeof (this.toggleAddButton) !== 'undefined' && e.target !== this.toggleAddButton.nativeElement &&
        typeof (this.toggleEditButton) !== 'undefined' && e.target !== this.toggleEditButton.nativeElement &&
        typeof (this.toggleDeleteButton) !== 'undefined' && e.target !== this.toggleDeleteButton.nativeElement &&
        typeof (this.threeDots) !== 'undefined' && e.target !== this.threeDots.nativeElement
      ) {
        this.appearMenuAction = false;

      }

    });

  }

  ngOnInit() {

    this.orgChartServ.onAddNodeEleemntToTree.subscribe((data) => {

      if (data.pid === this.tree.id) {

        this.addNode(data);
      }
    });
    this.orgChartServ.onEditNodeEleemntToTree.subscribe((data) => {

      if (data.id === this.tree.id) {


        this.editNode(data);
      }
    });
    this.orgChartServ.onDeleteNodeEleemntToTree.subscribe((data) => {

      if (data.pid === this.tree.id) {

        this.deleteChild(data.id);
      }
    });

    if (this.tree != null) {

      this.drawTree();
    }


  }

  ngAfterViewInit() {
    if (this.tree != null) {

      this.drawTree();
    }

  }

  drawTree() {

    const newDiv = document.createElement('div');

    const div = document.getElementsByClassName('node');

    if (div.length > 0) {


      const newTreeContainer = document.getElementById('tree' + this.tree.id);

      if (newTreeContainer != null) {

        const newTreeContainerFirstElement: any = newTreeContainer.childNodes[0];

        if (newTreeContainerFirstElement.id === 'line') {

          newTreeContainer.removeChild(newTreeContainer.childNodes[0]);

        }
        const nodeClassElement = newTreeContainer.childNodes[0].childNodes;

        const nodeClassFirstElement: any = nodeClassElement[1];


        if (typeof (nodeClassFirstElement) !== 'undefined') {

          this.firstElement = nodeClassFirstElement.childNodes[0].getBoundingClientRect().left;


          const nodeClassLastElement: any = nodeClassElement[nodeClassElement.length - 1];

          const left = nodeClassFirstElement.childNodes[0].offsetLeft + 128 - 9;

          this.lastElement = nodeClassLastElement.childNodes[0].getBoundingClientRect().left;

          if (this.tree.pid === null) {

            const firstNodeInTree = document.getElementById('node' + this.tree.id);

            const movedValue = left + (((this.lastElement + 128) - (this.firstElement + 128)) / 2) - 128 + 15 + 9;
            firstNodeInTree.style.left = movedValue.toString() + 'px';

            // newTreeContainer.scrollLeft = firstNodeInTree.offsetLeft+(firstNodeInTree.offsetWidth/2);
          }

          newTreeContainer.insertBefore(createLine(this.firstElement, 162, this.lastElement, 162, left), newTreeContainer.childNodes[0]);
        }
      }

      function createLineElement(x, y, length, angle) {
        var line = document.createElement('div');
        var styles = 'border: 1px solid #c9c0c0; '
          + 'width: ' + length + 'px; '
          + 'height: 0px; '
          + '-moz-transform: rotate(' + angle + 'rad); '
          + '-webkit-transform: rotate(' + angle + 'rad); '
          + '-o-transform: rotate(' + angle + 'rad); '
          + '-ms-transform: rotate(' + angle + 'rad); '
          + 'position: absolute; '
          + 'top: ' + y + 'px; '
          + 'left: ' + x + 'px; ';
        line.setAttribute('style', styles);
        line.setAttribute('id', 'line');
        return line;
      }

      function createLine(x1, y1, x2, y2, left) {
        var a = x1 - x2,
          b = y1 - y2,
          c = Math.sqrt(a * a + b * b);

        var sx = (x1 + x2) / 2,
          sy = (y1 + y2) / 2;

        var x = sx - c / 2,
          y = sy;

        return createLineElement(left, 21, c, 0);


      }
    }

  }

  updateChild(child) {
    const index = this.tree.children.findIndex(x => x.id === child.id);
    if (index !== -1) {
      this.tree.children[index] = child;
    }
    this.onChildUpdate.emit(this.tree);
  }

  toggleMenu($event: any) {
    this.appearMenuAction = !this.appearMenuAction;
    if ($event.pageY + 150 > window.innerHeight) {
      this.bottomClick = true;
    } else {
      this.bottomClick = false;
    }
  }

  addChildToParentNode(id, treeNode, child) {

    if (treeNode.id === id) {
      if (typeof (treeNode.children) !== 'undefined') {
        return treeNode.children.push(child);
      } else {
        treeNode.children = [];
        return treeNode.children.push(child);
      }

    } else {
      if (typeof (treeNode.children) !== 'undefined' && treeNode.children.length > 0) {
        for (let index = 0; index < treeNode.children.length; index++) {
          const element = treeNode.children[index];

          if (element.id === id) {
            if (typeof (element.children) !== 'undefined') {
              return element.children.push(child);
            } else {
              element.children = [];
              return element.children.push(child);
            }

          } else {
            const parentNode = this.addChildToParentNode(id, element, child);

            if (typeof (parentNode) !== 'undefined') {
              if (typeof (parentNode.children) !== 'undefined') {
                return parentNode.children.push(child);
              }


            }
          }


        }

      }

    }
  }

  addNodeAction(parentId) {
    this.appearMenuAction = false;
    this.onAdd.emit(parentId);

  }

  editNodeAction(tree) {
    this.appearMenuAction = false;
    this.onEdit.emit(tree);
  }

  DeleteNodeAction(tree) {
    this.appearMenuAction = false;
    this.onDelete.emit(tree);
  }

  addNode(newNode) {

    this.appearMenuAction = false;
    const parent = this.addChildToParentNode(newNode.pid, this.tree,
      newNode
    );
    setTimeout(() => {

      this.drawTree();
      this.treeChange.emit();
    }, 1000);


  }

  editNode(currentNode: NodeTreeConfig) {
    this.appearMenuAction = false;


    this.tree = currentNode;

    this.onChildUpdate.emit(this.tree);
    this.treeChange.emit();

  }

  deleteNode(currentTreeId) {
    this.appearMenuAction = false;
    this.onDelete.emit(currentTreeId);


  }

  deleteChild(childId) {

    const index = this.tree.children.findIndex(x => x.id === childId);

    this.tree.children.splice(index, 1);
    setTimeout(() => {

      this.drawTree();
      this.treeChange.emit();

    }, 1000);

  }

  changingTreeDraw() {


    this.treeChange.emit();
    setTimeout(() => {
      this.drawTree();

    }, 200);
  }

  toogleChildNode(tree) {
    tree.collapse = !tree.collapse;
    setTimeout(() => {
      this.drawTree();
      this.treeChange.emit();
    }, 200);
  }


}

