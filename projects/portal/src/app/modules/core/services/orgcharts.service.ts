import {NodeTreeConfig, NodeTreeOptions} from '../models/node-tree-model';
import {Subject} from 'rxjs';


export class OrgChartService {
  onAddNodeEleemntToTree = new Subject<NodeTreeConfig>();
  onEditNodeEleemntToTree = new Subject<NodeTreeConfig>();
  onDeleteNodeEleemntToTree = new Subject<NodeTreeConfig>();

  addNode(node: NodeTreeConfig) {
    this.onAddNodeEleemntToTree.next(node);
  }

  editNode(node: NodeTreeConfig) {

    this.onEditNodeEleemntToTree.next(node);
  }

  deleteNode(node: NodeTreeConfig) {

    this.onDeleteNodeEleemntToTree.next(node);
  }

  getChildParent(childNode: NodeTreeConfig, tree: NodeTreeOptions) {

    if (childNode.pid === tree.id) {

      return tree;

    } else if (typeof (tree.children) !== 'undefined' && tree.children.length > 0) {

      for (let index = 0; index < tree.children.length; index++) {
        const element = tree.children[index];

        if (element.id === childNode.pid) {

          return element;

        } else {
          const parentNode = this.getChildParent(childNode, element);


          if (typeof (parentNode) !== 'undefined') {

            return parentNode;

          }
        }


      }
    }
  }

}
